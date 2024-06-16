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

const puppeteer = require('puppeteer');

const Prev_games = [];

const sent_not = [];

// Function to launch the browser
async function launchBrowser() {
    return await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-b/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp1"
    });
}


function isDifferenceTenPercentOrGreater(a, b) {

    if(parseFloat(b) >= parseFloat(a)){
        return false
    }
    const difference = (1/b) - (1/a);
    // console.log('+++'+difference)
    return parseFloat(difference) >= 0.001;
  }


async function check_changes(prev, current) {


    prev.forEach((prevItem) => {
        const currentItem = current.find((ci) => prevItem.team1 == ci?.team1 && prevItem.team2 == ci?.team2)
        // console.log(' currentItem ', currentItem);
  
        let message = []

        if(sent_not.includes(prevItem?.team1+'spread')){
            
        }else{  // spreads
            

        prevItem?.spreads.forEach((prevSpread) => {

          const currentSpread = currentItem?.spreads?.find((currentSpread) => prevSpread?.team1Spread == currentSpread?.team1Spread && prevSpread?.team2Spread == currentSpread?.team2Spread)

          if (isDifferenceTenPercentOrGreater(prevSpread?.team1SpreadOdd, currentSpread?.team1SpreadOdd)) {
            let thisOne = ('Game: '+`${prevItem?.team1} vs ${prevItem?.team2}`+` Spread: ${prevSpread?.team1Spread}`+` prev odd: ${prevSpread?.team1SpreadOdd}`+' +++++ +++++ ' + ` current odd: ${currentSpread?.team1SpreadOdd}`)
            sent_not.push(prevItem?.team1+'spread')
            message.push(thisOne)
            // SEND NOTIFICATION
          }
  
          if (isDifferenceTenPercentOrGreater(prevSpread?.team2SpreadOdd, currentSpread?.team2SpreadOdd)) {
            let thisOne = ('Game: '+`${prevItem?.team1} vs ${prevItem?.team2}`+` Spread: ${prevSpread?.team2Spread}`+` prev odd: ${prevSpread?.team2SpreadOdd}`+' +++++ +++++ ' + ` current odd: ${currentSpread?.team2SpreadOdd}`)
            sent_not.push(prevItem?.team1+'spread')
            message.push(thisOne)
            // SEND NOTIFICATION
          }
  
        })
    }


        if(sent_not.includes(prevItem?.team1+'total')){}
        else{   // totals
        
            prevItem?.totals.forEach((prevTotal) => {
            const currentTotal = currentItem?.totals?.find((currentTotal) => prevTotal?.gameTotal == currentTotal?.gameTotal)
    
            if (isDifferenceTenPercentOrGreater(prevTotal?.over, currentTotal?.over)) {
                let thisOne = (' +++++ ', `${prevItem?.team1} vs ${prevItem?.team2}`+` OVER: ${prevTotal?.gameTotal}`+` Prev Odd: ${prevTotal?.over} -- ${currentTotal?.over}`);
                sent_not.push(prevItem?.team1+'total')
                message.push(thisOne)
                // SEND NOTIFICATION
            }
    
            if (isDifferenceTenPercentOrGreater(prevTotal?.under, currentTotal?.under)) {
                let thisOne = (' +++++ ', `${prevItem?.team1} vs ${prevItem?.team2}`+` UNDER: ${prevTotal?.gameTotal}`+` Prev Odd: ${prevTotal?.under} -- ${currentTotal?.under}`);
                sent_not.push(prevItem?.team1+'total')
                message.push(thisOne)
                // SEND NOTIFICATION
            }
    
        })   
    }

        if (message.length === 0){
        }else{
        console.log(message)
        }
        })
    }



// Function to navigate to the URL and extract JSON data
async function extractJsonData(page, url) {
    await page.goto(url);
    await page.waitForSelector('body > pre');
    await page.waitForTimeout(1000)
    return await page.evaluate(() => {
        const dataElement = document.querySelector('body > pre');
        return dataElement ? JSON.parse(dataElement.textContent) : null;
    });
}

// Function to process extracted JSON data and build the games array
function processJsonData(jsonData, trigger) {
    const current_games = []
    const leagues = jsonData.n[0][2];

    for (const leagueData of leagues) {
        const league = leagueData[1];
        const gamesData = leagueData[2];

        for (const gameData of gamesData) {
            const team1 = gameData[1];
            const team2 = gameData[2];
            const spreads = [];
            const totals = [];

            const spreadData = gameData[8][0][0];
            for (const spread of spreadData) {
                if (String(spread[0]).includes('.5')) {
                    const team1Spread = spread[1];
                    const team2Spread = spread[0];
                    const team1SpreadOdd = spread[3];
                    const team2SpreadOdd = spread[4];
                    spreads.push({team1Spread, team1SpreadOdd, team2Spread, team2SpreadOdd});
                }
            }

            const totalData = gameData[8][0][1];
            for (const total of totalData) {
                if (String(total[0]).includes('.5')) {
                    const gameTotal = total[0];
                    const over = total[2];
                    const under = total[3];
                    totals.push({gameTotal, over, under});
                }
            }
            if (trigger === 0){
                Prev_games.push({ league, team1, team2, spreads, totals });
            }else{
                current_games.push({ league, team1, team2, spreads, totals });
            }
        }
    }

    if (trigger === 0){
        return Prev_games;
    }else{
        check_changes(Prev_games, current_games)
        // return current_games
    }
}

// Main function to orchestrate the scraping process
(async () => {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.waitForTimeout(2000)

    await page.goto('https://www.ps3838.com/en/sports/basketball')

    await page.waitForTimeout(20000)   // LOGIN

    unix = (Math.floor(Date.now() / 1000))
    const basktDataUrl = 'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=&cl=100&d=&ec=&ev=&g=QQ%3D%3D&hle=false&inl=false&l=100&lang=&lg=&lv=&me=0&mk=1&more=false&o=1&ot=1&pa=0&pimo=0%2C1%2C2&pn=-1&pv=1&sp=4&tm=0&v=0&locale=en_US&_='+unix+'&withCredentials=true';
    
    const handball = ''
    const volleyball = ''
    const soccer = ''
    
    const jsonData = await extractJsonData(page, basktDataUrl);
    
    if (jsonData) {
        const games = processJsonData(jsonData, 0);
        // console.log(games);
    } else {
        console.log("No data found.");
    }

    while (true){

    await page.goto('https://www.ps3838.com/en/sports/basketball')

    await new Promise(resolve => setTimeout(resolve, 2500));

    unix = (Math.floor(Date.now() / 1000))
    const basktDataUrl = 'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=&cl=100&d=&ec=&ev=&g=QQ%3D%3D&hle=false&inl=false&l=100&lang=&lg=&lv=&me=0&mk=1&more=false&o=1&ot=1&pa=0&pimo=0%2C1%2C2&pn=-1&pv=1&sp=4&tm=0&v=0&locale=en_US&_='+unix+'&withCredentials=true';
    
    const handball = ''
    const volleyball = ''
    const soccer = ''

    const jsonData = await extractJsonData(page, basktDataUrl);
    
    if (jsonData) {
        const games = processJsonData(jsonData, 1);
        // console.log(games);
    } else {
        console.log("No data found.");
    }

    }
})();