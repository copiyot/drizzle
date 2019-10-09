import { selectors } from "./base";

export const clearGraph = () => {
  selectors.searchGraph.innerHTML = "";
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

export const renderGraph = weather => {
  const heading = `${weather.title} Evolutive Weather Forecast`;

  const markUp = `
    <div id="container" style="width: 100%; height: 400px; margin: 0 auto;"></div>
            <script language="JavaScript">
            ${$(document).ready(function() {
              var title = {
                text: heading.toString()
              };
              var subtitle = {
                text: "Powered by Metaweather"
              };
              var xAxis = {
                categories: [
                  getDays(
                    weather.consolidated_weather[0].applicable_date
                  ).toString(),
                  getDays(
                    weather.consolidated_weather[1].applicable_date
                  ).toString(),
                  getDays(
                    weather.consolidated_weather[2].applicable_date
                  ).toString(),
                  getDays(
                    weather.consolidated_weather[3].applicable_date
                  ).toString(),
                  getDays(
                    weather.consolidated_weather[4].applicable_date
                  ).toString(),
                  getDays(
                    weather.consolidated_weather[5].applicable_date
                  ).toString()
                ]
              };
              var yAxis = {
                title: {
                  text: " "
                },
                plotLines: [
                  {
                    value: 0,
                    width: 1,
                    color: "#808080"
                  }
                ]
              };

              var tooltip = {
                valueSuffix: "\xB0C"
              };
              var legend = {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
                borderWidth: 0
              };
              var series = [
                {
                  name: "Humidity",
                  data: [
                    weather.consolidated_weather[0].humidity,
                    weather.consolidated_weather[1].humidity,
                    weather.consolidated_weather[2].humidity,
                    weather.consolidated_weather[3].humidity,
                    weather.consolidated_weather[4].humidity,
                    weather.consolidated_weather[5].humidity
                  ]
                },
                {
                  name: "Wind-Speed",
                  data: [
                    weather.consolidated_weather[0].wind_speed,
                    weather.consolidated_weather[1].wind_speed,
                    weather.consolidated_weather[2].wind_speed,
                    weather.consolidated_weather[3].wind_speed,
                    weather.consolidated_weather[4].wind_speed,
                    weather.consolidated_weather[5].wind_speed
                  ]
                },
                {
                  name: "Temp",
                  data: [
                    weather.consolidated_weather[0].the_temp,
                    weather.consolidated_weather[1].the_temp,
                    weather.consolidated_weather[2].the_temp,
                    weather.consolidated_weather[3].the_temp,
                    weather.consolidated_weather[4].the_temp,
                    weather.consolidated_weather[5].the_temp
                  ]
                }
              ];

              var json = {};
              json.title = title;
              json.subtitle = subtitle;
              json.xAxis = xAxis;
              json.yAxis = yAxis;
              json.tooltip = tooltip;
              json.legend = legend;
              json.series = series;

              $("#container").highcharts(json);
              // $(".results__today1").highcharts(json);
            })}
            </script>
    `;

  selectors.searchGraph.insertAdjacentHTML("beforeend", markUp);
};
