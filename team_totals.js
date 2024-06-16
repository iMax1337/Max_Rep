const puppeteer = require('puppeteer');

var ps_game_list = []

var prev_data =[]
var current_data = []


// Function to launch the browser
async function launchBrowser() {
    return await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp2"
    });
}


const fs = require('fs');

// Define the file path where you want to write the logs
const logFilePath = 'team-totals.txt';

async function check_changes(x, y, z) {


    y.forEach((ps3838_player) => {
        
        const betclic_player = x.find((betclic_player) => ps3838_player?.name === betclic_player?.name)

        if(typeof(betclic_player) === 'undefined'){
            if(player_to_match.includes(ps3838_player.name)){

            }else{
                player_to_match.push(ps3838_player.name)
            }
        }else{

        if ((betclic_player.spread-ps3838_player.spread) === 1){
            if(betclic_player.under >= ps3838_player.under){
                console.log('spread diff'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            }
        }

        if ((betclic_player.spread-ps3838_player.spread) === -1){
            if(betclic_player.over >= ps3838_player.over){
                console.log('spread diff'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            }
        }

        if ((betclic_player.spread-ps3838_player.spread) > 1){
            console.log('spread diff'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
        }

        if ((betclic_player.spread-ps3838_player.spread) < -1){
            console.log('spread diff'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
        }

        if ((betclic_player.spread-ps3838_player.spread) === 0){
            var over_perc = 1/ps3838_player.true_odds_over
            var under_perc = 1/ps3838_player.true_odds_under

            var profit_over = ((over_perc*((1*betclic_player.over)-1)-(under_perc*1)))
            var profit_under = ((under_perc*((1*betclic_player.under)-1)-(over_perc*1)))
            // console.log(profit_over)
            
            if (profit_over > 0.01){
                if( z === 1){
                    const overDiffMessage = `Points over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                    fs.appendFileSync(logFilePath, overDiffMessage);
                }
                if( z === 2){
                    const overDiffMessage = `Assists over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                    fs.appendFileSync(logFilePath, overDiffMessage);
                }
                if( z === 3){
                    const overDiffMessage = `Rebounds over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                    fs.appendFileSync(logFilePath, overDiffMessage);
                }
                if( z === 4){
                    const overDiffMessage = `PAR over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                    fs.appendFileSync(logFilePath, overDiffMessage);
                }

            }

            if (profit_under > 0.01){
                if( z === 1){
                    const underDiffMessage = `Points under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                    fs.appendFileSync(logFilePath, underDiffMessage);
                }
                if( z === 2){
                    const underDiffMessage = `Assists under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                    fs.appendFileSync(logFilePath, underDiffMessage);
                }
                if( z === 3){
                    const underDiffMessage = `Rebounds under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                    fs.appendFileSync(logFilePath, underDiffMessage);
                }
                if( z === 4){
                    const underDiffMessage = `PAR under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                    fs.appendFileSync(logFilePath, underDiffMessage);
                }

            }
        
        }
    
        }
    })
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

async function get_ps_ids(jsonData) {
    const leagues = jsonData.n[0][2];

    for (const leagueData of leagues) {
        const league = leagueData[1];
        const gamesData = leagueData[2];

        for (const gameData of gamesData) {
            ps_game_list.push(gameData[0])
        }   
    }
}

async function process_player_data(list, trigger) {

    try{
    
    const team1 = e[3][1]
    const team1_total = list.e[3][8][1][0][0][0]
    const team1_over = list.e[3][8][1][0][0][2]
    const team1_under = list.e[3][8][1][0][0][3]
    
    const team2 = e[3][2]
    const team2_total = list.e[3][8][1][0][1][0]
    const team2_over = list.e[3][8][1][0][1][2]
    const team2_under = list.e[3][8][1][0][1][3]
    
    if(trigger === 0){
        console.log(team1,team1_total,team1_over,team1_under,team2,team2_total,team2_over,team2_under)
        prev_data.push({team1,team1_total,team1_over,team1_under,team2,team2_total,team2_over,team2_under})
    }else{
        current_data.push({team1,team1_total,team1_over,team1_under,team2,team2_total,team2_over,team2_under})
    }

    }catch{
        return 'no data'
    }

}

// Main function to orchestrate the scraping process
(async () => {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.waitForTimeout(2000)

    await page.goto('https://www.ps3838.com/en/sports/basketball')

    await new Promise(resolve => setTimeout(resolve, 10000));

    unix = (Math.floor(Date.now() / 1000))
    const game_list_url =  'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=&cl=100&d=&ec=&ev=&g=QQ%3D%3D&hle=false&inl=false&l=100&lang=&lg=&lv=&me=0&mk=1&more=false&o=1&ot=1&pa=0&pimo=0%2C1%2C2&pn=-1&pv=1&sp=4&tm=0&v=0&locale=en_US&_='+unix+'&withCredentials=true';
    let ps_games = await extractJsonData(page, game_list_url);
    get_ps_ids(ps_games);

    await page.waitForTimeout(2000)

    for (const game_id of ps_game_list) {

        await new Promise(resolve => setTimeout(resolve, 2500));

        unix = (Math.floor(Date.now() / 1000))
        const game_link = 'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=Others&cl=1&d=&ec=&ev=&g=QQ%3D%3D&hle=true&inl=false&l=2&lang=&lg=&lv=&me='+game_id+'&mk=3&more=true&o=0&ot=1&pa=0&pimo=0%2C1%2C2&pn=-1&pv=1&sp=&tm=0&v=0&locale=en_US&_=' + unix + '&withCredentials=true'
        let player_data = await extractJsonData(page, game_link)
        ps_json_result = await process_player_data(player_data, 0)
        if(ps_json_result === 'no data'){
            console.log('no data')
        }else{
        }
    }


    //  LOGINNNNNNNNNNNNNNNNNNNNN AC88019534 Yoscrapethis1.

    while (true){

    await page.goto('https://www.ps3838.com/en/sports/basketball')
    await page.waitForTimeout(2000)

    for (const game_id of ps_game_list) {

        await new Promise(resolve => setTimeout(resolve, 2500));

        unix = (Math.floor(Date.now() / 1000))
        const game_link = 'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=Others&cl=1&d=&ec=&ev=&g=QQ%3D%3D&hle=true&inl=false&l=2&lang=&lg=&lv=&me='+game_id+'&mk=3&more=true&o=0&ot=1&pa=0&pimo=0%2C1%2C2&pn=-1&pv=1&sp=&tm=0&v=0&locale=en_US&_=' + unix + '&withCredentials=true'
        let player_data = await extractJsonData(page, game_link)
        ps_json_result = await process_player_data(player_data, 1)
        if(ps_json_result === 'no data'){
            console.log('no data')
        }else{
        }
    }
}

})();





// GET IDS https://offer.cdn.begmedia.com/api/pub/v3/competitions/13?application=1024&countrycode=pt&forceCompetitionInfo=true&language=pt&markettypeId=1115&sitecode=ptpt
// PONTOS // https://offer.cdn.begmedia.com/api/pub/v6/events/3002382168?application=1024&categorizationId=8&countrycode=pt&language=pt&sitecode=ptpt
// ESTATISTICAS // https://offer.cdn.begmedia.com/api/pub/v6/events/3002382168?application=1024&categorizationId=27&countrycode=pt&language=pt&sitecode=ptpt