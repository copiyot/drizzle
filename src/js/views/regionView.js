import { selectors } from "./base";

//Getting the selected region the user
export const getSelected = () => selectors.searchRegion.value;

//Clearing input
export const clearInput = () => {
  selectors.searchRegion.value = "Europe";
};

// Clearing city results
export const clearCities = () => {
  selectors.searchCities.innerHTML = " ";
};

// onclick = "${() =>
//   cb(city.title)}"

// Rendering a single city
const renderCity = city => {
  const markUp = `
    <div class="col-1-of-5" data-city = "${city.title}"  >

      <div class="city__image-shape">
        <img src="./img/${
          city.title
        }.jpg" alt="Rome city" class="city__image" />
      </div>

      <div class="search__text">
        <div class="search__city-alternate" >
          ${city.title}
        </div>
        <div class="search__weather-alternate">
          ${city.consolidated_weather[0].weather_state_name}
        </div>
        <div class="search__temp-alternate">
          ${city.consolidated_weather[0].the_temp.toString().slice(0, 2)}&deg;c
        </div>
      </div>
    </div>
      `;
  //   const markUp = `<h2>Hello World</h2>`;

  selectors.searchCities.insertAdjacentHTML("beforeend", markUp);
};

export const renderCities = cities => {
  // console.log(cities);
  cities.forEach(e => {
    renderCity(e);
  });
};
