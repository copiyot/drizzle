import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { selectors, renderLoader, clearLoader } from "./views/base";
import Region from "./models/Region";
import * as regionView from "./views/regionView";
import * as graphView from "./views/graphView";

/**
 * Global state of the app
 * -Search Object
 * -List Object
 * -Graph Object
 * -Region Object
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */

const querySearch = async () => {
  //1) Get the query from view
  const query = searchView.getInput();
  console.log(query);

  //2) New search object and added to state
  if (query) {
    state.search = new Search(query);
  }
  //3) Prepare UI fro display
  searchView.clearInput();
  searchView.clearWeather();
  renderLoader(selectors.searchWeatherList);

  //4) search for query
  await state.search.getWeather();

  //5) render results on the UI
  clearLoader();
  searchView.renderWeather(state.search.weather);

  //6) Display graph
  graphView.clearGraph();
  graphView.renderGraph(state.search.weather);
};

selectors.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  querySearch();
});

/**
 * REGION CONTROLLER
 */

const regionSearch = async () => {
  //1.Get the selected region from the view
  const selectedValue = regionView.getSelected();

  //2.New region object and add to state
  if (selectedValue) {
    state.region = new Region(selectedValue);
  }
  //3. Prepare UI for display
  regionView.clearInput();
  regionView.clearCities();
  renderLoader(selectors.searchCities);

  //4. Search the cities
  await state.region.getRegion();

  //5. Render the results in the UI
  clearLoader();
  regionView.renderCities(state.region.regionArr);
};

document
  .getElementById("search__region-option")
  .addEventListener("change", e => {
    e.preventDefault();
    regionSearch();
  });

/**
 * CITY CONTROLLER
 */

const citySearch = weather => {
  //1) Prepare UI fro display
  searchView.clearInput();
  searchView.clearWeather();
  renderLoader(selectors.searchWeatherList);

  //2) render results on the UI
  clearLoader();
  searchView.renderWeather(weather);

  //3) Display graph
  graphView.clearGraph();
  graphView.renderGraph(weather);
};

selectors.searchCities.addEventListener("click", e => {
  const btn = e.target.closest(".col-1-of-5");
  const cityName = btn.dataset.city;
  const weather = state.region.regionArr.find(e => e.title === cityName);
  citySearch(weather);
});

/**
 * ONLOAD CONTROLLLER
 */

const onloadController = async () => {
  const query = "Paris";
  const selectedValue = "Europe";
  //1.) Create search and region object
  state.search = new Search(query);
  state.region = new Region(selectedValue);

  //2.) search for paris and europe as the default
  await state.search.getWeather();
  await state.region.getRegion();

  //3.) Clear spinner
  const spinner = document.getElementById("overlay");
  spinner.parentElement.removeChild(spinner);

  //4.) Render Weather and Cities
  searchView.renderWeather(state.search.weather);
  regionView.renderCities(state.region.regionArr);

  //5.) Render Graph
  graphView.renderGraph(state.search.weather);
};

window.onload = onloadController();
