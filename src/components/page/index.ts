import './index.css';
import { renderGarage } from '../garage';
import { renderWinners } from '../winners';

const renderPage = (): void => {
    const mainPageMarkup = `
  <div class="wrapper">
    <main class="main" id="page_garage">
      <div class="main__view-switcher">
          <button class="main__button button_garage" id="button_garage">TO GARAGE</button>
          <button class="main__button button_winners" id="button_winners">TO WINNERS</button>
      </div>
      <div class="main__view-garage">
        <div class="main__setup">
          <form class="main__form" id="form__create">
            <input class="main__input" id="input__create-name" type="text" required autocomplete="off"/>
            <input class="main__color" id="input__create-color" name="color" type="color" value="#ffffff"/>
            <button class="main__button" type="submit" id="button_create">CREATE</button>
          </form>
          <form class="main__form" id="form__update">
            <input class="input" id="input__update-name" type="text" disabled required autocomplete="off"/>
            <input class="main__color" id="input__update-color" name="color" type="color" value="#ffffff" disabled/>
            <button class="main__button" type="submit" id="button_update" disabled >UPDATE</button>
          </form>
          <div class="main__controls-game">
            <button class="main__button button_race" id="button_race">RACE</button>
            <button class="main__button" id="button_reset">RESET</button>
            <button class="main__button button_generate" id="button_generate-cars">GENERATE CARS</button>
          </div>
        </div>
        <div class="main__garage">${renderGarage()}</div>
        <div class="main__win-message">
          <p class="hidden" id="win-message"></p>
        </div>
      </div>
      <div class="main__view-winners" id="page_winners" style="display: none">${renderWinners()}</div>
      <div class="main__pagination">
        <button class="main__button button_prev" id="button_prev">PREV</button>
        <button class="main__button button_next" id="button_next">NEXT</button>
      </div>
    </main>
  </div>
  `;
    const app = document.createElement('div');
    app.innerHTML = mainPageMarkup;
    document.body.appendChild(app);
};

export default renderPage;
