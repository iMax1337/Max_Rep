
const TelegramBot = require('node-telegram-bot-api');

const fs = require('fs');

// Define the file path where you want to write the logs
const logFilePath = 'wnba_profit_logs.txt';

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



const puppeteer = require('puppeteer');

var ps_game_list = []
var betano_game_list = []

var list_Points = []
var list_Assists = []
var list_Rebounds = []

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

async function process_points_data(data){
        var games_list
        const selection = data.eventGroup.offerCategories
        for ( const market in selection){
            if(selection[market].name === 'Player Points'){
                games_list = data.eventGroup.offerCategories[market].offerSubcategoryDescriptors[0].offerSubcategory.offers
            }
        }
        for(const game in games_list){
            const player_list = games_list[game]
            for(const player in player_list){
                try{
                const inputString = player_list[player].label
                const name = inputString.replace(' Points', '');
                const spread = parseFloat(player_list[player].outcomes[0].line)
                const over = parseFloat(player_list[player].outcomes[0].oddsDecimalDisplay)
                const under = parseFloat(player_list[player].outcomes[1].oddsDecimalDisplay)
                const house = parseFloat((((1/over)+(1/under))-1)/2)
                const true_odds_over = parseFloat((1/((1/over) - house)).toFixed(2))
                const true_odds_under = parseFloat((1/((1/under) - house)).toFixed(2))
                list_Points.push({name, spread, over, under, true_odds_over, true_odds_under})
            }catch{
                console.log('failed to get the data here')
            }
            }
        }
}
async function process_assists_data(data){
        var games_list
        const selection = data.eventGroup.offerCategories
        for ( const market in selection){
            if(selection[market].name === 'Player Assists'){
                games_list = data.eventGroup.offerCategories[market].offerSubcategoryDescriptors[0].offerSubcategory.offers
            }
        }
        for(const game in games_list){
            const player_list = games_list[game]
            for(const player in player_list){
                try{
                const inputString = player_list[player].label
                const name = inputString.replace(' Assists', '');
                const spread = parseFloat(player_list[player].outcomes[0].line)
                const over = parseFloat(player_list[player].outcomes[0].oddsDecimalDisplay)
                const under = parseFloat(player_list[player].outcomes[1].oddsDecimalDisplay)
                const house = parseFloat((((1/over)+(1/under))-1)/2)
                const true_odds_over = parseFloat((1/((1/over) - house)).toFixed(2))
                const true_odds_under = parseFloat((1/((1/under) - house)).toFixed(2))
                list_Assists.push({name, spread, over, under, true_odds_over, true_odds_under})
            }catch{
                console.log('failed to get the data here')
            }
            }
        }
}
async function process_rebounds_data(data){
        var games_list
        const selection = data.eventGroup.offerCategories
        for ( const market in selection){
            if(selection[market].name === 'Player Rebounds'){
                games_list = data.eventGroup.offerCategories[market].offerSubcategoryDescriptors[0].offerSubcategory.offers
            }
        }
        for(const game in games_list){
            const player_list = games_list[game]
            for(const player in player_list){
                try{
                    const inputString = player_list[player].label
                    const name = inputString.replace(' Rebounds', '');
                    const spread = parseFloat(player_list[player].outcomes[0].line)
                    const over = parseFloat(player_list[player].outcomes[0].oddsDecimalDisplay)
                    const under = parseFloat(player_list[player].outcomes[1].oddsDecimalDisplay)
                    const house = parseFloat((((1/over)+(1/under))-1)/2)
                    const true_odds_over = parseFloat((1/((1/over) - house)).toFixed(2))
                    const true_odds_under = parseFloat((1/((1/under) - house)).toFixed(2))
                    list_Rebounds.push({name, spread, over, under, true_odds_over, true_odds_under})
                }catch{
                    console.log('failed to get the data here')
            }
        }
    }
}

