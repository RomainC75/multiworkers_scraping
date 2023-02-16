const puppeteer = require('puppeteer')
const Browser = require('./util/browser')

const scrape = async () =>{
    const browser = new Browser()
    await browser.init()
    await browser.recursiveScrape()

}

scrape()