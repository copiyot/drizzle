import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  //Get the woeid for the string search i.e "london"
  async getWoeid(cityName) {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    const results = await axios(
      `${proxy}https://www.metaweather.com/api/location/search/?query=${cityName}`
    );

    this.woeid = results.data[0].woeid;
    console.log(this.woeid);
    return this.woeid;
  }

  // Get weather using woeid
  async getWeather() {
    try {
      const proxy = "https://cors-anywhere.herokuapp.com/";

      if (typeof this.query !== "number") {
        this.query = await this.getWoeid(this.query);
      }

      const results = await axios(
        `${proxy}https://www.metaweather.com/api/location/${this.query}`
      );
      this.weather = results.data;
      //   console.log(this.weather);
    } catch (e) {
      alert(e.message);
    }
  }
}
