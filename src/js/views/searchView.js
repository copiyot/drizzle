import { selectors } from "./base";

// Getting query from the user
export const getInput = () => selectors.searchInput.value;

// Clearing input
export const clearInput = () => {
  selectors.searchInput.value = "";
};

// Clear weather results
export const clearWeather = () => {
  selectors.searchWeatherList.innerHTML = "";
};

// formatting days to words
const formatDays = day => {
  switch (day) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturday";

    default:
      return "Invalid Date";
  }
};

// getting days

const getDays = date => {
  const month = new Date(date);

  const day = formatDays(month.getDay());

  // console.log(day);

  return day;
};

// getting weather icon
const weatherIcon = abbr => {
  switch (abbr) {
    case "sn":
      return "fas fa-snowflake";
      break;

    case "sl":
      return "fas fa-smog";
      break;

    case "h":
      return "fas fa-snowflake";
      break;

    case "t":
      return "fas fa-poo-storm";
      break;

    case "hr":
      return "fas fa-cloud-showers-heavy";
      break;

    case "lr":
      return "fas fa-cloud-rain";
      break;

    case "s":
      return "fas fa-cloud-sun-rain";
      break;

    case "hc":
      return "fas fa-cloud-meatball";
      break;

    case "lc":
      return "fas fa-cloud-sun";
      break;

    case "c":
      return "fas fa-sun";
      break;

    default:
      return "Invalid Icon";
      break;
  }
};

const filterFunction = (str, arr) => {
  return !arr.includes(str);
};

// Limiting the Country names
const limitCountryName = (countryName, limit = 12) => {
  if (countryName.length >= limit) {
    const country = countryName.split(" ");

    const newCountry = country.filter(e =>
      filterFunction(e.toLowerCase(), ["of", "the"])
    );

    const abbrs = newCountry.map(e => e.slice(0, 1));

    const abbr = abbrs.join(".");

    return abbr;

    // countryName.split(" ").reduce((acc, cur) => {
    //   if (acc + cur.length <= limit) {
    //     newCountryName.push(cur);
    //   }
    //   return acc + cur.length;
    // }, 0);

    // //returning the new result
    // return `${newCountryName.join(" ")}`;
  }

  return countryName;
};

// displaying daily weather on the screen
export const renderWeather = weather => {
  // console.log(weather);

  // The time when the search is made
  const time = weather.time.slice(11, 16);

  // The date when the search is made
  const date = weather.time.slice(8, 10);

  //GMT
  const gmt = weather.time.slice(26, 29);

  const month = new Date(weather.consolidated_weather[0].applicable_date);
  // new Date(weather.consolidated_weather[0].applicable_date);

  const cityCountry = `${weather.title}, ${weather.parent.title}`;
  // console.log(cityCountry);

  const markUp = `
<div class="results__week-city">
  ${limitCountryName(weather.title)}, ${limitCountryName(weather.parent.title)}
</div>

<div class="results__week-time">${time} GMT${gmt}00</div>

<div class="results__week-date">${date} ${month.toString().slice(4, 7)}</div>

<div class="results__week-day">${getDays(
    weather.consolidated_weather[0].applicable_date
  )}</div>

<div class="results__week-icon">
  <i class="${weatherIcon(
    weather.consolidated_weather[0].weather_state_abbr
  )} fa-5x"></i>
  <div class="results__weather-text">${
    weather.consolidated_weather[0].weather_state_name
  }</div>
</div>

<div class="results__week-temp">${weather.consolidated_weather[0].the_temp
    .toString()
    .slice(0, 2)}&deg;c</div>

<div class="results__week-nextday">
  <span class="results__week-day">${getDays(
    weather.consolidated_weather[1].applicable_date
  )}</span>
  ${weather.consolidated_weather[1].the_temp.toString().slice(0, 2)}&deg;c
      <i class="${weatherIcon(
        weather.consolidated_weather[1].weather_state_abbr
      )}"></i>
      ${weather.consolidated_weather[1].weather_state_name}
</div>
<div class="results__week-nextday">
  <span class="results__week-day">${getDays(
    weather.consolidated_weather[2].applicable_date
  )}</span>
  ${weather.consolidated_weather[2].the_temp.toString().slice(0, 2)}&deg;c
  <i class="${weatherIcon(
    weather.consolidated_weather[2].weather_state_abbr
  )}"></i>
  ${weather.consolidated_weather[2].weather_state_name}
</div>
<div class="results__week-nextday">
  <span class="results__week-day">${getDays(
    weather.consolidated_weather[3].applicable_date
  )}</span>
  ${weather.consolidated_weather[3].the_temp.toString().slice(0, 2)}&deg;c
  <i class="${weatherIcon(
    weather.consolidated_weather[3].weather_state_abbr
  )}"></i>
  ${weather.consolidated_weather[3].weather_state_name}
</div>
<div class="results__week-nextday">
  <span class="results__week-day">${getDays(
    weather.consolidated_weather[4].applicable_date
  )}</span>
  ${weather.consolidated_weather[4].the_temp.toString().slice(0, 2)}&deg;c
  <i class="${weatherIcon(
    weather.consolidated_weather[4].weather_state_abbr
  )}"></i>
  ${weather.consolidated_weather[4].weather_state_name}
</div>

<span class="results__weel-arrow">&larr;</span>
    `;

  selectors.searchWeatherList.insertAdjacentHTML("beforeend", markUp);
};
