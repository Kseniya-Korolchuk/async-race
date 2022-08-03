import './index.css';
import store from '../../services/store';
import { getWinners } from '../../services/api';
import { carImg } from '../car';

export const renderWinners = (): string => `
  <h2>Winners (${store.winnersCount})</h2>
  <h3>Page #${store.winnersPage}</h3>
<table>
<tr>
  <th>№</th>
  <th>Car</th>
  <th>Model</th>
      <th class="winners__button
      ${store.sortBy === 'wins' ? store.sortOrder : ''}	id="sort-by-wins"><span class="button_wins">Wins</span></th>
      <th class="winners__button ${
          store.sortBy === 'time' ? store.sortOrder : ''
      }	id="sort-by-time"><span class="button_time">Best time (sec)</span></th>
  </tr>
        ${store.winners
            .map(
                (
                    winner: {
                        car: { name: string; color: string };
                        wins: number;
                        time: number;
                    },
                    index
                ) => `
        <tr>
          <td>${index + 1}</td>
          <td class="winners__img-car">${carImg(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
      `
            )
            .join('')}
</table>`;

export const updateWinners = async (): Promise<void> => {
    const { items, count } = await getWinners({
        page: store.winnersPage,
        sort: store.sortBy,
        order: store.sortOrder,
    });

    store.winners = items;
    store.winnersCount = count;

    const nextBtn = document.getElementById('button_next') as HTMLButtonElement;
    nextBtn.disabled = store.winnersPage * 10 >= Number(store.winnersCount);

    const prevBtn = document.getElementById('button_prev') as HTMLButtonElement;
    prevBtn.disabled = store.winnersPage <= 1;
};

export const setSortOrder = async (sortBy: string): Promise<void> => {
    store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    store.sortBy = sortBy;

    await updateWinners();
    const winnersPage = document.querySelector('.main__view-winners') as HTMLDivElement;
    winnersPage.innerHTML = renderWinners();
};
