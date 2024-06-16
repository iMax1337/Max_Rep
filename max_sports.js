const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const bot = new TelegramBot('7382019346:AAFAIafzpgTwQYCoJMZ5bEPI2MMae4V1sDw', { polling: true });

// Replace 'CHAT_ID' with the ID of the group chat you want to send messages to
const chatId = '-1002112730272';

// Function to send a message to the group
function sendMessageToGroup(message) {
  bot.sendMessage(chatId, message);
}

// Handle any errors
bot.on('polling_error', (error) => {
  console.error(error);
});

const puppeteer = require('puppeteer');

var body = ''
var header = ''
var group_message = ''

var Prev_games = [];
var Prev_games_darts = [];
var Prev_games_esports = [];

var sent_not = [];

const soccer_league_list = [
    "Australia - NorZone Premier League",
    "Paraguay - Women League",
    "Brazil - Carioca C",
    "Denmark - Denmark Series",
    "Sweden - 2nd Div. Norra Gotaland",
    "Germany - Landesliga",
    "Norway - 3rd Division Group 2",
    "Bosnia and Herzegovina - 1st League",
    "Brazil - Goiano 2",
    "Brazil - Mineiro 2",
    "Brazil - Gaucho 2",
    "Mexico - Primera Division",
    "Belgium - Pro League",
    "Argentina - Liga Pro",
    "Sweden - Superettan",
    "Paraguay - Division Profesional",
    "Argentina - Primera B Nacional",
    "Peru - Liga 1",
    "Belarus - Premier League",
    "Bolivia - Primera Division",
    "Finland - Ykkonen",
    "Germany - Oberliga Niederrhein",
    "Sweden - Division 1 Norra",
    "Norway - 2nd Division",
    "Azerbaijan - Premier League",
    "Lithuania - A Lyga",
    "Venezuela - Primera Division",
    "Argentina - Primera B Metropolitana",
    "Saudi Arabia - Division 1",
    "Austria - Regionalliga West",
    "Croatia - Prva NL",
    "Scotland - Cup Women",
    "UAE - Division 1",
    "UAE - U21 League",
    "Chile - Segunda Division",
    "Colombia - Liga Women",
    "Austria - Regionalliga Mitte",
    "Chile - Primera Division Women",
    "Czech Republic - 3. Liga MSFL",
    "Ethiopia - Premier League",
    "Finland - Kakkonen Group A",
    "Finland - Kakkonen Group B",
    "Finland - Kakkonen Group C",
    "Argentina - Primera C Metropolitana",
    "Poland - U19 League",
    "Brazil - Paulista Women",
    "Sweden - 2nd Div. Norra Svealand",
    "Sweden - 2nd Div. Norrland",
    "Sweden - 2nd Div. Vastra Gotaland",
    "Peru - Liga 2",
    "Brazil - Catarinense U20",
    "Germany - Verbandsliga",
    "Argentina - Torneo Federal A",
    "Norway - 3rd Division Group 4",
    "Norway - 3rd Division Group 6",
    "Tunisia - League 2",
    "Austria - Landesliga",
    "Spain - Tercera Division",
    "Lithuania - 1 Lyga",
    "Poland - 3rd Liga Group 3",
    "Brazil - Catarinense 2",
    "Brazil - Paulista U20",
    "Brazil - Serie D",
    "Brazil - Paranaense 2",
    "Morocco - Botola 2",
    "Dominican Republic - Liga Mayor",
    "Poland - 4th Liga",
    'Slovakia - 3. Liga',
    'Iceland - 4. Deild',
    'Uruguay - Reserve League',
    "Italy - Primavera U19",
    "Sweden - Division 1 Sodra",
    "Denmark - U21 League",
    "Iraq - Premier League",
    "International - Sud Ladies Cup U20",
    "Norway - 3rd Division Group 3",
    "Norway - 3rd Division Group 5",
    "Israel - U19 Elite Division",
    "Argentina - Reserve League",
    "Australia - Queensland Premier League 2",
    "Iceland - U19 League",
    "Algeria - Ligue 2",
    "Malaysia - MFL Cup U23",
    "Norway - 1st Division",
    "Georgia - Erovnuli Liga 2",
    "Finland - Kolmonen",
    "Norway - U19 Cup",
    "Ireland - Leinster Senior League",
    "Australia - NPL New South Wales Women",
    "Poland - 3rd Liga Group 2",
    "Turkey - 1st League",
    "Vietnam - 2nd Division",
    "Myanmar - Women League",
    "Ireland - Munster Senior League",
    "Australia - South Australia State League 1",
    "Indonesia - Liga 1",
    "Estonia - Esiliiga A",
    "Estonia - Esiliiga B",
    "Iceland - 1. Deild Women",
    "Croatia - U19 League",
    "Vietnam - Womens National League",
    "Poland - 3rd Liga Group 4",
    "International - Friendlies U19 Women",
    "Czech Republic - 3. Liga CFL",
    "Lithuania -  1 Lyga",
    "Austria - Regionalliga Ost",
    "Ivory Coast - Ligue 1",
    "Brazil - Mineiro U20",
    "Iceland - 3. Deild",
    "Croatia - 2. NL",
    "Ireland - Division 1",
    "Iceland - 2. Deild",
    "Germany - Berlin Liga",
    "Germany - Berlin Liga",
    "Denmark - 2nd Division",
    "Sweden - 2nd Div. Sodra Gotaland",
    "Switzerland - 2. Liga Interregional",
    "Peru - Reserve League",
    "Poland - 3rd Liga Group 1",
    "Aruba - Divison di Honor",
    "Netherlands - U21 Divisie"
];

