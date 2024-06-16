const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    let browser = await puppeteer.launch({
        executablePath: 'C:/Users/max_r/OneDrive/Ambiente de Trabalho/chrome-win-b/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp1"
    });

    let page = await browser.newPage();

    var url = 'https://www.betclic.pt'

    await page.goto(url);

    await page.waitForTimeout(10000)

    var scroll_start = 0;
    var scroll_end = 2400;
    var child = 100;

    async function scrollPage() {
        var scroll_start = 0;
        var scroll_end = 2400;
    
        // Make sure to use await inside an async function
        await page.evaluate((start, end) => {
            // pass the scroll_start and scroll_end values as arguments to the evaluate function
            window.scrollBy(start, end);
        }, scroll_start, scroll_end);
    
        // Update scroll_start and scroll_end values after scrolling
        scroll_start += 2400;
        scroll_end += 4800;
    
        // Repeat the scrolling process if necessary
        // You can put this in a loop based on your requirements
    }

    while (true) {
        
        
        try{
            await page.waitForSelector('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child('+(child)+')', { 
              timeout: 1 * 1000 
            });

            let results = '';

            for (let i = 1; i <= child; i++) {
                try{
                    time = await page.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child('+(i)+') > div > bet-card-footer > div > div > div > span:nth-child(2)', div => div.textContent.trim());
                    const [datePart, timePart] = time.split(' ');
                    TN1 = await page.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child('+(i)+') > div > bet-card-content > div > bet-card-list > div > bet-card-event-market > div > bet-card-event > div > div > div > scoreboards-scoreboard > scoreboards-scoreboard-periods > div > div > div > scoreboards-scoreboard-periods-scores:nth-child(1) > div > span > span > span', div => div.textContent.trim());
                    TN2 = await page.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child('+(i)+') > div > bet-card-content > div > bet-card-list > div > bet-card-event-market > div > bet-card-event > div > div > div > scoreboards-scoreboard > scoreboards-scoreboard-periods > div > div > div > scoreboards-scoreboard-periods-scores:nth-child(2) > div > span > span > span', div => div.textContent.trim());
                    market = await page.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child('+(i)+') > div > bet-card-content > div > bet-card-list > div > bet-card-event-market > div > bet-card-market > bet-card-market-classic > div > div > div.marketBets_label', div => div.textContent.trim());
                    bet_size = await page.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child('+(i)+') > div > bet-card-content > div > bet-card-summary > div > div > div.summaryBets_listItem.is-stake > div.summaryBets_listItemValue', div => div.textContent.trim());
                    odd = await page.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child('+(i)+') > div > bet-card-content > div > bet-card-list > div > bet-card-event-market > div > bet-card-market > bet-card-market-classic > div > bet-card-market-odds > div > div', div => div.textContent.trim());
                    const [money, sign] = bet_size.split(',');
                    try{
                        player = await page.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child('+(i)+') > div > bet-card-content > div > bet-card-list > div > bet-card-event-market > div > bet-card-market > bet-card-market-classic > div > div > div.marketBets_value.is-lost.is-loser.ng-star-inserted', div => div.textContent.trim());
                        result = "Loser"
                    }catch{
                        try{
                        player = await page.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child('+(i)+') > div > bet-card-content > div > bet-card-list > div > bet-card-event-market > div > bet-card-market > bet-card-market-classic > div > div > div.marketBets_value.is-won.is-success.ng-star-inserted', div => div.textContent.trim());
                        result = "Winner"
                        }catch{
                        player = await page.$eval('body > app-desktop > div.layout > div > bcdk-content-scroller > div > my-bets-page > div > my-bets-sports-list > bet-card:nth-child(87) > div > bet-card-content > div > bet-card-list > div > bet-card-event-market > div > bet-card-market > bet-card-market-classic > div > div > div.marketBets_value.is-canceled.ng-star-inserted', div => div.textContent.trim());
                        result = "Cancelado"
                    }
                    }
                    
                    switch (market) {
                    case 'Total de Assistências do Jogador:':
                        const [player1, market1] = player.split(' - ');
                        player = ' '+player1+' (Assists)'
                        market = market1;
                        break;
                    case 'Desempenho do Jogador (pontos + ressaltos + assistências):':
                        const [player2, market2] = player.split(' - ');
                        player = ' '+player2+' (Pts+Rebs+Asts)'
                        market = market2;
                        break;
                    case 'Total de Ressaltos do Jogador:':
                        const [player3, market3] = player.split(' - ');
                        player = ' '+player3+' (Rebounds)'
                        market = market3;
                        break;
                    case 'Pontos individuais:':
                        const [player4, market4] = player.split(' - ');
                        player = ' '+player4+' (Points)'
                        market = market4;
                        break;
                    default:
                        // console.log(TN1 + ' vs ' + TN2+'_'+player+'_'+market+'_'+odd+'_'+result+'_'+money+'_'+datePart+'_'+timePart)
                        // results += TN1 + ' vs ' + TN2+'_'+player+'_'+market+'_'+odd+'_'+result+'_'+money+'_'+datePart+'_'+timePart+'\n';
                        continue;
                }                
                    // console.log(TN1 + ' vs ' + TN2+'_'+player+'_'+market+'_'+odd+'_'+result+'_'+money+'_'+datePart+'_'+timePart)
                    results += TN1 + ' vs ' + TN2+'_'+player+'_'+market+'_'+odd+'_'+result+'_'+money+'_'+datePart+'_'+timePart+'\n';
                }catch{
                    continue
                }
                }
                fs.writeFileSync('results.txt', results);
                console.log("finish")
                return 0;

          }catch{
            scrollPage();
          }
    }

})();