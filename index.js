const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const bot = new TelegramBot('5955654059:AAFZ-jmHObWssHmy6IkSbTARZMTG3wuU10I', { polling: true });

// Replace 'CHAT_ID' with the ID of the group chat you want to send messages to
const chatId = '-1001699382412';

// Function to send a message to the group
function sendMessageToGroup(message) {
  bot.sendMessage(chatId, message);
}

// Handle any errors
bot.on('polling_error', (error) => {
  console.error(error);
});

const puppeteer = require('puppeteer');
const fs = require('fs');
const { title } = require('process');


(async () => {      
    //betfair

      let browser = await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/chrome-win-test/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp2"
      });
        
    let page = await browser.newPage();

    let browser3 = await puppeteer.launch({
      executablePath: 'C:/Users/max_r/Desktop/chrome-win-betclic/chrome.exe',
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp3"
    });
      
let page3 = await browser3.newPage();
    
    var url = 'https://www.ps3838.com/en/sports/basketball';
    var url3 = 'https://www.betclic.pt/basquetebol-s4/franca-betclic-elite-c15/levallois-metropolitans-st-quentin-m3001946724';

    // const fileContent2 = fs.readFileSync('betano.txt', 'utf8');
    // const urls2 = fileContent2.split('\n');
    // var url2 = 'https://www.betano.pt/';

    await page.goto(url);
    await page3.goto(url3);

    await page.waitForTimeout(5000);

   await page.evaluate(() => {
    window.scrollBy(0, 650); // Scroll down one viewport height
  });

  // Wait for a few seconds to see the effect
  await page.waitForTimeout(1500);

    try {
      // Attempt to select the element using the given selector
      const Odds = await page.waitForSelector('#oddspage > div.OddsPageNormal > div.odds-container-nolive > div.odds-container > div > div > table#e1578658499.events.no-select.sp4 > tbody > tr > td:nth-child(10) > .odds', {
        visible: true, // Wait for the element to be visible
        timeout: 5000, // Set a timeout in milliseconds
      });

      const line = await page.waitForSelector('#oddspage > div.OddsPageNormal > div.odds-container-nolive > div.odds-container > div > div > table#e1578658499.events.no-select.sp4 > tbody > tr > td:nth-child(10) > .hdp', {
        visible: true, // Wait for the element to be visible
        timeout: 5000, // Set a timeout in milliseconds
      });
      
      const odds_element = await page.evaluate(element => element.textContent, Odds);
      const line_element = await page.evaluate(element => element.textContent, line);

      const stringWithoutSpaces = odds_element.replace(/\s+/g, "");
      const line_without = line_element.replace(/\s+/g, "");

      var aStr = stringWithoutSpaces.substring(0, 5);
      var bStr = stringWithoutSpaces.substring(5,10);

      // OVER AND UNDER AND LINE
      var Over = parseFloat(aStr);
      var Under = parseFloat(bStr);
      var lines = line_without.substring(0, 4);

      console.log("Over =", Over);
      console.log("Under =", Under);
      console.log("lINE =", lines);

      await page3.evaluate(() => {
        window.scrollBy(0, 650); // Scroll down one viewport height
      });

      await page3.evaluate(() => {
        window.scrollBy(0, 650); // Scroll down one viewport height
      });

      const TN2 = await page3.waitForSelector('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active.ng-star-inserted > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-markets-single-market:nth-child(13) > div > div', {
        visible: true, // Wait for the element to be visible
        timeout: 5000, // Set a timeout in milliseconds
      });
      
      const TN2_element = await page3.evaluate(element => element.textContent, TN2);
      console.log(TN2_element)


    } catch (error) {
    }
  })();

