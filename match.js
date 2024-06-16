const TelegramBotTwo = require('node-telegram-bot-api-two');

// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const bot = new TelegramBotTwo('5548751610:AAFG655e23FFX1pS2utCbXfQbRwIsv0cyK0', { polling: true });

// Replace 'CHAT_ID' with the ID of the group chat you want to send messages to
const chatId = '-958019312';

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

(async () => {
    let browser = await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/chrome-win-matchVPN/chrome.exe',
        headless: true,
        defaultViewport: false,
        userDataDir: "./tmp4"
    });

    let page = await browser.newPage();
        
    //BETANO FIRST TO SCORE

      let browser2 = await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/chrome-win-smarkets-match/chrome.exe',
        headless: true,
        defaultViewport: false,
        userDataDir: "./tmp5"
      });
        
    let page2 = await browser2.newPage();
    

      //betclic FIRST TO SCORE

        let browser3 = await puppeteer.launch({
          executablePath: 'C:/Users/max_r/Desktop/chrome-win-c/chrome.exe',
          headless: true,
          defaultViewport: false,
          userDataDir: "./tmp3"
        });
          
    let page3 = await browser3.newPage();

    const fileContent = fs.readFileSync('MATCHBF.txt', 'utf8');
    const urls = fileContent.split('\n');
    var url = 'https://www.betfair.com/exchange/plus/en/football-betting-1';

    const fileContent2 = fs.readFileSync('MATCHBT.txt', 'utf8');
    const urls2 = fileContent2.split('\n');
    var url2 = 'https://www.betano.pt/';

    const fileContent3 = fs.readFileSync('MATCHBC.txt', 'utf8');
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

    while(true){

    await page.waitForTimeout(1000)

for (let i = 0; i < urls.length; i++) {
        url = urls[i].trim();
        url2 = urls2[i].trim();
        url3 = urls3[i].trim();

        // Skip empty lines or lines starting with a comment character
        if (url === '' || url.startsWith('#') || url2 === '' || url2.startsWith('#') || url3 === '' || url3.startsWith('#')) {
            continue;
        }

    await page.goto(url);
    await page2.goto(url2);
    await page3.goto(url3);

    await page.waitForTimeout(1500)

    try{
        var live = await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.mv-sticky-header > bf-marketview-header-wrapper > div > div > marketview-header > div > div > div.mv-header-main-section-wrapper > div > div.market-status.mv-header-field.market-going-inplay > span.market-status-label', div => div.textContent.trim());    
    }catch{
        // console.log(error.message)
        continue
    }

    try{

    
    var team1 = await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child(1) > td.new-runner-info > div > div.runner-data-container.without-race-card-info > bf-runner-info > div > div > h3', div => div.textContent.trim());    
    var team2 = await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child(2) > td.new-runner-info > div > div.runner-data-container.without-race-card-info > bf-runner-info > div > div > h3', div => div.textContent.trim());    
    var draw = await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child(3) > td.new-runner-info > div > div.runner-data-container.without-race-card-info > bf-runner-info > div > div > h3', div => div.textContent.trim());    
    
    var odds1 = parseFloat(await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child(1) > td.bet-buttons.lay-cell.first-lay-cell > ours-price-button > button > label.Zs3u5.AUP11.Qe-26', div => div.textContent.trim()));    
    var odds2 = parseFloat(await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child(2) > td.bet-buttons.lay-cell.first-lay-cell > ours-price-button > button > label.Zs3u5.AUP11.Qe-26', div => div.textContent.trim()));      
    var oddsD = parseFloat(await page.$eval('#main-wrapper > div > div.scrollable-panes-height-taker > div > ui-view > ui-view > div > div > div.bf-col-xxl-17-24.bf-col-xl-16-24.bf-col-lg-16-24.bf-col-md-15-24.bf-col-sm-14-24.bf-col-14-24.center-column.bfMarketSettingsSpace.bf-module-loading.nested-scrollable-pane-parent > div.scrollable-panes-height-taker.height-taker-helper > div > div.bf-row.main-mv-container > div > bf-main-market > bf-main-marketview > div > div.main-mv-runners-list-wrapper > bf-marketview-runners-list.runners-list-unpinned > div > div > div > table > tbody > tr:nth-child(3) > td.bet-buttons.lay-cell.first-lay-cell > ours-price-button > button > label.Zs3u5.AUP11.Qe-26', div => div.textContent.trim()));     

    var oddsBTteam1 = parseFloat(await page2.$eval('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.markets > div > div:nth-child(1) > div.selections-group > div:nth-child(1) > div > button > span.selections__selection__odd', div => div.textContent.trim()));
    var oddsBTteam2 = parseFloat(await page2.$eval('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.markets > div > div:nth-child(1) > div.selections-group > div:nth-child(3) > div > button > span.selections__selection__odd', div => div.textContent.trim()));
    var oddsBTdraw = parseFloat(await page2.$eval('body > div.root-wrapper.match-odds-route-page > div > section.main-content-wrapper > div.grid__row.main-content-wrapper__content > div.grid__column.grid__column--fluid.grid__column__main-content > section > div > div.markets > div > div:nth-child(1) > div.selections-group > div:nth-child(2) > div > button > span.selections__selection__odd', div => div.textContent.trim()));

    var team1BC = parseFloat(await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-markets-single-market:nth-child(1) > div > sports-markets-grid > div > div:nth-child(1) > sports-selections-selection > div.oddButtonWrapper.loading.ng-trigger.ng-trigger-oddsStateAnimation > span.oddValue', div => div.textContent.trim().replace(',', '.')));
    var team2BC = parseFloat(await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-markets-single-market:nth-child(1) > div > sports-markets-grid > div > div:nth-child(3) > sports-selections-selection > div.oddButtonWrapper.loading.ng-trigger.ng-trigger-oddsStateAnimation > span.oddValue', div => div.textContent.trim().replace(',', '.')));
    var drawBC = parseFloat(await page3.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > sports-match-page > div.marketBox_container.is-active > sports-match-markets > bcdk-vertical-scroller > div > div.verticalScroller_wrapper > div > div > sports-markets-single-market:nth-child(1) > div > sports-markets-grid > div > div:nth-child(2) > sports-selections-selection > div.oddButtonWrapper.loading.ng-trigger.ng-trigger-oddsStateAnimation > span.oddValue', div => div.textContent.trim().replace(',', '.')));

  if(team1BC > oddsBTteam1) {
        if(team1BC >= odds1)  {

        var edge = parseFloat(((1/odds1)*(team1BC-1)-((1-(1/odds1))))).toFixed(2);

        sendMessageToGroup(" --> Betclic @" + team1BC + "\n" + "True Odd @" + odds1 + "\n" + " Edge -> " + edge*100+"%" + "\n" + "team- " + team1 + "\n")
      }
  }

  if(team2BC > oddsBTteam2){
  if(team2BC >= odds2)  {

    var edge = parseFloat(((1/odds2)*(team2BC-1)-((1-(1/odds2))))).toFixed(2);

    sendMessageToGroup(" --> Betclic @" + team2BC + "\n" + "True Odd @" + odds2 + "\n" + " Edge -> " + edge*100+"%" + "\n" + "team- " + team2 + "\n")
  }
  }

  if(drawBC > oddsBTdraw){
    if(drawBC >= oddsD)  {
  
      var edge = parseFloat(((1/oddsD)*(drawBC-1)-((1-(1/oddsD))))).toFixed(2);
  
      sendMessageToGroup(" --> Betclic @" + drawBC + "\n" + "True Odd @" + oddsD + "\n" + " Edge -> " + edge*100+"%" + "\n" + "team- " + draw + "\n")
    }
    }




  if(oddsBTteam1 >= odds1)  {

        var edge = parseFloat(((1/odds1)*(oddsBTteam1-1)-((1-(1/odds1))))).toFixed(2);

        sendMessageToGroup(" --> Betano @" + oddsBTteam1 + "\n" + "True Odd @" + odds1 + "\n" + " Edge -> " + edge*100+"%" + "\n" + "team- " + team1 + "\n")
    }


  if(oddsBTteam2 >= odds2){

        var edge = parseFloat(((1/odds2)*(oddsBTteam2-1)-((1-(1/odds2))))).toFixed(2);

        sendMessageToGroup(" --> Betano @" + oddsBTteam2 + "\n" + "True Odd @" + odds2 + "\n" + " Edge -> " + edge*100+"%" + "\n" + "team- " + team2 + "\n")
    }

  if(oddsBTdraw >= draw){

         var edge = parseFloat(((1/oddsD)*(oddsBTdraw-1)-((1-(1/oddsD))))).toFixed(2);

        sendMessageToGroup(" --> Betano @" + oddsBTdraw + "\n" + "True Odd @" + oddsD + "\n" + " Edge -> " + edge*100+"%" + "\n" + "team- " + draw + "\n")
    }



    }
    catch{
        continue
    }

    console.log(team1 + " " + team2 + " " + draw)
    console.log(odds1 + " " + odds2 + " " + oddsD)
    console.log(oddsBTteam1 + " " + oddsBTteam2 + " " + oddsBTdraw)
    console.log(team1BC + " " + team2BC + " " + drawBC)



        }
    }

})();