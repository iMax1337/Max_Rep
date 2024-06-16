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


var player_to_match = [{ 'Nickeil Alexander-Walker':'N. Alexander-Walker' }]

const puppeteer = require('puppeteer');

var ps_game_list = [1591572585,1591761429,1591768468,1591768469,1591770136]

var prev_ps3838_correct_score = []
var prev_ps3838_exact_goals = []
var current_ps3838_exact_goals = []
var current_ps3838_correct_score = []


//soccer - 29 / volley -34  / baskt 4


// Function to launch the browser
async function launchBrowser() {
    return await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-b/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp1"
    });
}



const fs = require('fs');

// Define the file path where you want to write the logs
const logFilePath = 'soccer_test.txt';

async function check_changes(prev, current) {
    prev.forEach((prevItem) => {
        const currentItem = current.find((ci) => prevItem.team1 === ci?.team1 && prevItem.team2 === ci?.team2 && prevItem.result === ci?.result);

        if(typeof(currentItem) === 'undefined'){
        }else{
            if ((prevItem.odd - currentItem.odd) > 0.5) {
                let thisOne = `
                Game: ${prevItem.team1} vs ${prevItem.team2}
                Result: ${prevItem.result} | prev odd - ${prevItem.odd} | current odd - ${currentItem.odd}
                `;
                console.log(thisOne)
                fs.appendFileSync(logFilePath, thisOne);
                // SEND NOTIFICATION
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

        if(league === 'Italy - Serie A' ||  league === 'Spain - La Liga'||  league === 'Norway - Eliteserien'||  league === 'Sweden - Allsvenskan'||  league === 'Italy - Serie B'||  league === 'Ireland - Premier'){
            for (const gameData of gamesData) {
                ps_game_list.push(gameData[0])
            }
        }else{
            continue
        }   
    }
    // console.log(ps_game_list)
}

async function process_player_data(list, trigger) {

    try{
    
    var team1 = list.e[3][1]
    var team2 = list.e[3][2]
    var props_list = list.e[3][8][1][1][0].se

    props_list.forEach((game_prop) => {
        if(game_prop.n === 'Correct Score'){
            const correct_score = game_prop.l;
            correct_score.forEach((score) => {
                var result = score.n
                var odd = parseFloat(score.p)
                if(trigger === 0){
                    prev_ps3838_correct_score.push({team1, team2, result, odd})
                }else{
                    current_ps3838_correct_score.push({team1, team2, result, odd})
                }
            })
        }
    });


    props_list.forEach((game_prop) => {
        if(game_prop.n === 'Exact Total Goals'){
            const exact_goals = game_prop.l;
            exact_goals.forEach((number) => {
                var result = number.n
                var odd = parseFloat(number.p)
                if(trigger === 0){
                    prev_ps3838_exact_goals.push({team1, team2, result, odd})
                }else{
                    current_ps3838_exact_goals.push({team1, team2, result, odd})
                }
            })
        }
    });

        // console.log(prev_ps3838_exact_goals)
    }catch{
        return 'no data inside process_player_data'
    }
}



// Main function to orchestrate the scraping process
(async () => {
    const browser = await launchBrowser();
    const page = await browser.newPage();

  
    await page.waitForTimeout(2000)

    await page.goto('https://www.ps3838.com/en/sports/basketball')

    await page.waitForTimeout(2000)

    // await new Promise(resolve => setTimeout(resolve, 10000));

    //  LOGINNNNNNNNNNNNNNNNNNNNN AC88007896 hj!N4JbpWEcDdzp

    // unix = (Math.floor(Date.now() / 1000))
    // const game_list_url =  'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=&cl=100&d=&ec=&ev=&g=QQ%3D%3D&hle=false&inl=false&l=100&lang=&lg=&lv=&me=0&mk=1&more=false&o=1&ot=1&pa=0&pimo=0%2C1%2C2&pn=-1&pv=1&sp=29&tm=0&v=0&locale=en_US&_='+unix+'&withCredentials=true';
    // let ps_games = await extractJsonData(page, game_list_url);
    // get_ps_ids(ps_games);

    for (const game_id of ps_game_list) {

        await new Promise(resolve => setTimeout(resolve, 2500));

        unix = (Math.floor(Date.now() / 1000))
        const game_link = 'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=Others&cl=1&d=&ec=&ev=&g=QQ%3D%3D&hle=true&inl=false&l=2&lang=&lg=&lv=&me='+game_id+'&mk=3&more=true&o=0&ot=1&pa=0&pimo=0%2C1%2C8%2C39%2C3%2C6%2C7%2C4%2C5&pn=-1&pv=1&sp=&tm=0&v=0&locale=en_US&_='+unix+'&withCredentials=true'
        let player_data = await extractJsonData(page, game_link)
        ps_json_result = await process_player_data(player_data, 0)
        if(ps_json_result === 'no data'){
            console.log('no data for this game'+game_id)
        }
    }


while (true){

    await page.goto('https://www.ps3838.com/en/sports/basketball')

    current_ps3838_correct_score = []
    current_ps3838_exact_goals = []

    for (const game_id of ps_game_list) {

        await new Promise(resolve => setTimeout(resolve, 2500));

        unix = (Math.floor(Date.now() / 1000))
        const game_link = 'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=Others&cl=1&d=&ec=&ev=&g=QQ%3D%3D&hle=true&inl=false&l=2&lang=&lg=&lv=&me='+game_id+'&mk=3&more=true&o=0&ot=1&pa=0&pimo=0%2C1%2C8%2C39%2C3%2C6%2C7%2C4%2C5&pn=-1&pv=1&sp=&tm=0&v=0&locale=en_US&_='+unix+'&withCredentials=true'
        let player_data = await extractJsonData(page, game_link)
        ps_json_result = await process_player_data(player_data,1)
            if(ps_json_result === 'no data'){
                console.log('no data')
            }else{
            }
        }
        check_changes(prev_ps3838_correct_score, current_ps3838_correct_score)
        check_changes(prev_ps3838_exact_goals, current_ps3838_exact_goals)
    }
})();





// GET IDS https://offer.cdn.begmedia.com/api/pub/v3/competitions/13?application=1024&countrycode=pt&forceCompetitionInfo=true&language=pt&markettypeId=1115&sitecode=ptpt
// PONTOS // https://offer.cdn.begmedia.com/api/pub/v6/events/3002382168?application=1024&categorizationId=8&countrycode=pt&language=pt&sitecode=ptpt
// ESTATISTICAS // https://offer.cdn.begmedia.com/api/pub/v6/events/3002382168?application=1024&categorizationId=27&countrycode=pt&language=pt&sitecode=ptpt