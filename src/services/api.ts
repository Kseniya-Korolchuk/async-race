import { Car, Cars, Engine, SimpleCar, Winner, Winners } from '../utils/types';

const base = 'http://localhost:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async (page: number, limit = 7): Promise<Cars> => {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

    return {
        items: await response.json(),
        count: response.headers.get('X-Total-Count'),
    };
};

export const getCar = async (id: number): Promise<Car> => (await fetch(`${garage}/${id}`)).json();

export const createCar = async (body: Record<string, unknown>): Promise<Response> =>
    (
        await fetch(garage, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
            },
        })
    ).json();

export const deleteCar = async (id: number): Promise<Car> =>
    (
        await fetch(`${garage}/${id}`, {
            method: 'DELETE',
        })
    ).json();

export const updateCar = async (id: number, body: SimpleCar): Promise<void> =>
    (
        await fetch(`${garage}/${id}`, {
            method: 'PATCH', // PUT??
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
            },
        })
    ).json();

export const startEngine = async (id: number): Promise<Engine> =>
    (await fetch(`${engine}?id=${id}&status=started`, { method: 'PATCH' })).json();

export const stopEngine = async (id: number): Promise<Engine> =>
    (await fetch(`${engine}?id=${id}&status=stopped`, { method: 'PATCH' })).json();

export const driveStatus = async (id: number): Promise<{ success: boolean }> => {
    const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
    return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

export const getSortOrder = (sort?: string | null, order?: string | null): string =>
    sort && order ? `&_sort=${sort}&_order=${order}` : '';

export const getWinners = async ({
    page,
    limit = 10,
    sort,
    order,
}: {
    page: number;
    limit?: number;
    sort?: string;
    order?: string;
}): Promise<Winners> => {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
    const items = await response.json();

    return {
        items: await Promise.all(items.map(async (winner: Winner) => ({ ...winner, car: await getCar(winner.id) }))),
        count: response.headers.get('X-Total-Count'),
    };
};

export const getWinner = async (id: number): Promise<Winner> => (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${winners}/${id}`)).status;

export const createWinner = async (body: Record<string, unknown>) => {
    (
        await fetch(winners, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
            },
        })
    ).json();
};

export const updateWinner = async (id: number, body: Record<string, unknown>): Promise<void> => {
    (
        await fetch(`${winners}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
            },
        })
    ).json();
};

export const deleteWinner = async (id: number): Promise<void> =>
    (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const saveWinner = async (id: number, time: number) => {
    const winnerStatus = await getWinnerStatus(id);

    if (winnerStatus === 404) {
        await createWinner({ id, wins: 1, time });
    } else {
        const winner = await getWinner(id);
        await updateWinner(id, {
            id,
            wins: winner.wins + 1,
            time: time < winner.time ? time : winner.time,
        });
    }
};
