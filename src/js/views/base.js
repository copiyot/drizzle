export const selectors = {
  searchForm: document.querySelector(".main__section-form"),
  searchInput: document.querySelector(".search__city"),
  searchWeatherList: document.querySelector(".results__week"),
  searchRegion: document.getElementById("search__region-option"),
  searchCities: document.querySelector(".main__section-region1"),
  searchGraph: document.querySelector("#container"),
  seachLoading: document.querySelector(".loading")
};

// export const elementString = () => {
//   loader: "loader";
// };

export const renderLoader = parent => {
  const loader = `
  <div class = "loader">
    <svg>
      <use href="./img/icons.svg#icon-cw"></use>
    </svg>
  </div>
  `;

  parent.insertAdjacentHTML("beforeend", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(".loader");
  if (loader) loader.parentElement.removeChild(loader);
};