const baskt_league_list = [
    "Australia - NBL1",
    "Australia - Big V Women",
    "Spain - LEB Gold",
    "Italy - Serie A2",
    "West Asia Super League",
    "Europe - VTB United League",
    "Georgia - Super League",
    "Poland - 1. Liga",
    "Turkey - TBL First League",
    "Venezuela - Superliga",
    "Italy - Serie B",
    "Iceland - Premier League",
    "Bosnia and Herzegovina - Prvenstvo BIH",
    "Colombia - Baloncesto Profesional Colombiano",
    "Chile - LNB Segunda",
    "Chile - LNB",
    "Uruguay - Liga",
    "Israel - National League",
    "Brazil - Paulista FPB U20",
    "Brazil - Campeonato Brasileiro",
    "Brazil - LBF Women",
    "Bolivia - Libobasquet",
    "Paraguay - LNCF Women",
    "Paraguay - Primera",
    "Argentina - La Liga",
    "Mexico - CIBACOPA",
    "Argentina - Torneo Federal",
    "El Salvador - Liga Mayor de Baloncesto",
    "Senegal - Division 1 Women",
    "France - Championnat Pro B",
    "Australia - South Australia State League 1",
    "Chinese Taipei - T1 League",
    "Germany - Bundesliga U19",
    "Bhutan - Premier League",
    "Denmark - Denmark Series",
    "France - Nationale 1",
    "Australia - NBL1 Women",
    "Indonesia - Basketball League"
];

const handball_league_list = ['Germany - Bundesliga 2','Kuwait League']
const volley_league_list = []
const hockey_league_list = []

var difference = 0

const fs = require('fs');

// Define the file path where you want to write the logs
const logFilePath = 'all_sports.txt';
//soccer - 29 / volley -34  / baskt 4 // darts 10 // handball 18 // hockey 19 // rugby 26 league // rugby union 27 // badminton sp1


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

    if(parseFloat(a) < 1.4){
        return false
    }

    if(parseFloat(b) >= parseFloat(a)){
        return false
    }
    difference = (1/b) - (1/a);
    // console.log('+++'+difference)
    return parseFloat(difference) >= 0.04;
  }


