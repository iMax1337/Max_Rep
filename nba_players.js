const TelegramBot = require('node-telegram-bot-api');

const fs = require('fs');

// Define the file path where you want to write the logs
const logFilePath = 'profit_logs.txt';

const player_names = 'players-to-find.txt';

// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const bot = new TelegramBot('6886783107:AAFbQ36s67hQHlf2yW7E3rGpD90KXL8U_zw', { polling: true });

// Replace 'CHAT_ID' with the ID of the group chat you want to send messages to
const chatId = '-1002187958653';

// Function to send a message to the group
function sendMessageToGroup(message) {
  bot.sendMessage(chatId, message);
}

// Handle any errors
bot.on('polling_error', (error) => {
  console.error(error);
});


var player_to_match = [{'Nickeil Alexander-Walker':'N. Alexander-Walker'}]

const puppeteer = require('puppeteer');

var ps_game_list = []
var betano_game_list = []

var ps3838_list_Points = []
var ps3838_list_Assists = []
var ps3838_list_Rebounds = []
var ps3838_list_PAR = []

var betclic_Points = []
var betclic_Assists = []
var betclic_Rebounds = []
var betclic_PAR = []

var betano_Points = []
var betano_Assists = []
var betano_Rebounds = []
var betano_PAR = []

var not_sent_points_diff = []
var not_sent_reb_diff = []
var not_sent_ass_diff = []
var not_sent_par_diff = []

var not_sent_diff = []


var betclic_list = []



// Function to launch the browser
async function launchBrowser() {
    return await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-b/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp1"
    });
}