async function check_changes(x, y, z, casa) {


    y.forEach((ps3838_player) => {
        
        const betclic_player = x.find((betclic_player) => ps3838_player?.name === betclic_player?.name)

        if(typeof(betclic_player) === 'undefined'){
            // console.log('there are players names that fail or not present')
        }else{
            // if ((betclic_player.spread-ps3838_player.spread) === 1){
            //     if( z === 1 && !(not_sent_points_diff.includes(betclic_player.name+'points'))){
            //         if(casa === 'betclic'){
            //             if(betclic_player.under >= ps3838_player.under){
            //                 console.log('betclic points spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //                 not_sent_points_diff.push(betclic_player.name+'points')
            //             }
            //         }else{
            //             if(betclic_player.under >= ps3838_player.under){
            //                 console.log('betano points spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //                 not_sent_points_diff.push(betclic_player.name+'points')
            //             }
            //     }       
            //     }
            //     if( z === 2 && !(not_sent_ass_diff.includes(betclic_player.name+'assists'))){
            //         if(casa === 'betclic'){
            //             if(betclic_player.under >= ps3838_player.under){
            //                 console.log('betclic assists spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //                 not_sent_ass_diff.push(betclic_player.name+'assists')
            //             }
            //         }else{
            //             if(betclic_player.under >= ps3838_player.under){
            //                 console.log('betano assists spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //                 not_sent_ass_diff.push(betclic_player.name+'assists')
            //             }
            //     }       
            //     }
            //     if( z === 3 && !(not_sent_reb_diff.includes(betclic_player.name+'rebounds'))){
            //         if(casa === 'betclic'){
            //             if(betclic_player.under >= ps3838_player.under){
            //                 console.log('betclic rebounds spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //                 not_sent_reb_diff.push(betclic_player.name+'rebounds')
            //             }
            //         }else{
            //             if(betclic_player.under >= ps3838_player.under){
            //                 console.log('betano rebounds spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //                 not_sent_reb_diff.push(betclic_player.name+'rebounds')
            //             }
            //     }       
            //     }
            //     if( z === 4 && !(not_sent_par_diff.includes(betclic_player.name+'par'))){
            //         if(casa === 'betclic'){
            //             if(betclic_player.under >= ps3838_player.under){
            //                 console.log('betclic par spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //                 not_sent_par_diff.push(betclic_player.name+'par')
            //             }
            //         }else{
            //             if(betclic_player.under >= ps3838_player.under){
            //                 console.log('betano par spread diff(1) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //                 not_sent_par_diff.push(betclic_player.name+'par')
            //             }
            //         }       
            //     }
            // }
            // if ((betclic_player.spread-ps3838_player.spread) === -1){
            //     if(z === 1 && !(not_sent_points_diff.includes(betclic_player.name+'points'))){
            //         if(casa === 'betclic'){
            //             if(betclic_player.over >= ps3838_player.over){
            //                 console.log('betclic points spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //                 not_sent_points_diff.push(betclic_player.name+'points')
            //             }
            //         }else{
            //             if(betclic_player.over >= ps3838_player.over){
            //                 console.log('betano points spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //                 not_sent_points_diff.push(betclic_player.name+'points')
            //             }
            //     }
            //     }
            //     if(z === 2 && !(not_sent_ass_diff.includes(betclic_player.name+'assists'))){
            //     if(casa === 'betclic'){
            //         if(betclic_player.over >= ps3838_player.over){
            //             console.log('betclic assists spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_ass_diff.push(betclic_player.name+'assists')
            //         }
            //     }else{
            //         if(betclic_player.over >= ps3838_player.over){
            //             console.log('betano assists spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_ass_diff.push(betclic_player.name+'assists')
            //         }
            // }
            //     }
            //     if(z === 3 && !(not_sent_reb_diff.includes(betclic_player.name+'rebounds'))){
            //     if(casa === 'betclic'){
            //         if(betclic_player.over >= ps3838_player.over){
            //             console.log('betclic rebounds spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_reb_diff.push(betclic_player.name+'rebounds')
            //         }
            //     }else{
            //         if(betclic_player.over >= ps3838_player.over){
            //             console.log('betano rebounds spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_reb_diff.push(betclic_player.name+'rebounds')
            //         }
            //     }
            //     }
            //     if(z === 4 && !(not_sent_par_diff.includes(betclic_player.name+'par'))){
            //     if(casa === 'betclic'){
            //         if(betclic_player.over >= ps3838_player.over){
            //             console.log('betclic PAR spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_par_diff.push(betclic_player.name+'par')
            //         }
            //     }else{
            //         if(betclic_player.over >= ps3838_player.over){
            //             console.log('betano PAR spread diff(1) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_par_diff.push(betclic_player.name+'par')
            //         }
            //     }
            //     }
            // }
            // if ((betclic_player.spread-ps3838_player.spread) > 1){
            //     if( z === 1 && !(not_sent_points_diff.includes(betclic_player.name+'points'))){
            //         if(casa === 'betclic'){
            //             console.log('betclic points spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //             not_sent_points_diff.push(betclic_player.name+'points')
            //         }else{
            //             console.log('betano points spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //             not_sent_points_diff.push(betclic_player.name+'points')
            //         }
            
            //     }
            //     if( z === 2 && !(not_sent_ass_diff.includes(betclic_player.name+'assists'))){
            //         if(casa === 'betclic'){
            //             console.log('betclic assists spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //             not_sent_ass_diff.push(betclic_player.name+'assists')
            //         }else{
            //             console.log('betano assists spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //             not_sent_ass_diff.push(betclic_player.name+'assists')
            //         }
            //     }
            //     if( z === 3 && !(not_sent_reb_diff.includes(betclic_player.name+'rebounds'))){
            //     if(casa === 'betclic'){
            //         console.log('betclic rebounds spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //         not_sent_reb_diff.push(betclic_player.name+'rebounds')
            //     }else{
            //         console.log('betano rebounds spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //         not_sent_reb_diff.push(betclic_player.name+'rebounds')
            //     }
            //     }
            //     if( z === 4 && !(not_sent_par_diff.includes(betclic_player.name+'par'))){
            //     if(casa === 'betclic'){
            //         console.log('betclic par spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //         not_sent_par_diff.push(betclic_player.name+'par')
            //     }else{
            //         console.log('betano par spread diff(1+) under'+betclic_player.name, betclic_player.spread, betclic_player.under, ps3838_player.spread, ps3838_player.under)
            //         not_sent_par_diff.push(betclic_player.name+'par')
            //     }
            
            //     }
            // }
            // if ((betclic_player.spread-ps3838_player.spread) < -1){
            //     if( z === 1 && !(not_sent_points_diff.includes(betclic_player.name+'points'))){
            //         if(casa === 'betclic'){
            //             console.log('betclic points spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_points_diff.push(betclic_player.name+'points')
            //         }else{
            //             console.log('betano points spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_points_diff.push(betclic_player.name+'points')
            //         }
            //     }
            //     if( z === 2 && !(not_sent_ass_diff.includes(betclic_player.name+'assists'))){
            //         if(casa === 'betclic'){
            //             console.log('betclic assists spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_ass_diff.push(betclic_player.name+'assists')
            //         }else{
            //             console.log('betano assists spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_ass_diff.push(betclic_player.name+'assists')
            //         }
            //     }
            //     if( z === 3 && !(not_sent_reb_diff.includes(betclic_player.name+'rebounds'))){
            //         if(casa === 'betclic'){
            //             console.log('betclic rebounds spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_reb_diff.push(betclic_player.name+'rebounds')
            //         }else{
            //             console.log('betano rebounds spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_reb_diff.push(betclic_player.name+'rebounds')
            //         }
            //     }
            //     if( z === 4 && !(not_sent_par_diff.includes(betclic_player.name+'par'))){
            //         if(casa === 'betclic'){
            //             console.log('betclic par spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_par_diff.push(betclic_player.name+'par')
            //         }else{
            //             console.log('betano par spread diff(1+) over'+betclic_player.name, betclic_player.spread, betclic_player.over, ps3838_player.spread, ps3838_player.over)
            //             not_sent_par_diff.push(betclic_player.name+'par')
            //         }
            //     }
            // }
            // console.log(betclic_player, ps3838_player)
            // console.log(betclic_player.spread-ps3838_player.spread)
            if ((betclic_player.spread-ps3838_player.spread) === 0){
                var over_perc = 1/ps3838_player.true_odds_over
                var under_perc = 1/ps3838_player.true_odds_under

                var profit_over = ((over_perc*((1*betclic_player.over)-1)-(under_perc*1)))
                var profit_under = ((under_perc*((1*betclic_player.under)-1)-(over_perc*1)))
                // console.log(profit_over)
                // console.log(profit_under)

                // console.log(betclic_player, ps3838_player)
                if (profit_over > 0.04){
                    // console.log(betclic_player, ps3838_player)
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
                if (profit_under > 0.04){
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
    try{
    await page.goto(url);
    await page.waitForSelector('body > pre');
    await page.waitForTimeout(3000)
    return await page.evaluate(() => {
        const dataElement = document.querySelector('body > pre');
        return dataElement ? JSON.parse(dataElement.textContent) : null;
    });

    }catch{
        return 0
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
                // console.log(name, spread, over, under)
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
   
var counter

(async () => {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.waitForTimeout(2500)

    getGame_betclic('https://offer.cdn.begmedia.com/api/pub/v3/competitions/513?application=1024&countrycode=pt&forceCompetitionInfo=true&language=pt&sitecode=ptpt')


while (true) {

    if(counter === 100){
        betclic_list = []
        betclic_Points = []
        betclic_Assists = []
        betclic_Rebounds = []
        betclic_PAR = []
        counter = 0
        getGame_betclic('https://offer.cdn.begmedia.com/api/pub/v3/competitions/513?application=1024&countrycode=pt&forceCompetitionInfo=true&language=pt&sitecode=ptpt')
    }

    const get_points =  'https://sportsbook-nash.draftkings.com/sites/US-SB/api/v5/eventgroups/94682/categories/1215?format=json'

    await page.waitForTimeout(2500)
    const get_rebounds = 'https://sportsbook-nash.draftkings.com/sites/US-SB/api/v5/eventgroups/94682/categories/1216?format=json'

    await page.waitForTimeout(2500)
    const get_assists = 'https://sportsbook-nash.draftkings.com/sites/US-SB/api/v5/eventgroups/94682/categories/1217?format=json'

    let points_data = await extractJsonData(page, get_points);
    let assists_data = await extractJsonData(page, get_assists);
    let rebounds_data = await extractJsonData(page, get_rebounds);


    process_points_data(points_data)
    process_assists_data(assists_data)
    process_rebounds_data(rebounds_data)
    

    check_changes(betclic_Points,list_Points,1, 'betclic')
    check_changes(betclic_Assists,list_Assists,2, 'betclic')
    check_changes(betclic_Rebounds,list_Rebounds,3, 'betclic')

    counter = counter + 1
}
})();





// GET IDS https://offer.cdn.begmedia.com/api/pub/v3/competitions/13?application=1024&countrycode=pt&forceCompetitionInfo=true&language=pt&markettypeId=1115&sitecode=ptpt
// PONTOS // https://offer.cdn.begmedia.com/api/pub/v6/events/3002382168?application=1024&categorizationId=8&countrycode=pt&language=pt&sitecode=ptpt
// ESTATISTICAS // https://offer.cdn.begmedia.com/api/pub/v6/events/3002382168?application=1024&categorizationId=27&countrycode=pt&language=pt&sitecode=ptpt