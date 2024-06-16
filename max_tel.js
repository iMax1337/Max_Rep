const puppeteer = require('puppeteer');
const fs = require('fs');

const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const bot = new TelegramBot('6430631792:AAGPZnQXQ-m5gfVF8Dh6a1pXPoikzgJUc5A', { polling: true });

// Replace 'CHAT_ID' with the ID of the group chat you want to send messages to
const chatId = '-4102679039';

// Function to send a message to the group
function sendMessageToGroup(message) {
  bot.sendMessage(chatId, message);
}

// Handle any errors
bot.on('polling_error', (error) => {
  console.error(error);
});

var lista_soccer = ['Honduras', 'Vietnam'];
basketball_leagues = [
    "France - Championnat Pro A",
    "Israel - Premier League",
    "Lithuania - Lietuvos Krepsinio Lyga",
    "Puerto Rico - Superior Nacional",
    "Switzerland - SB League",
    "ABA - Adriatic League",
    "Europe - Euroleague",
    "Estonia - Meistriliiga",
    "Slovenia - 1. SKL",
    "Denmark - Basketligaen",
    "Korean - Basketball League",
    "Argentina - LDD",
    "Bulgaria - NBL",
    "Europe - Champions League",
    "Germany - Bundesliga",
    "Italy - Lega A",
    "Turkey - Super League",
    "Italy - Lega A1 Women",
    "Spain - Liga Women",
    "Austria - SuperLiga",
    "England - BBL Championship",
    "Czech Republic - NBL",
    "Latvia - LBL Division 1",
    "Lebanon - Lebanese Basketball League",
    "Serbia - Nasa Liga",
    "Romania - Division A",
    "China - CBA",
    "Iranian - Basketball Super League"
]
var lista_string_basket = [];

(async () => {
    let browser = await puppeteer.launch({
        executablePath: 'C:/Users/max_r/OneDrive/Ambiente de Trabalho/chrome-win-b/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp1"
    });

    let page = await browser.newPage();
    url = 'https://web.telegram.org/k/#-1848929348'
    // https://web.telegram.org/k/#-1848929348 - basket
    // https://web.telegram.org/k/#-1660932647 - soccer
    // https://web.telegram.org/k/#-1522050042 - handball
    await page.goto(url);
    await page.waitForTimeout(3000);
    while(true){
        for (let index = 1; index < 25; index++) {
            for (let out = 1; out < 3; out++) {
                try{
                    await page.waitForSelector('#column-center > div > div > div.bubbles.is-chat-input-hidden.has-groups.has-sticky-dates.scrolled-down > div.scrollable.scrollable-y > div.bubbles-inner.is-broadcast > section:nth-child(2) > div:nth-child('+index+') > div:nth-child('+out+')', { 
                        timeout: 1 * 1000});  

                    var message = await page.$eval('#column-center > div > div > div.bubbles.is-chat-input-hidden.has-groups.has-sticky-dates.scrolled-down > div.scrollable.scrollable-y > div.bubbles-inner.is-broadcast > section:nth-child(2) > div:nth-child('+index+') > div:nth-child('+out+')', div => div.textContent.trim());
                   
                    for(let i = 0; i < basketball_leagues.length; i++){
                        if(message.includes(basketball_leagues[i])){
                            if(lista_string_basket.includes(message)){
                                continue
                            }else{
                                lista_string_basket.push(message)
                                console.log(message)
                                // sendMessageToGroup(message)
                            }
                        }else{
                            continue
                        }
                    }
                }catch (error) {
                    if (error.name === 'TimeoutError') {
                        continue; // Continue the loop if it's a timeout error
                    } else {
                        console.log(error);
                        break; // Break the loop for other errors
                    }
                }       
            }
        }
    }

})();