async function check_changes(prev, current) {

    // prev.forEach((prevItem) => {
    //     const currentItem = current.find((ci) => prevItem.team1 == ci?.team1 && prevItem.team2 == ci?.team2)
    //     // console.log(' currentItem ', currentItem);

    current.forEach((currentItem) => {
        const prevItem = prev.find((pi) => pi.team1 === currentItem.team1 && pi.team2 === currentItem.team2);
        
        if (!prevItem) {
            prev.push(currentItem);
        }else{
            if (!(soccer_league_list.includes(currentItem.league))){
            // console.log(' currentItem ', currentItem);
                if(currentItem.sport === 'Darts' || currentItem.sport === 'E Sports' || currentItem.sport === 'Table Tennis'){
                    sent_not.push(currentItem?.team1+'spread')
                    sent_not.push(currentItem?.team1+'total')
                    sent_not.push(currentItem?.team1+'spread')
                    sent_not.push(currentItem?.team1+'total')
                }
        
                let message = []
                let message_totals = []

                if(sent_not.includes(prevItem?.team1+'spread')){}
                    else{  // spreads
                    
                prevItem?.spreads.forEach((prevSpread) => {

                const currentSpread = currentItem?.spreads?.find((currentSpread) => prevSpread?.team1Spread == currentSpread?.team1Spread && prevSpread?.team2Spread == currentSpread?.team2Spread)

                        if (isDifferenceTenPercentOrGreater(prevSpread?.team1SpreadOdd, currentSpread?.team1SpreadOdd)) {
                            sent_not.push(prevItem?.team1+'spread')
                            const t1_perc = ((1/currentSpread.team1SpreadOdd)-((((1/currentSpread.team1SpreadOdd)+(1/currentSpread.team2SpreadOdd))-1)/2))
                            const t2_perc = ((1/currentSpread.team2SpreadOdd)-((((1/currentSpread.team1SpreadOdd)+(1/currentSpread.team2SpreadOdd))-1)/2))
                            const odds_to_beat = 1/t1_perc

                            const ROI10 = ((0.1 + (1*t2_perc))/t1_perc)+1
                            const ROI5 = ((0.04 + (1*t2_perc))/t1_perc)+1

                            let try_me = `${prevItem?.sport};${prevItem?.league};${prevItem?.team1} vs ${prevItem?.team2};${odds_to_beat};${ROI5};${ROI10};${prevItem?.team1};${prevSpread?.team1Spread};${prevSpread?.team1SpreadOdd} -> ${currentSpread?.team1SpreadOdd};${difference};${prevItem?.start_date} \n`

                            message.push(try_me)

                            if(prevItem?.sport === 'Soccer'){
                                if(!(soccer_league_list.includes(prevItem?.league))){
                                    console.log(prevItem?.league)
                                }
                            }
                            if(prevItem?.sport === 'Basketball'){
                                if(!(baskt_league_list.includes(prevItem?.league))){
                                    console.log(prevItem?.league)
                                }
                            }
                            }
                
                        if (isDifferenceTenPercentOrGreater(prevSpread?.team2SpreadOdd, currentSpread?.team2SpreadOdd)) {
                            sent_not.push(prevItem?.team1+'spread')
                            const t1_perc = ((1/currentSpread.team1SpreadOdd)-((((1/currentSpread.team1SpreadOdd)+(1/currentSpread.team2SpreadOdd))-1)/2))
                            const t2_perc = ((1/currentSpread.team2SpreadOdd)-((((1/currentSpread.team1SpreadOdd)+(1/currentSpread.team2SpreadOdd))-1)/2))
                            const odds_to_beat = 1/t2_perc

                            const ROI10 = ((0.1 + (1*t1_perc))/t2_perc)+1
                            const ROI5 = ((0.04 + (1*t1_perc))/t2_perc)+1

                            let try_me = `${prevItem?.sport};${prevItem?.league};${prevItem?.team1} vs ${prevItem?.team2};${odds_to_beat};${ROI5};${ROI10};${prevItem?.team2};${prevSpread?.team2Spread};${prevSpread?.team2SpreadOdd} -> ${currentSpread?.team2SpreadOdd};${difference};${prevItem?.start_date} \n`

                            message.push(try_me)
        
                            if(prevItem?.sport === 'Soccer'){
                                if(!(soccer_league_list.includes(prevItem?.league))){
                                    console.log(prevItem?.league)
                                }
                            }
                            if(prevItem?.sport === 'Basketball'){
                                if(!(baskt_league_list.includes(prevItem?.league))){
                                    console.log(prevItem?.league)
                                }
                            }
                            }
        
                    })
                }

                if(sent_not.includes(prevItem?.team1+'total')){}
                    else{   // totals
                
                    prevItem?.totals.forEach((prevTotal) => {
                    const currentTotal = currentItem?.totals?.find((currentTotal) => prevTotal?.gameTotal == currentTotal?.gameTotal)
            
                        if (isDifferenceTenPercentOrGreater(prevTotal?.over, currentTotal?.over)) {
                            sent_not.push(prevItem?.team1+'total')

                            const over_perc = ((1/currentTotal.over)-((((1/currentTotal.over)+(1/currentTotal.under))-1)/2))
                            const under_perc = ((1/currentTotal.under)-((((1/currentTotal.over)+(1/currentTotal.under))-1)/2))
                            const odds_to_beat = 1/over_perc

                            const ROI10 = ((0.1 + (1*under_perc))/over_perc)+1
                            const ROI5= ((0.045 + (1*under_perc))/over_perc)+1

                            let try_me = `${prevItem?.sport};${prevItem?.league};${prevItem?.team1} vs ${prevItem?.team2};${odds_to_beat};${ROI5};${ROI10};Over;${prevTotal?.gameTotal};${prevTotal?.over} -> ${currentTotal?.over};${difference};${prevItem?.start_date} \n`
                                
                            message_totals.push(try_me)

                            if(prevItem?.sport === 'Soccer'){
                                if(!(soccer_league_list.includes(prevItem?.league))){
                                    console.log(prevItem?.league)
                                }
                            }
                            if(prevItem?.sport === 'Basketball'){
                                if(!(baskt_league_list.includes(prevItem?.league))){
                                    console.log(prevItem?.league)
                                }
                            }
                            }
                
                        if (isDifferenceTenPercentOrGreater(prevTotal?.under, currentTotal?.under)) {
                            sent_not.push(prevItem?.team1+'total')
                            const over_perc = ((1/currentTotal.over)-((((1/currentTotal.over)+(1/currentTotal.under))-1)/2))
                            const under_perc = ((1/currentTotal.under)-((((1/currentTotal.over)+(1/currentTotal.under))-1)/2))
                            const odds_to_beat = 1/over_perc

                            const ROI10 = ((0.1 + (1*over_perc))/under_perc)+1
                            const ROI5 = ((0.045 + (1*over_perc))/under_perc)+1

                            let try_me = `${prevItem?.sport};${prevItem?.league};${prevItem?.team1} vs ${prevItem?.team2};${odds_to_beat};${ROI5};${ROI10};Under;${prevTotal?.gameTotal};${prevTotal?.under} -> ${currentTotal?.under};${difference};${prevItem?.start_date} \n`
                            
                            message_totals.push(try_me)
                            if(prevItem?.sport === 'Soccer'){
                                if(!(soccer_league_list.includes(prevItem?.league))){
                                    console.log(prevItem?.league)
                                }
                            }
                            if(prevItem?.sport === 'Basketball'){
                                if(!(baskt_league_list.includes(prevItem?.league))){
                                    console.log(prevItem?.league)
                                }
                            }
                            }
            
                    })   
                }

                // if(sent_not.includes(prevItem?.team1+'ML')){}
                //     else{   //ml
                //         if(currentItem.sport === 'Soccer'){
                //         // if (isDifferenceTenPercentOrGreater(prevItem?.team1_ML, currentItem?.team1_ML)) {

                //         //     const team1_ml = ((1/currentItem.team1_ML)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML)+(1/currentItem.draw))-1)/3))
                //         //     const team2_ml = ((1/currentItem.team2_ML)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML)+(1/currentItem.draw))-1)/3))
                //         //     const draw_ml = ((1/currentItem.draw)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML)+(1/currentItem.draw))-1)/3))
                //         //     const odds_to_beat = 1/team1_ml
                
                //         //     const ROI = ((0.1 + (1*(team2_ml+draw_ml)))/team1_ml)+1
                
                //         //     let try_me = `${prevItem?.sport};${prevItem?.league};${prevItem?.team1} vs ${prevItem?.team2};${odds_to_beat};${ROI};${prevItem?.team1};Winner;${prevItem?.team1_ML} -> ${currentItem?.team1_ML};${difference} \n`
                                
                //         //     sent_not.push(prevItem?.team1+'ML')
                //         //     message.push(try_me)

                //         //     if(prevItem?.sport === 'Soccer'){
                //         //         if(!(soccer_league_list.includes(prevItem?.league))){
                //         //             console.log(prevItem?.league)
                //         //         }
                //         //     }

                //         //     if(prevItem?.sport === 'Basketball'){
                //         //         if(!(baskt_league_list.includes(prevItem?.league))){
                //         //             console.log(prevItem?.league)
                //         //         }
                //         //     }
                //         //     }
                //         // if (isDifferenceTenPercentOrGreater(prevItem?.team2_ML, currentItem?.team2_ML)) {
            
                //         //     const team1_ml = ((1/currentItem.team1_ML)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML)+(1/currentItem.draw))-1)/3))
                //         //     const team2_ml = ((1/currentItem.team2_ML)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML)+(1/currentItem.draw))-1)/3))
                //         //     const draw_ml = ((1/currentItem.draw)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML)+(1/currentItem.draw))-1)/3))
                //         //     const odds_to_beat = 1/team2_ml
                
                //         //     const ROI = ((0.1 + (1*(team1_ml+draw_ml)))/team2_ml)+1
                
                //         //     let try_me = `${prevItem?.sport};${prevItem?.league};${prevItem?.team1} vs ${prevItem?.team2};${odds_to_beat};${ROI};${prevItem?.team2};Winner;${prevItem?.team2_ML} -> ${currentItem?.team2_ML};${difference} \n`
                                
                //         //     sent_not.push(prevItem?.team1+'ML')
                //         //     message.push(try_me)
                //         //     // SEND NOTIFICATION
                //         //     if(prevItem?.sport === 'Soccer'){
                //         //         if(!(soccer_league_list.includes(prevItem?.league))){
                //         //             console.log(prevItem?.league)
                //         //         }
                //         //     }

                //         //     if(prevItem?.sport === 'Basketball'){
                //         //         if(!(baskt_league_list.includes(prevItem?.league))){
                //         //             console.log(prevItem?.league)
                //         //         }
                //         //     }
                //         // }
                //     }else{
                //         if (isDifferenceTenPercentOrGreater(prevItem?.team1_ML, currentItem?.team1_ML)) {
                //             sent_not.push(prevItem?.team1+'ML')

                //             const team1_ml = ((1/currentItem.team1_ML)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML))-1)/2))
                //             const team2_ml = ((1/currentItem.team2_ML)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML))-1)/2))
                //             const odds_to_beat = 1/team1_ml
                
                //             const ROI10 = ((0.1 + (1*(team2_ml)))/team1_ml)+1
                //             const ROI5 = ((0.04 + (1*(team2_ml)))/team1_ml)+1
                
                //             let try_me = `${prevItem?.sport};${prevItem?.league};${prevItem?.team1} vs ${prevItem?.team2};${odds_to_beat};${ROI5};${ROI10};${prevItem?.team1};- Vencedor;${prevItem?.team1_ML} -> ${currentItem?.team1_ML};${difference};${prevItem?.start_date} \n`
                                
                //             message.push(try_me)
                //             if(prevItem?.sport === 'Soccer'){
                //                 if(!(soccer_league_list.includes(prevItem?.league))){
                //                     console.log(prevItem?.league)
                //                 }
                //             }
                //             if(prevItem?.sport === 'Basketball'){
                //                 if(!(baskt_league_list.includes(prevItem?.league))){
                //                     console.log(prevItem?.league)
                //                 }
                //             }
                //         }
                //         if (isDifferenceTenPercentOrGreater(prevItem?.team2_ML, currentItem?.team2_ML)) {
                //             sent_not.push(prevItem?.team1+'ML')
            
                //             const team1_ml = ((1/currentItem.team1_ML)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML))-1)/2))
                //             const team2_ml = ((1/currentItem.team2_ML)-((((1/currentItem.team1_ML)+(1/currentItem.team2_ML))-1)/2))
                //             const odds_to_beat = 1/team2_ml
                
                //             const ROI10 = ((0.1 + (1*(team1_ml)))/team2_ml)+1
                //             const ROI5 = ((0.04 + (1*(team1_ml)))/team2_ml)+1
                
                //             let try_me = `${prevItem?.sport};${prevItem?.league};${prevItem?.team1} vs ${prevItem?.team2};${odds_to_beat};${ROI5};${ROI10};${prevItem?.team2};- Vencedor;${prevItem?.team2_ML} -> ${currentItem?.team2_ML};${difference};${prevItem?.start_date} \n`
                                
                //             message.push(try_me)

                //             if(prevItem?.sport === 'Soccer'){
                //                 if(!(soccer_league_list.includes(prevItem?.league))){
                //                     console.log(prevItem?.league)
                //                 }
                //             }
                //             if(prevItem?.sport === 'Basketball'){
                //                 if(!(baskt_league_list.includes(prevItem?.league))){
                //                     console.log(prevItem?.league)
                //                 }
                //             }
                //         }
                //     }
                // }

                if (message.length === 0){
                    }else{
                        message.forEach((info) => {
                        fs.appendFileSync(logFilePath, info);
                        const parts = info.split(';');
                        const sport = parts[0];
                        const league = parts[1];
                        const match = parts[2];
                        const odds_to_beat = parseFloat(parts[3]).toFixed(2);
                        const ROI5 = parseFloat(parts[4]).toFixed(2)
                        const ROI10 = parseFloat(parts[5]).toFixed(2);
                        const team_or_total = parts[6];
                        let betType = parts[7];
                        if(betType > 0){
                            betType = '+'+parts[7];
                        }
                        const oddsMove = parts[8];
                        const Diff = parseFloat(parts[9]*100).toFixed(2);
                        const start = parts[10]
                        header = 
                        `------ ${sport} ------
        Liga: ${league}

        Jogo: ${match}\n
        Start: ${start}
        Alternativas:`

                        body = 
                        `
                BET: ${team_or_total} ${betType} [${Diff}%]
                Odd Minima: ${ROI5}
                10% ROI: ${ROI10}\n`
                        group_message = group_message+body
                    })
                    group_message = header + group_message
                    console.log(group_message)
                    sendMessageToGroup(group_message)
                    group_message = ''
                }
                if (message_totals.length === 0){
                    }else{
                // console.log(message)
                message_totals.forEach((info) => {
                    fs.appendFileSync(logFilePath, info);
                    const parts = info.split(';');
                    const sport = parts[0];
                    const league = parts[1];
                    const match = parts[2];
                    const odds_to_beat = parseFloat(parts[3]).toFixed(2);
                    const ROI5 = parseFloat(parts[4]).toFixed(2)
                    const ROI10 = parseFloat(parts[5]).toFixed(2);
                    const team_or_total = parts[6];
                    let betType = parts[7];
                    const oddsMove = parts[8];
                    const Diff = parseFloat(parts[9]*100).toFixed(2);
                    const start = parts[10]
                    header = 
                    `------ ${sport} ------
        Liga: ${league}

        Jogo: ${match}\n
        Start: ${start}
        Alternativas:`;

                    body = 
                    `
            Aposta: ${team_or_total} ${betType} [${Diff}%]
            Odd Minima: ${ROI5}
            10% ROI: ${ROI10}\n`;
                    group_message = group_message+body
                })
                group_message = header + group_message
                console.log(group_message)
                sendMessageToGroup(group_message)
                group_message = ''
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

function processJsonData(jsonData, trigger) {
    const current_games = []
    const leagues = jsonData.n[0][2];
    const sport = jsonData.n[0][1];

    // console.log(sport+'\n')

    for (const leagueData of leagues) {
        const league = leagueData[1];
        const gamesData = leagueData[2];
        // console.log(league)

        for (const gameData of gamesData) {
            const unix_date = gameData[4]
            const start = new Date(unix_date);
            const start_date = start.toLocaleString();
            // console.log(start_date)
            const team1 = gameData[1];
            const team2 = gameData[2];
            const spreads = [];
            const totals = [];

            if(team1.includes('(Points)')){
                continue
            }else{
                const spreadData = gameData[8][0][0];
                try{
                    var team1_ML = gameData[8][0][2][1];
                }catch{
                    var team1_ML = 0
                }
                try{
                    var team2_ML = gameData[8][0][2][0];
                }catch{
                    var team2_ML = 0
                }
                try{
                    var draw = gameData[8][0][2][2];
                }catch{
                    var draw = 0
                }
                for (const spread of spreadData) {
                    if (!String(spread[0]).includes('.5-') && !String(spread[0]).match(/\d+-\d+\.5/) && !String(spread[0]).includes('.25') && !String(spread[0]).includes('.75') && String(spread[0]).includes('.5')) {
                        const team1Spread = spread[1];
                        const team2Spread = spread[0];
                        const team1SpreadOdd = spread[3];
                        const team2SpreadOdd = spread[4];
                        // console.log(typeof(team1Spread),team1Spread )
                        spreads.push({team1Spread, team1SpreadOdd, team2Spread, team2SpreadOdd});
                    }
                }

                const totalData = gameData[8][0][1];
                for (const total of totalData) {
                    if (!String(total[0]).includes('.5-') && !String(total[0]).match(/\d+-\d+\.5/) && !String(total[0]).includes('.25') && !String(total[0]).includes('.75') && String(total[0]).includes('.5')) {
                        const gameTotal = total[0];
                        const over = total[2];
                        const under = total[3];
                        // console.log(typeof(gameTotal),gameTotal)
                        totals.push({gameTotal, over, under});
                    }
                }
                if (trigger === 0){
                    console.log(sport, league, team1, team2, spreads, totals, team1_ML, team2_ML, start_date)
                    Prev_games.push({sport, league, team1, team2, spreads, totals, team1_ML, team2_ML, draw, start_date, unix_date});
                }else{
                    current_games.push({sport, league, team1, team2, spreads, totals, team1_ML, team2_ML, draw, start_date, unix_date});
                    // console.log(current_games)
                }
            }
        }
    }
    if (trigger === 0){
        // console.log(Prev_games)
        return Prev_games;
    }else{
        check_changes(Prev_games, current_games)
        // return current_games
    }
}

function processJsonData_darts(jsonData, trigger) {
    const current_games_darts = []
    const leagues = jsonData.n[0][2];
    const sport = jsonData.n[0][1];

    for (const leagueData of leagues) {
        const league = leagueData[1];
        const gamesData = leagueData[2];

        for (const gameData of gamesData) {
            const team1 = gameData[1];
            const team2 = gameData[2];
            try{
                var team1_ML = gameData[8][0][2][1];
                var team2_ML = gameData[8][0][2][0];
            }catch{
                var team1_ML = 0
                var team2_ML = 0
            }

            if (trigger === 0){
                Prev_games_darts.push({sport, league, team1, team2, team1_ML, team2_ML});
            }else{
                current_games_darts.push({sport, league, team1, team2, team1_ML, team2_ML});
                // console.log(current_games)
            }

            }
        }
    if (trigger === 0){
        // console.log(Prev_games)
        return Prev_games;
    }else{
        check_changes(Prev_games_darts, current_games_darts)
        // return current_games
    }
}

function processJsonData_table_tennis(jsonData, trigger) {
    const current_games = []
    const leagues = jsonData.n[0][2];
    const sport = jsonData.n[0][1];

    // console.log(sport+'\n')

    for (const leagueData of leagues) {
        const league = leagueData[1];
        const gamesData = leagueData[2];
        // console.log(league)

        for (const gameData of gamesData) {
            const start = new Date(gameData[4] * 1000);
            const start_date = date.toISOString()
            const team1 = gameData[1];
            const team2 = gameData[2];

            if(team1.includes('(Points)')){
                continue
            }else{
                try{
                    var team1_ML = gameData[8][0][0][0];
                }catch{
                    var team1_ML = 0
                }
                try{
                    var team2_ML = gameData[8][0][0][1];
                }catch{
                    var team2_ML = 0
                }
      
                if (trigger === 0){
                    Prev_games.push({sport, league, team1, team2, team1_ML, team2_ML, start_date});
                }else{
                    current_games.push({sport, league, team1, team2, team1_ML, team2_ML, start_date});
                    // console.log(current_games)
                }
            }
        }
    }
    if (trigger === 0){
        // console.log(Prev_games)
        return Prev_games;
    }else{
        check_changes(Prev_games, current_games)
        // return current_games
    }
}

function processJsonData_esports(jsonData, trigger) {
    const current_games_esports = []
    const leagues = jsonData.n[0][2];
    const sport = jsonData.n[0][1];

    for (const leagueData of leagues) {
        const league = leagueData[1];
        const gamesData = leagueData[2];

        for (const gameData of gamesData) {
            const team1 = gameData[1];
            const team2 = gameData[2];
            try{
                var team1_ML = gameData[8][0][2][1];
                var team2_ML = gameData[8][0][2][0];
            }catch{
                var team1_ML = 0
                var team2_ML = 0
            }

            if (trigger === 0){
                Prev_games_esports.push({sport, league, team1, team2, team1_ML, team2_ML});
            }else{
                current_games_esports.push({sport, league, team1, team2, team1_ML, team2_ML});
                // console.log(current_games)
            }

            }
        }
    if (trigger === 0){
        // console.log(Prev_games)
        return Prev_games;
    }else{
        check_changes(Prev_games_esports, current_games_esports)
        // return current_games
    }
}

function removePastGames(games) {
    const currentUnixTime = Math.floor(Date.now());
    
    // Separate the games into future and past
    const futureGames = [];
    const pastGames = [];
  
    for (const game of games) {
      if (game.unix_date > currentUnixTime) {
        futureGames.push(game);
      } else {
        // console.log(game)
        pastGames.push(game);
      }
    }
  
    // // Log the removed games
    // if (pastGames.length > 0) {
    // //   console.log("Removed past games:", pastGames);
    // } else {
    // //   console.log("No past games were removed.");
    // }
  
    return futureGames;
  }


(async () => {
    var counter = 0
    const browser = await launchBrowser();
    const page = await browser.newPage();
    
    const sportUrls = {
        basketball: 'https://www.ps3838.com/en/sports/basketball',
        api: 'https://www.ps3838.com/sports-service/sv/compact/events'
    };
    // { name: 'e_sports', sp: 12, processFunction: processJsonData_esports }, { name: 'Table_tennis', sp: 32, processFunction: processJsonData_table_tennis }
        // { name: 'darts', sp: 10, processFunction: processJsonData_darts },
        // { name: 'rugby', sp: 26, processFunction: processJsonData },
        // { name: 'rugby_union', sp: 27, processFunction: processJsonData },

    const sports = [
        { name: 'basketball', sp: 4, processFunction: processJsonData },
        { name: 'soccer', sp: 29, processFunction: processJsonData },
        { name: 'volleyball', sp: 34, processFunction: processJsonData },
        { name: 'handball', sp: 18, processFunction: processJsonData },
        { name: 'hockey', sp: 19, processFunction: processJsonData },
        { name: 'Badminton', sp: 1, processFunction: processJsonData }
    ];

    const fetchDataForSport = async (sport, repeat = 0) => {
        const unixTime = Math.floor(Date.now() / 1000);
        const apiUrl = `${sportUrls.api}?btg=1&c=&cl=100&d=&ec=&ev=&g=QQ%3D%3D&hle=false&inl=false&l=100&lang=&lg=&lv=&me=0&mk=1&more=false&o=1&ot=1&pa=0&pimo=0,1,2&pn=-1&pv=1&sp=${sport.sp}&tm=0&v=0&locale=en_US&_=${unixTime}&withCredentials=true`;

        const jsonData = await extractJsonData(page, apiUrl);
        if (jsonData) {
            sport.processFunction(jsonData, repeat);
        } else {
            console.log(`No data found for ${sport.name}.`);
        }
    };

    await page.waitForTimeout(2000);
    await page.goto(sportUrls.basketball);
    await page.waitForTimeout(20000); // Assuming this is for login, replace with actual login logic if needed

    // Initial fetch for each sport   AC88007896 hj!N4JbpWEcDdzp
    for (const sport of sports) {
        await fetchDataForSport(sport);
    }

    // Continuous fetch in a loop
    while (true) {
        await page.goto(sportUrls.basketball);
        await new Promise(resolve => setTimeout(resolve, 2500));

        for (const sport of sports) {
            await fetchDataForSport(sport, 1);
        }

        if(counter === 500){
            Prev_games = removePastGames(Prev_games)
            counter = 0
        }
        counter = counter + 1
    }
})();