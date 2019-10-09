import axios from "axios";

export default class Region {
  constructor(selected) {
    this.selected = selected;
  }

  async getRegion() {
    switch (this.selected) {
      case "Europe":
        // Woeid for Madrid, london, Paris, Rome and Moscow respectively
        const arr = ["766273", "44418", "615702", "721943", "2122265"];
        await this.getCities(arr);
        break;

      case "Africa":
        // Woeid for Nairobi, cape town, cairo, lagos, kinshasa
        const arr1 = ["1528488", "1591691", "1521894", "1398823", "1290062"];
        await this.getCities(arr1);
        break;

      case "North America":
        // Woeid for Mexico City, new york, Houston, chicago, dallas
        const arr2 = ["116545", "2459115", "2424766", "2379574", "2388929"];
        await this.getCities(arr2);
        break;

      case "South America":
        // Woeid for Rio de jainero, Lima , Santiago, caracas, Buenos Aires
        const arr3 = ["455825", "418440", "349859", "395269", "468739"];
        await this.getCities(arr3);
        break;

      case "Asia":
        // Woeid fro tokyo, Hong Kong, Beijing, Seoul, manila
        const arr4 = ["1118370", "2165352", "2151330", "1132599", "1199477"];
        await this.getCities(arr4);
        break;

      default:
        break;
    }
  }

  async getCities(arr) {
    const proxy = "https://cors-anywhere.herokuapp.com/";

    this.result = await axios(
      `${proxy}https://www.metaweather.com/api/location/${arr[0]}`
    );

    this.result1 = await axios(
      `${proxy}https://www.metaweather.com/api/location/${arr[1]}`
    );

    this.result2 = await axios(
      `${proxy}https://www.metaweather.com/api/location/${arr[2]}`
    );

    this.result3 = await axios(
      `${proxy}https://www.metaweather.com/api/location/${arr[3]}`
    );

    this.result4 = await axios(
      `${proxy}https://www.metaweather.com/api/location/${arr[4]}`
    );

    this.regionArr = [
      this.result.data,
      this.result1.data,
      this.result2.data,
      this.result3.data,
      this.result4.data
    ];

    console.log(this.regionArr);
  }
}