async function check_changes(x, y, z, casa) {


    y.forEach((ps3838_player) => {
        
        const betclic_player = x.find((betclic_player) => ps3838_player?.name === betclic_player?.name)

        if(typeof(betclic_player) === 'undefined'){
            // console.log('there are players names that fail or not present')
        }else{

        if ((betclic_player.spread-ps3838_player.spread) === 1){
            if( z === 1 && !(not_sent_points_diff.includes(betclic_player.name+'points'))){
                if(casa === 'betclic'){
                    if(betclic_player.under >= ps3838_player.under){
                        console.log('betclic points spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                        not_sent_points_diff.push(betclic_player.name+'points')
                    }
                }else{
                    if(betclic_player.under >= ps3838_player.under){
                        console.log('betano points spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                        not_sent_points_diff.push(betclic_player.name+'points')
                    }
            }       
            }
            if( z === 2 && !(not_sent_ass_diff.includes(betclic_player.name+'assists'))){
                if(casa === 'betclic'){
                    if(betclic_player.under >= ps3838_player.under){
                        console.log('betclic assists spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                        not_sent_ass_diff.push(betclic_player.name+'assists')
                    }
                }else{
                    if(betclic_player.under >= ps3838_player.under){
                        console.log('betano assists spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                        not_sent_ass_diff.push(betclic_player.name+'assists')
                    }
            }       
            }
            if( z === 3 && !(not_sent_reb_diff.includes(betclic_player.name+'rebounds'))){
                if(casa === 'betclic'){
                    if(betclic_player.under >= ps3838_player.under){
                        console.log('betclic rebounds spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                        not_sent_reb_diff.push(betclic_player.name+'rebounds')
                    }
                }else{
                    if(betclic_player.under >= ps3838_player.under){
                        console.log('betano rebounds spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                        not_sent_reb_diff.push(betclic_player.name+'rebounds')
                    }
            }       
            }
            if( z === 4 && !(not_sent_par_diff.includes(betclic_player.name+'par'))){
                if(casa === 'betclic'){
                    if(betclic_player.under >= ps3838_player.under){
                        console.log('betclic par spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                        not_sent_par_diff.push(betclic_player.name+'par')
                    }
                }else{
                    if(betclic_player.under >= ps3838_player.under){
                        console.log('betano par spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                        not_sent_par_diff.push(betclic_player.name+'par')
                    }
                }       
            }
        }
        if ((betclic_player.spread-ps3838_player.spread) === -1){
            if(z === 1 && !(not_sent_points_diff.includes(betclic_player.name+'points'))){
                if(casa === 'betclic'){
                    if(betclic_player.over >= ps3838_player.over){
                        console.log('betclic points spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                        not_sent_points_diff.push(betclic_player.name+'points')
                    }
                }else{
                    if(betclic_player.over >= ps3838_player.over){
                        console.log('betano points spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                        not_sent_points_diff.push(betclic_player.name+'points')
                    }
            }
            }
            if(z === 2 && !(not_sent_ass_diff.includes(betclic_player.name+'assists'))){
            if(casa === 'betclic'){
                if(betclic_player.over >= ps3838_player.over){
                    console.log('betclic assists spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_ass_diff.push(betclic_player.name+'assists')
                }
            }else{
                if(betclic_player.over >= ps3838_player.over){
                    console.log('betano assists spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_ass_diff.push(betclic_player.name+'assists')
                }
        }
            }
            if(z === 3 && !(not_sent_reb_diff.includes(betclic_player.name+'rebounds'))){
            if(casa === 'betclic'){
                if(betclic_player.over >= ps3838_player.over){
                    console.log('betclic rebounds spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_reb_diff.push(betclic_player.name+'rebounds')
                }
            }else{
                if(betclic_player.over >= ps3838_player.over){
                    console.log('betano rebounds spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_reb_diff.push(betclic_player.name+'rebounds')
                }
            }
            }
            if(z === 4 && !(not_sent_par_diff.includes(betclic_player.name+'par'))){
            if(casa === 'betclic'){
                if(betclic_player.over >= ps3838_player.over){
                    console.log('betclic PAR spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_par_diff.push(betclic_player.name+'par')
                }
            }else{
                if(betclic_player.over >= ps3838_player.over){
                    console.log('betano PAR spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_par_diff.push(betclic_player.name+'par')
                }
            }
            }
        }
        if ((betclic_player.spread-ps3838_player.spread) > 1){
            if( z === 1 && !(not_sent_points_diff.includes(betclic_player.name+'points'))){
                if(casa === 'betclic'){
                    console.log('betclic points spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                    not_sent_points_diff.push(betclic_player.name+'points')
                }else{
                    console.log('betano points spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                    not_sent_points_diff.push(betclic_player.name+'points')
                }
        
            }
            if( z === 2 && !(not_sent_ass_diff.includes(betclic_player.name+'assists'))){
                if(casa === 'betclic'){
                    console.log('betclic assists spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                    not_sent_ass_diff.push(betclic_player.name+'assists')
                }else{
                    console.log('betano assists spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                    not_sent_ass_diff.push(betclic_player.name+'assists')
                }
            }
            if( z === 3 && !(not_sent_reb_diff.includes(betclic_player.name+'rebounds'))){
            if(casa === 'betclic'){
                console.log('betclic rebounds spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                not_sent_reb_diff.push(betclic_player.name+'rebounds')
            }else{
                console.log('betano rebounds spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                not_sent_reb_diff.push(betclic_player.name+'rebounds')
            }
            }
            if( z === 4 && !(not_sent_par_diff.includes(betclic_player.name+'par'))){
            if(casa === 'betclic'){
                console.log('betclic par spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                not_sent_par_diff.push(betclic_player.name+'par')
            }else{
                console.log('betano par spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
                not_sent_par_diff.push(betclic_player.name+'par')
            }
        
            }
        }
        if ((betclic_player.spread-ps3838_player.spread) < -1){
            if( z === 1 && !(not_sent_points_diff.includes(betclic_player.name+'points'))){
                if(casa === 'betclic'){
                    console.log('betclic points spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_points_diff.push(betclic_player.name+'points')
                }else{
                    console.log('betano points spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_points_diff.push(betclic_player.name+'points')
                }
            }
            if( z === 2 && !(not_sent_ass_diff.includes(betclic_player.name+'assists'))){
                if(casa === 'betclic'){
                    console.log('betclic assists spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_ass_diff.push(betclic_player.name+'assists')
                }else{
                    console.log('betano assists spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_ass_diff.push(betclic_player.name+'assists')
                }
            }
            if( z === 3 && !(not_sent_reb_diff.includes(betclic_player.name+'rebounds'))){
                if(casa === 'betclic'){
                    console.log('betclic rebounds spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_reb_diff.push(betclic_player.name+'rebounds')
                }else{
                    console.log('betano rebounds spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_reb_diff.push(betclic_player.name+'rebounds')
                }
            }
            if( z === 4 && !(not_sent_par_diff.includes(betclic_player.name+'par'))){
                if(casa === 'betclic'){
                    console.log('betclic par spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_par_diff.push(betclic_player.name+'par')
                }else{
                    console.log('betano par spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
                    not_sent_par_diff.push(betclic_player.name+'par')
                }
            }
        }

        if ((betclic_player.spread-ps3838_player.spread) === 0){
            var over_perc = 1/ps3838_player.true_odds_over
            var under_perc = 1/ps3838_player.true_odds_under

            var profit_over = ((over_perc*((1*betclic_player.over)-1)-(under_perc*1)))
            var profit_under = ((under_perc*((1*betclic_player.under)-1)-(over_perc*1)))
            // console.log(profit_over)
            
            if (profit_over > 0.01){
                if( z === 1 && !(not_sent_diff.includes(betclic_player.name+'points'))){
                        if(casa === 'betclic'){
                            const overDiffMessage = `BETCLIC - Points over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                            fs.appendFileSync(logFilePath, overDiffMessage);
                            not_sent_diff.push(betclic_player.name+'points')
                        }else{
                            const overDiffMessage = `BETANO Points over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                            fs.appendFileSync(logFilePath, overDiffMessage);
                            not_sent_diff.push(betclic_player.name+'points')
                        }
                    
                }
                if( z === 2 && !(not_sent_diff.includes(betclic_player.name+'assists'))){
                        if(casa === 'betclic'){
                            const overDiffMessage = `BETCLIC - Assists over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                            fs.appendFileSync(logFilePath, overDiffMessage); 
                            not_sent_diff.push(betclic_player.name+'assists') 
                        }else{
                            const overDiffMessage = `BETANO Assists over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                            fs.appendFileSync(logFilePath, overDiffMessage);
                            not_sent_diff.push(betclic_player.name+'assists')
                        }
                    
                }
                if( z === 3 && !(not_sent_diff.includes(betclic_player.name+'rebounds'))){
                        if(casa === 'betclic'){
                            const overDiffMessage = `BETCLIC - Rebounds over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                            fs.appendFileSync(logFilePath, overDiffMessage);
                            not_sent_diff.push(betclic_player.name+'rebounds')
                        }else{
                            const overDiffMessage = `BETANO Rebounds over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                            fs.appendFileSync(logFilePath, overDiffMessage);
                            not_sent_diff.push(betclic_player.name+'rebounds')
                        }
                }
                if( z === 4 && !(not_sent_diff.includes(betclic_player.name+'par'))){
                        if(casa === 'betclic'){
                            const overDiffMessage = `BETCLIC - PAR over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                            fs.appendFileSync(logFilePath, overDiffMessage);
                            not_sent_diff.push(betclic_player.name+'par')
                        }else{
                            const overDiffMessage = `BETANO - PAR over diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.over} ${ps3838_player.true_odds_over} ${profit_over*100}\n`;
                            fs.appendFileSync(logFilePath, overDiffMessage);
                            not_sent_diff.push(betclic_player.name+'par')
                        }
                }
            }

            if (profit_under > 0.01){
                if(z === 1 && !(not_sent_diff.includes(betclic_player.name+'points'))){
                    if(casa === 'betclic'){
                        const underDiffMessage = `betclic - Points under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                        fs.appendFileSync(logFilePath, underDiffMessage);
                        not_sent_diff.push(betclic_player.name+'points')
                    }else{
                        const underDiffMessage = `betano - Points under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                        fs.appendFileSync(logFilePath, underDiffMessage);
                        not_sent_diff.push(betclic_player.name+'points')
                    }
                }
                if(z === 2 && !(not_sent_diff.includes(betclic_player.name+'assists'))){
                    if(casa === 'betclic'){
                        const underDiffMessage = `betclic - assists under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                        fs.appendFileSync(logFilePath, underDiffMessage);
                        not_sent_diff.push(betclic_player.name+'assists')
                    }else{
                        const underDiffMessage = `betano - assists under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                        fs.appendFileSync(logFilePath, underDiffMessage);
                        not_sent_diff.push(betclic_player.name+'assists')
                    }
                }
                if(z === 3 && !(not_sent_diff.includes(betclic_player.name+'rebounds'))){
                if(casa === 'betclic'){
                    const underDiffMessage = `betclic - rebounds under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                    fs.appendFileSync(logFilePath, underDiffMessage);
                    not_sent_diff.push(betclic_player.name+'rebounds')
                }else{
                    const underDiffMessage = `betano - rebounds under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                    fs.appendFileSync(logFilePath, underDiffMessage);
                    not_sent_diff.push(betclic_player.name+'rebounds')
                }
                }
                if(z === 4 && !(not_sent_diff.includes(betclic_player.name+'par'))){
                if(casa === 'betclic'){
                    const underDiffMessage = `betclic - par under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                    fs.appendFileSync(logFilePath, underDiffMessage);
                    not_sent_diff.push(betclic_player.name+'par')
                }else{
                    const underDiffMessage = `betano - par under diff ${betclic_player.name} ${betclic_player.spread} ${betclic_player.under} ${ps3838_player.true_odds_under} ${profit_under*100}\n`;
                    fs.appendFileSync(logFilePath, underDiffMessage);
                    not_sent_diff.push(betclic_player.name+'par')
                }
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

        if(league === 'NBA'){
            for (const gameData of gamesData) {
                ps_game_list.push(gameData[0])
            }   
        }else{
            continue
        }
}
}

async function process_player_data(list) {

    try{

    const props_list = list.e[3][8][3][1][3].se;

    props_list.forEach((player_prop) => {
        const player = player_prop.n;

        if (processRebounds(player, player_prop)) return;
        if (processPtsRebsAsts(player, player_prop)) return;
        if (processPoints(player, player_prop)) return;
        if (processAssists(player, player_prop)) return;
    });

    }catch{
        return 'no data'
    }

    function processRebounds(player, player_prop) {
            if (player.includes('Rebounds')) {
                const name = player.split(" (")[0];
                const spread = parseFloat(player_prop.l[0].h)
                const over = parseFloat(player_prop.l[0].p)
                const under = parseFloat(player_prop.l[1].p)
                const house = parseFloat((((1/over)+(1/under))-1)/2)
                const true_odds_over = parseFloat((1/((1/over) - house)).toFixed(2))
                const true_odds_under = parseFloat((1/((1/under) - house)).toFixed(2))
                // console.log(name, spread, over, under);
                ps3838_list_Rebounds.push({ name, spread, over, under, true_odds_over, true_odds_under });
                return true; // Indicate that processing is complete for this player
            }
            return false;
    }

    function processPtsRebsAsts(player, player_prop) {
            if (player.includes('Pts+Rebs+Asts')) {
                const name = player.split(" (")[0];
                const spread = parseFloat(player_prop.l[0].h)
                const over = parseFloat(player_prop.l[0].p)
                const under = parseFloat(player_prop.l[1].p)
                const house = parseFloat((((1/over)+(1/under))-1)/2)
                const true_odds_over = parseFloat((1/((1/over) - house)).toFixed(2))
                const true_odds_under = parseFloat((1/((1/under) - house)).toFixed(2))


                // console.log(name, spread, over, under);
                ps3838_list_PAR.push({ name, spread, over, under, true_odds_over, true_odds_under });
                return true; // Indicate that processing is complete for this player
            }
            return false;
    }

    function processPoints(player, player_prop) {
            if (player.includes('Points')) {
                const name = player.split(" (")[0];
                const spread = parseFloat(player_prop.l[0].h)
                const over = parseFloat(player_prop.l[0].p)
                const under = parseFloat(player_prop.l[1].p)
                const house = parseFloat((((1/over)+(1/under))-1)/2)
                const true_odds_over = parseFloat((1/((1/over) - house)).toFixed(2))
                const true_odds_under = parseFloat((1/((1/under) - house)).toFixed(2))
    
                // console.log(name, spread, over, under);
                ps3838_list_Points.push({ name, spread, over, under, true_odds_over, true_odds_under });
                return true; // Indicate that processing is complete for this player
            }
            return false;
    }

    function processAssists(player, player_prop) {
            if (player.includes('Assists')) {
                const name = player.split(" (")[0];
                const spread = parseFloat(player_prop.l[0].h)
                const over = parseFloat(player_prop.l[0].p)
                const under = parseFloat(player_prop.l[1].p)
                const house = parseFloat((((1/over)+(1/under))-1)/2)
                const true_odds_over = parseFloat((1/((1/over) - house)).toFixed(2))
                const true_odds_under = parseFloat((1/((1/under) - house)).toFixed(2))


                // console.log(name, spread, over, under);
                ps3838_list_Assists.push({ name, spread, over, under, true_odds_over, true_odds_under });
                return true; // Indicate that processing is complete for this player
            }
            return false;
    }

}

async function getGame_betclic(api_request) {
    try {
        const response = await fetch(api_request);
        const data = await response.json();
        for (const game of data.matches) {
            if(game.is_live === false){
                console.log(game.id)
                betclic_list.push(game.id)
            }
        }
        process_betclic()
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function process_betclic() {
    for (const game of betclic_list) {
        try{
        var response = await fetch('https://offer.cdn.begmedia.com/api/pub/v6/events/'+game+'?application=1024&categorizationId=8&countrycode=pt&language=pt&sitecode=ptpt');
        var data = await response.json();
        process_betclic_points(data)
        response = await fetch('https://offer.cdn.begmedia.com/api/pub/v6/events/'+game+'?application=1024&categorizationId=27&countrycode=pt&language=pt&sitecode=ptpt');
        data = await response.json();
        process_betclic_PAR(data)
        }catch(error){
            console.error('Error fetching data:', error);
        }
        }
        
}

async function process_betclic_points(data) {
    for (const lista of data.grouped_markets) {

        if (lista.name === 'Pontos individuais'){
            for (const player of lista.markets[0].selections){
                const string = player[0].name
                const name = string.split(" - ")[0];
                const parts = string.split(" ");
                const spread = parseFloat(parts[parts.length - 1])
                const over = parseFloat(player[0].odds)
                const under = parseFloat(player[1].odds)
                betclic_Points.push({name, spread, over, under})
            }
        }        
    }
    return
}

async function process_betclic_PAR(data) {
    for (const lista of data.grouped_markets) {

        if (lista.name === 'Desempenho do Jogador (pontos + ressaltos + assistências'){
            for (const player of lista.markets[0].selections){
                const string = player[0].name
                const name = string.split(" - ")[0];
                const parts = string.split(" ");
                const spread = parseFloat(parts[parts.length - 1])
                const over = parseFloat(player[0].odds)
                const under = parseFloat(player[1].odds)
                
                betclic_PAR.push({name, spread, over, under})
            }
        }
        if (lista.name === 'Total de Assistências do Jogador'){
            for (const player of lista.markets[0].selections){
                const string = player[0].name
                const name = string.split(" - ")[0];
                const parts = string.split(" ");
                const spread = parseFloat(parts[parts.length - 1])
                const over = parseFloat(player[0].odds)
                const under = parseFloat(player[1].odds)
                
                betclic_Assists.push({name, spread, over, under})
            }
        }  
        if (lista.name === 'Total de Ressaltos do Jogador'){
            for (const player of lista.markets[0].selections){
                const string = player[0].name
                const name = string.split(" - ")[0];
                const parts = string.split(" ");
                const spread = parseFloat(parts[parts.length - 1])
                const over = parseFloat(player[0].odds)
                const under = parseFloat(player[1].odds)
                
                betclic_Rebounds.push({name, spread, over, under})
            }
        }  
    }
}

async function get_betano_ids(jsonData){
    const event_list = jsonData.data.blocks[0].events

    for(const game of event_list){
        if (game.willGoLive === true){
            betano_game_list.push(game.id)
        }
    }
}

async function process_betano_data (game_data) {
    try{
    const selections_list = game_data.data.event.markets
    
    for(const selection of selections_list){
        if(selection.tableLayout.title === 'Pontos Mais/Menos'){
            const points_list = selection.tableLayout.rows
            for(const prop of points_list){
                const name = prop.title
                const spread = parseFloat(prop.groupSelections[0].handicap)
                const over = parseFloat(prop.groupSelections[0].selections[0].price)
                const under = parseFloat(prop.groupSelections[0].selections[1].price)
                betano_Points.push({name, spread, over, under})
            }
        }
    }

    for(const selection of selections_list){
        if(selection.tableLayout.title === 'Ressaltos Mais/Menos'){
            const points_list = selection.tableLayout.rows
            for(const prop of points_list){
                const name = prop.title
                const spread = parseFloat(prop.groupSelections[0].handicap)
                const over = parseFloat(prop.groupSelections[0].selections[0].price)
                const under = parseFloat(prop.groupSelections[0].selections[1].price)
                betano_Rebounds.push({name, spread, over, under})
            }
        }
    }

    for(const selection of selections_list){
        if(selection.tableLayout.title === 'Assistências Mais/Menos'){
            const points_list = selection.tableLayout.rows
            for(const prop of points_list){
                const name = prop.title
                const spread = parseFloat(prop.groupSelections[0].handicap)
                const over = parseFloat(prop.groupSelections[0].selections[0].price)
                const under = parseFloat(prop.groupSelections[0].selections[1].price)
                betano_Assists.push({name, spread, over, under})
            }
        }
    }

    for(const selection of selections_list){
        if(selection.tableLayout.title === 'Pontos + Ressaltos + Assistências Mais/Menos'){
            const points_list = selection.tableLayout.rows
            for(const prop of points_list){
                const name = prop.title
                const spread = parseFloat(prop.groupSelections[0].handicap)
                const over = parseFloat(prop.groupSelections[0].selections[0].price)
                const under = parseFloat(prop.groupSelections[0].selections[1].price)
                betano_PAR.push({name, spread, over, under})
            }
        }
    }
}catch{
    console.log('error on betano data')
}
}
   
(async () => {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    getGame_betclic('https://offer.cdn.begmedia.com/api/pub/v3/competitions/13?application=1024&countrycode=pt&forceCompetitionInfo=true&language=pt&markettypeId=1115&sitecode=ptpt')

    await page.waitForTimeout(2000)

    await page.goto('https://www.ps3838.com/en/sports/basketball')

    await new Promise(resolve => setTimeout(resolve, 10000));

    //  LOGINNNNNNNNNNNNNNNNNNNNN AC88007896 hj!N4JbpWEcDdzp
    var counter = 0;

    while (true){

    unix = (Math.floor(Date.now() / 1000))
    const game_list_url =  'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=&cl=100&d=&ec=&ev=&g=QQ%3D%3D&hle=false&inl=false&l=100&lang=&lg=&lv=&me=0&mk=1&more=false&o=1&ot=1&pa=0&pimo=0%2C1%2C2&pn=-1&pv=1&sp=4&tm=0&v=0&locale=en_US&_='+unix+'&withCredentials=true';
    const get_betano_id = 'https://www.betano.pt/api/sport/basquetebol/eua/nba/441g/?req=la,s,stnf,c,mb'
    let ps_games = await extractJsonData(page, game_list_url);
    let betano_games = await extractJsonData(page, get_betano_id);
    get_ps_ids(ps_games);
    get_betano_ids(betano_games)


    for (const betano_id of betano_game_list){
        var betano_url = 'https://www.betano.pt/api/odds/dallas-mavericks-minnesota-timberwolves/'+betano_id+'/?bt=1&req=la,s,stnf,c'
        let game_data = await extractJsonData(page, betano_url);
        process_betano_data(game_data)
    }


    if(counter === 100){
        betclic_list = []
        betclic_Points = []
        betclic_Assists = []
        betclic_Rebounds = []
        betclic_PAR = []
        counter = 0
        getGame_betclic('https://offer.cdn.begmedia.com/api/pub/v3/competitions/13?application=1024&countrycode=pt&forceCompetitionInfo=true&language=pt&markettypeId=1115&sitecode=ptpt')
    }

    await page.goto('https://www.ps3838.com/en/sports/basketball')

    for (const game_id of ps_game_list) {

        ps3838_list_Points = []
        ps3838_list_Assists = []
        ps3838_list_Rebounds = []
        ps3838_list_PAR = []

        await new Promise(resolve => setTimeout(resolve, 2500));

        unix = (Math.floor(Date.now() / 1000))
        const game_link = 'https://www.ps3838.com/sports-service/sv/compact/events?btg=1&c=Others&cl=1&d=&ec=&ev=&g=QQ%3D%3D&hle=true&inl=false&l=2&lang=&lg=&lv=&me='+game_id+'&mk=3&more=true&o=0&ot=1&pa=0&pimo=0%2C1%2C2&pn=-1&pv=1&sp=&tm=0&v=0&locale=en_US&_=' + unix + '&withCredentials=true'
        let player_data = await extractJsonData(page, game_link)
        ps_json_result = await process_player_data(player_data)
        if(ps_json_result === 'no data'){
            console.log('no data')
        }else{
            check_changes(betclic_Points,ps3838_list_Points,1, 'betclic')
            check_changes(betclic_Assists,ps3838_list_Assists,2, 'betclic')
            check_changes(betclic_Rebounds,ps3838_list_Rebounds,3, 'betclic')
            check_changes(betclic_PAR,ps3838_list_PAR,4, 'betclic')
            check_changes(betano_Points,ps3838_list_Points,1, 'betano')
            check_changes(betano_Assists,ps3838_list_Assists,2, 'betano')
            check_changes(betano_Rebounds,ps3838_list_Rebounds,3, 'betano')
            check_changes(betano_PAR,ps3838_list_PAR,4, 'betano')
        }
    }
    ps_game_list = []
    betano_game_list = []
    betano_Points = []
    betano_Assists = []
    betano_Rebounds = []
    betano_PAR = []
    counter = counter + 1
}

})();





// GET IDS https://offer.cdn.begmedia.com/api/pub/v3/competitions/13?application=1024&countrycode=pt&forceCompetitionInfo=true&language=pt&markettypeId=1115&sitecode=ptpt
// PONTOS // https://offer.cdn.begmedia.com/api/pub/v6/events/3002382168?application=1024&categorizationId=8&countrycode=pt&language=pt&sitecode=ptpt
// ESTATISTICAS // https://offer.cdn.begmedia.com/api/pub/v6/events/3002382168?application=1024&categorizationId=27&countrycode=pt&language=pt&sitecode=ptpt