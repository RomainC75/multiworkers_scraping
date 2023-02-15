const puppeteer = require('puppeteer')
const Api = require('./api')

module.exports= class Browser {
    constructor(){
        this.URL="https://scrapeme.live/shop/"
    }
    async init(){
        this.browser = await puppeteer.launch({
            args: [
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-setuid-sandbox",
                "--no-sandbox",
            ],
            slowMo:300,
            headless:true,  
        })
        this.page = await this.browser.newPage()
        await this.page.goto(this.URL)
        await this.page.waitForSelector('.taxable')
    }
    async recursiveScrape(){
        const data = await this.page.evaluate(()=>{
            const products = document.getElementsByClassName('products')[0]
            const pokemons = Array.from(products.getElementsByClassName('product'))
            return pokemons.map(pokemon=>{
                const name=pokemon.getElementsByTagName("h2")[0].innerText
                const url=pokemon.getElementsByTagName("a")[0].getAttribute('href')
                const price = pokemon.querySelector('.price').innerText.split("").slice(1).join("")
                return {
                    name,url,price
                }
            })
        })
        console.log('---scraper--- DATA on page: ', data)
        await Promise.all(data.map((pokemon)=>{
            return new Promise(async(resolve,reject)=>{
                try {
                    const ans = await Api.postNewLink(pokemon)
                    console.log('=================>')
                    resolve(ans)
                } catch (error) {
                    reject(error)
                }
            })
        }))
        try {
            await this.page.waitForSelector('.next')
            await this.page.click('.next')
            await this.page.waitForSelector('.taxable')
            this.recursiveScrape()
        } catch (error) {
            console.log('---scraper---  end ....')
        }
    }
}