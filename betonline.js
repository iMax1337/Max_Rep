
const puppeteer = require('puppeteer');

const list= ['9799011', '9797617', '9799012']

var prev_data = []

var current_data = []

const chromeExecutablePath1 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-b/chrome.exe';
const extensionPath = 'C:/Users/max_r/AppData/Local/Google/Chrome/User Data/Default/Extensions/kdeflnbamgblaaeggehciepaccjiojgd/1.1_0';

async function launchBrowser(executablePath, userDataDir) {
  try {
    return await puppeteer.launch({
      executablePath,
      headless: false,
      defaultViewport: false,
      userDataDir,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        '--enable-automation'
      ]
    });
  } catch (error) {
    console.error(`Failed to launch browser: ${error}`);
  }
}

async function extractJsonData(page, url) {
  await page.goto(url);
  await page.waitForSelector('body > pre');
  await page.waitForTimeout(3000)
  return await page.evaluate(() => {
      const dataElement = document.querySelector('body > pre');
      return dataElement ? JSON.parse(dataElement.textContent) : null;
  });
}

async function check_changes(prev, current) {
  current.forEach((currentItem) => {
    const prevItem = prev.find((pi) => pi.game === currentItem.game && pi.score_name === currentItem.score_name)


    if(currentItem.odd < prevItem.odd){
      console.log(prevItem, currentItem)
    }

})
}

async function process_data(data, trigger){
  const market_list = data.Result.MarketGroups
  const game = data.Result.Name
  // console.log(game)
  
  market_list.forEach((market) => {
    if(market.Name === 'Set Markets'){
        const item_list = market.Items
        item_list.forEach((item) => {
            if(item.Name === "First set - correct score"){
                const score_list = item.Items
                  item.Items.forEach((score) => {
                    const score_name = score.Name
                    const odd = score.Price
                    if(trigger === 0){
                      prev_data.push({game, score_name, odd})
                    }else{
                      current_data.push({game, score_name, odd})
                    }
                  })
            }
          })
    }
  })
}

(async () => {
  const browser1 = await launchBrowser(chromeExecutablePath1, './bet_online');

  if (!browser1) {
    console.error('Failed to launch one or both browsers');
    return;
  }

  const page1 = await browser1.newPage();

  for (const game in list){
    let url = 'https://sb2frontend-altenar2.biahosted.com/api/Sportsbook/GetEventDetails?timezoneOffset=-60&langId=8&skinName=justbetjaonline&configId=12&culture=en-GB&countryCode=PT&deviceType=Desktop&numformat=en&integration=justbetjaonline&eventId='+list[game]+'&sportId=68'
    let data = await extractJsonData(page1, url)
    process_data(data, 0)
  }

  while (true){

    for (const game in list){
      let url = 'https://sb2frontend-altenar2.biahosted.com/api/Sportsbook/GetEventDetails?timezoneOffset=-60&langId=8&skinName=justbetjaonline&configId=12&culture=en-GB&countryCode=PT&deviceType=Desktop&numformat=en&integration=justbetjaonline&eventId='+list[game]+'&sportId=68'
      let data = await extractJsonData(page1, url)
      process_data(data, 1)
    }
    check_changes(prev_data, current_data)
    current_data = []
  }

})();



// https://www.supremegames.com/#/prelive
// https://sb2frontend-altenar2.biahosted.com/api/Sportsbook/GetEventDetails?timezoneOffset=-60&langId=8&skinName=justbetjaonline&configId=12&culture=en-GB&countryCode=PT&deviceType=Desktop&numformat=en&integration=justbetjaonline&eventId=9786844&sportId=68