const Browser = require('./util/browser')



const scrape = async () =>{
    const browser = new Browser()
    await browser.init()
    loop(browser)
}

const loop = async(browser)=>{
    await browser.getNextPokemon()
    await (new Promise((resolve)=>setTimeout(()=>resolve(true),1000)))
    loop(browser)
}

scrape()