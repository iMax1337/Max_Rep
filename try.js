const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    let browser = await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp1"
    });

    let page = await browser.newPage();
    let url = 'https://www.bookmaker.eu/refer-a-friend'
    await page.goto(url);

    await page.waitForTimeout(15000)
    try{
        await page.waitForSelector('body > app-betslip > app-american-content > div > div > div.col-7.schedule-col > div > div > app-props-schedule > div > div > section > div.sports-league > div > div > div > div > app-schedule-game-gameview.ng-tns-c96-193.ng-star-inserted')
    }catch{
        console.log("failed")
    }


})();