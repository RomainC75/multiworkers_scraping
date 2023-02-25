const puppeteer = require("puppeteer");
const Api = require("./api");

module.exports = class Browser {
  constructor() {
    this.api = new Api();
  }
  async init() {
    this.browser = await puppeteer.launch({
      args: [
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-setuid-sandbox",
          "--no-sandbox",
      ],
      slowMo: 1300,
      headless:true,
      // headless: false,
    });
    this.page = await this.browser.newPage();
  }
  async getNextPokemon() {
    //get url via API
    try {
      await this.api.getNextPokemon();
      const urlToScrape = this.api.getUrlToScrape();
      await this.page.goto(urlToScrape);
      const data = await this.page.evaluate(() => {
        const description = document
          .querySelector(".woocommerce-product-details__short-description")
          .textContent.trim();
        const rawStock = document.querySelector(".stock.in-stock").textContent;
        const stock = parseInt(rawStock.split(" ")[0]);
        return {
          description,
          stock,
        };
      });
      await this.api.postDetails(data.description, data.stock);
    } catch (error) {
        
    }
  }
};
