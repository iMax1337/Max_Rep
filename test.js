
var Names = [];
var Backs = [];
var Lays = [];
var Avgs = [];
var currentOdds = [];
var money_arr = [];

const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const bot = new TelegramBot('5955654059:AAFZ-jmHObWssHmy6IkSbTARZMTG3wuU10I', { polling: true });

// Replace 'CHAT_ID' with the ID of the group chat you want to send messages to
const chatId = '-1001699382412';

const chatIdtwo = '801686373';

// Function to send a message to the group
function sendMessageToGroup(message) {
  bot.sendMessage(chatId, message);
}
function sendMessageToGroupTwo(message) {
  bot.sendMessage(chatIdtwo, message);
}

// Handle any errors
bot.on('polling_error', (error) => {
  console.error(error);
});

const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    let browser = await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/chrome-win/chrome.exe',
        headless: true,
        defaultViewport: false,
        userDataDir: "./tmp1"
    });

    let page = await browser.newPage();
        
    //BETANO FIRST TO SCORE

      let browser2 = await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/chrome-win-b/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp2"
      });
        
    let page2 = await browser2.newPage();
    
    //betclic FIRST TO SCORE

        let browser3 = await puppeteer.launch({
          executablePath: 'C:/Users/max_r/Desktop/chrome-win-betclic/chrome.exe',
          headless: true,
          defaultViewport: false,
          userDataDir: "./tmp3"
        });
          
    let page3 = await browser3.newPage();

    const fileContent = fs.readFileSync('betfair.txt', 'utf8');
    const urls = fileContent.split('\n');
    var url = 'https://www.betfair.com/exchange/plus/en/football-betting-1';

    const fileContent2 = fs.readFileSync('betano.txt', 'utf8');
    const urls2 = fileContent2.split('\n');
    var url2 = 'https://www.betano.pt/';

    const fileContent3 = fs.readFileSync('betclic.txt', 'utf8');
    const urls3 = fileContent3.split('\n');
    var url3 = 'https://www.betclic.pt/';

    await page.goto(url);
    await page2.goto(url2);
    await page3.goto(url3);

      // LOGIN BETFAIR
  try{
      // Login Username
    await page.waitForSelector('input#ssc-liu', { 
      timeout: 30 * 1000 
    })
    await page.waitForTimeout(1000)

    await page.$eval('input#ssc-liu', el => el.value = 'fuzkze@mailto.plus');
  
    // Login Password
    await page.waitForSelector('input#ssc-lipw', { 
      timeout: 5 * 1000 
    })
    await page.waitForTimeout(1000)

    await page.$eval('input#ssc-lipw', el => el.value = 'ASDIDFK123!a');
  
    // Login Submit
    await page.waitForTimeout(1000)

    await page.click('input#ssc-lis');
    await page.waitForTimeout(1000)


    }catch{
  }

    var NumberOfPlayers = 16;
    var NumberOfPlayersBetano = 10;
    var NumberOfPlayersBetclic = 10;

    while(true){

    console.clear();

    await page.waitForTimeout(1000)

for (let i = 0; i < urls.length; i++) {
        url = urls[i].trim();
        url2 = urls2[i].trim();
        // url3 = urls3[i].trim();

        // Skip empty lines or lines starting with a comment character
        if (url === '' || url.startsWith('#') || url2 === '' || url2.startsWith('#') || url3 === '' || url3.startsWith('#')) {
            continue;
        }


    //betfair error try
try {
    
    await page.goto(url);
    await page3.goto(url3);

    await page.waitForTimeout(1500);
    
    await page.waitForSelector('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child(1) > td.new-runner-info > div > div.runner-data-container.without-race-card-info > bf-runner-info > div > div > h3', { 
      timeout: 5 * 1000 
    });

    await page.waitForTimeout(1000);

    try{
      var gamename = await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div:nth-child(1) > div > bf-sports-header > div > div > div > ng-include > div > span > span', div => div.textContent.trim());
      console.log("Game- " +gamename);
    }catch{
    }

    for (let index = 0; index < NumberOfPlayers; index++) {

      var Name = await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child('+(index+1)+') > td.new-runner-info > div > div.runner-data-container.without-race-card-info > bf-runner-info > div > div > h3', div => div.textContent.trim());
      var BackOdd = parseFloat(await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child('+(index+1)+') > td.bet-buttons.back-cell.last-back-cell > ours-price-button > button > label.Zs3u5.AUP11.Qe-26', div => div.textContent.trim()));
      var LayOdd = parseFloat(await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child('+(index+1)+') > td.bet-buttons.lay-cell.first-lay-cell > ours-price-button > button > label.Zs3u5.AUP11.Qe-26', div => div.textContent.trim()));
      var buttom = await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child('+(index+1)+') > td.bet-buttons.lay-cell.first-lay-cell > ours-price-button > button', div => div.textContent.trim());
      var line_without = buttom.replace(/\s+/g, "");
      var splitString = line_without.split("$");
      var money = splitString[1]
      

      if( isNaN(LayOdd) || isNaN(BackOdd)){
        LayOdd = 0;
      }else{

        var Average = (BackOdd + LayOdd) / 2;

            Names.push(Name);
            Backs.push(BackOdd);
            Lays.push(LayOdd);
            Avgs.push(Average);
            money_arr.push(money)

        if(LayOdd == 0){
        }else{
          console.log("name- " +Name+ " Lay- " +LayOdd);
          // let textGroup = '';
          // textGroup += `${Name},${LayOdd}\n`;
        }
      }
    }

    // sendMessageToGroupTwo("game" + textGroup);

  }catch(error) {
    console.log('betfair '+error.message)
    continue;
}

//     // betclic error
// try{
//   await page3.waitForTimeout(1000);

//   var ok_val = await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > bcdk-filters > div > div > div:nth-child(2)', div => div.textContent.trim())

//   if(ok_val == 'Marcador'){
//     await page3.click('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > bcdk-filters > div > div > div:nth-child(2)', { 
//       timeout: 5 * 1000 
//     });

//     try{
//       // BETCLIC
//       await page3.waitForTimeout(1000);

//       await page3.click('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(1) > div > div:nth-child(5) > button');
      
//       await page3.waitForTimeout(1000);

//       await page3.click('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(1) > div > div:nth-child(3) > button');

//       await page3.waitForTimeout(1000);

//       for (let index = 0; index < NumberOfPlayersBetclic; index++) {

//       var TN1 = await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(1) > div > div:nth-child(2) > div:nth-child('+(index+2)+') > p', div => div.textContent.trim());
//       var Todd1 = parseFloat(await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(1) > div > div:nth-child(2) > div:nth-child('+(index+2)+') > div.marketBox_list > div:nth-child(2) > sports-selections-selection > div > span.oddValue', div => div.textContent.trim().replace(',', '.')));
//       //console.log(TN1 + " - " + Todd1); 
      
//       //TEAM 2
//       var TN2 = await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(1) > div > div:nth-child(4) > div:nth-child('+(index+2)+') > p', div => div.textContent.trim());
//       var Todd2 = parseFloat(await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(1) > div > div:nth-child(4) > div:nth-child('+(index+2)+') > div.marketBox_list > div:nth-child(2) > sports-selections-selection > div > span.oddValue', div => div.textContent.trim().replace(',', '.')));
//       //console.log(TN2 + " - " + Todd2);

//       findBetclic(TN1, Names, 0.7, Todd1);
//       findBetclic(TN2, Names, 0.7, Todd2);
//   }
// }catch {
//   console.log("betclic inside marcador"+error.message)
// }

//   } else{
//     await page3.click('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > bcdk-filters > div > div > div:nth-child(3)', { 
//       timeout: 5 * 1000 
//     });
  
//     try{
//       await page3.waitForTimeout(1000);

//       await page3.evaluate(() => {
//         window.scrollBy(0, 200); // Scroll down one viewport height
//       });

//       await page3.click('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(2) > div > div:nth-child(5) > button');

//       await page3.waitForTimeout(1000);

//       await page3.click('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(2) > div > div:nth-child(3) > button');

//       await page3.waitForTimeout(1000);

//       for (let index = 0; index < NumberOfPlayersBetclic; index++) {

//       var TN1 = await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(2) > div > div:nth-child(2) > div:nth-child('+(index+2)+') > p', div => div.textContent.trim());
//       var Todd1 = parseFloat(await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(2) > div > div:nth-child(2) > div:nth-child('+(index+2)+') > div.marketBox_list > div:nth-child(2) > sports-selections-selection > div > span.oddValue', div => div.textContent.trim().replace(',', '.')));
//       //console.log(TN1 + " - " + Todd1); 

//       //TEAM 2
//       var TN2 = await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(2) > div > div:nth-child(4) > div:nth-child('+(index+2)+') > p', div => div.textContent.trim());
//       var Todd2 = parseFloat(await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-grouped-markets:nth-child(2) > div > div:nth-child(4) > div:nth-child('+(index+2)+') > div.marketBox_list > div:nth-child(2) > sports-selections-selection > div > span.oddValue', div => div.textContent.trim().replace(',', '.')));
//       //console.log(TN2 + " - " + Todd2);

//       findBetclic(TN1, Names, 0.7, Todd1);
//       findBetclic(TN2, Names, 0.7, Todd2);
//       }
//   }catch{
//     console.log('betclic outside marcador '+error.message)
//   }
  
//   }

// }catch(error) {
//   console.log("betclic erro"+error.message)
// }     

    // betano error

    try{

  await page2.goto(url2);
  await page2.waitForTimeout(1500);

  await page2.click('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.markets > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > div > button');

  await page2.waitForTimeout(1500);
  
    // If not live
  await page2.waitForSelector('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.markets > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div.row-info > div > div', { 
    timeout: 5 * 1000 
  });
    
var game = await page2.$eval('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > nav > ul > li:nth-child(5) > a', div => div.textContent.trim());
var hour = await page2.$eval('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.event-details__container > div > div.event-details__info > div > div', div => div.textContent.trim());

  // Define a regex pattern to extract the time
var timePattern = /(\d{1,2}:\d{2})/;

// Find the matched time string using regex
var match = hour.match(timePattern);

if (match) {
    // Extracted time string
    var extractedTimeStr = match[1];
    // Convert extracted time string to Date object
   // Extracted hour and minute
   var [extractedHour, extractedMinute] = extractedTimeStr.split(':');

   // Get current real-life time
   var currentTime = new Date();
   var currentHour = currentTime.getHours();
   var currentMinute = currentTime.getMinutes();

    // Calculate time difference in hours and minutes
    var hourDifference = parseInt(extractedHour) - currentHour;
    var minuteDifference = parseInt(extractedMinute) - currentMinute;

    if (minuteDifference < 0) {
        minuteDifference += 60;
        hourDifference--;
    }
} 

  if(hourDifference >= 1){
    continue;
  }


  for (let index = 0; index < NumberOfPlayersBetano; index++) {
  
    //TEAM 1
  TN1 = await page2.$eval('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.markets > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child('+(index+2)+') > div.row-info > div > div', div => div.textContent.trim());
  Todd1 = parseFloat(await page2.$eval('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.markets > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child('+(index+2)+') > div.columns-values > div > div:nth-child(2) > button', div => div.textContent.trim()));
  // console.log(TN1 + "-" + Todd1);

  //TEAM 2
  TN2 = await page2.$eval('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.markets > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child('+(index+2)+') > div.row-info > div > div', div => div.textContent.trim());
  Todd2 = parseFloat(await page2.$eval('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.markets > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(2) > div:nth-child('+(index+2)+') > div.columns-values > div > div:nth-child(2) > button > span', div => div.textContent.trim()));
  // console.log(TN2 + "-" + Todd2);
  // body > div.root-wrapper.root-wrapper--handheld.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div.vertical-overflow-container.vertical-overflow-container--enabled.vertical-overflow-container--no-space > div.markets > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div.columns-values > div > div:nth-child(2) > button

  findSimilarNames(TN1, Names, 0.7, Todd1, game, hour);
  findSimilarNames(TN2, Names, 0.7, Todd2, game, hour);
}


      // Create a string with the combined data
      let textData = '';
      for (let i = 0; i < Names.length; i++) {
        textData += `${gamename},${Names[i]},${Lays[i]}\n`;
      }
      // Define the file path
      const filePath = 'daily.txt';
      
      // Write data to the file
      fs.appendFileSync(filePath, textData, 'utf-8');
  


Names = [];
Backs = [];
Lays = [];
Avgs = [];
currentOdds = [];
money_arr = [];


  }catch(error) {
    console.log('betano '+error.message)
    Names = [];
    Backs = [];
    Lays = [];
    Avgs = [];
    currentOdds = [];
    money_arr = [];
    continue
}      


}


url =   'https://www.betfair.com/exchange/plus/en/football-betting-1';
url2 =  'https://www.betano.pt/';
url3 =  'https://www.betclic.pt/';
await page.goto(url);
await page2.goto(url2);
await page3.goto(url3);

// sendMessageToGroup("30 seconds till next update");
// await page.waitForTimeout(10000)
    }  
})();


  function findSimilarNames(targetName, namesArray, threshold, odds, betURL, hours) {
    
    for (const name of namesArray) {
      const distance = levenshteinDistance(targetName, name);
      const similarity = 1 - distance / Math.max(targetName.length, name.length);
      
      if (similarity >= threshold) {
        var indexi = Names.indexOf(name);
        // Lays[indexi] = 2;
        if(Lays[indexi]==0){
        }else{

          if(currentOdds[indexi] > odds){

            if(currentOdds[indexi] >= Lays[indexi]){

                var edge = parseFloat(((1/Lays[indexi])*(currentOdds[indexi]-1)-((1-(1/Lays[indexi]))))).toFixed(2);
  
                sendMessageToGroup(
                  name + "--> Betclic @" + currentOdds[indexi] + "\n" + 
                  "True Odd @" + Lays[indexi] + " Edge -> " + edge*100+"%" + "\n" +
                  "Game- " + betURL + "\n" + 
                  "Start- " + hours + "\n");
              }
            }
            else{

              if(odds >= Lays[indexi]){
                var edge = parseFloat(((1/Lays[indexi])*(odds-1)-((1-(1/Lays[indexi]))))).toFixed(2);
  
                sendMessageToGroup(
                  name + "--> Betano @" + odds + "\n" + 
                  "True Odd @" + Lays[indexi] + " Edge -> " + edge*100+"%" + "\n" +
                  "Game- " + betURL + "\n" + 
                  "Start- " + hours + "\n" +
                  "Money- " + money_arr[indexi]);
              }else{
              }
            }
          }
        }
      }
  }

  function findBetclic(targetName, namesArray, threshold, Odd) {
    
    for (const name of namesArray) {
      const distance = levenshteinDistance(targetName, name);
      const similarity = 1 - distance / Math.max(targetName.length, name.length);
      
      if (similarity >= threshold) {
        var indexi = Names.indexOf(name);
        // console.log(Names[indexi])
        currentOdds[indexi] = Odd;
        // console.log(currentOdds[indexi])
    }
  }
  }

  function levenshteinDistance(a, b) {
    const distanceMatrix = Array(b.length + 1).fill(null).map(() =>
      Array(a.length + 1).fill(null)
    );
    
    for (let i = 0; i <= a.length; i++) {
      distanceMatrix[0][i] = i;
    }
    
    for (let j = 0; j <= b.length; j++) {
      distanceMatrix[j][0] = j;
    }
    
    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        distanceMatrix[j][i] = Math.min(
          distanceMatrix[j][i - 1] + 1,
          distanceMatrix[j - 1][i] + 1,
          distanceMatrix[j - 1][i - 1] + indicator
        );
      }
    }
    return distanceMatrix[b.length][a.length];
  }