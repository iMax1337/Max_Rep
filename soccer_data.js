const TelegramBot = require('node-telegram-bot-api');
// Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
const bot = new TelegramBot('7042596351:AAGGOomRLoXU7axfv4sHr8RsdX073dBMQjI', { polling: true });

// Replace 'CHAT_ID' with the ID of the group chat you want to send messages to
const chatId = '-1002036445348';

// Function to send a message to the group
function sendMessageToGroup(message) {
  bot.sendMessage(chatId, message);
}

// Handle any errors
bot.on('polling_error', (error) => {
  console.error(error);
});

let playerDataPrev = [];
let playerDataCurrent = [];

async function main() {
  const game_list = 
    [
    184286,184287,184288,184289,184290,184291,184292,
    184293,184294,184295,184658,184659,184660,184661,
    184662,184664,184665,184666,184667,185345,185347,
    185348,185349,185350,185352,185353,188685,185661,
    185663,185662,185664,185665,185667,185666,185668,
    185669,185967,185968,185969,185970,185971,185972,
    185973,185974,185975,227263
    ];
  const base_url = 'https://bv2.digitalsportstech.com/api/dfm/marketsBySs?sb=betonline&statistic=Goals';


  for (let gameId of game_list) {

    const api_request = `${base_url}&gameId=${gameId}`;
    try{
      await getGame(api_request, 0);
    }catch{
      console.log("o id " +gameId+' fudeu')
    }
    // Wait for 5 seconds before the next request
      await new Promise(resolve => setTimeout(resolve, 500));
}

console.log(playerDataPrev)

  while (true) {

      for (let gameId of game_list) {
        const api_request = `${base_url}&gameId=${gameId}`;
        await getGame(api_request, 1);

        // Wait for 5 seconds before the next request
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    check_changes()
    // playerDataPrev = [...playerDataCurrent];
    playerDataCurrent = [];


  }
}

async function getGame(api_request, array) {
  try {
      const response = await fetch(api_request);
      const data = await response.json();
      test(data, array);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

function test(data, array) {

  const player_list = data[0]?.players ?? [];

  if (array === 0) {
    for (let i = 0; i < player_list.length; i++) {
      const player_name = player_list[i].name;
      const value1 = player_list[i].markets[0].value;
      const value2 = player_list[i].markets[1].value;
      const value3 = player_list[i].markets[2].value;
      if(value1 === 1){
        const odd = parseFloat(player_list[i].markets[0].odds);
        if (odd > 10){
          continue
        }
        playerDataPrev.push({ player_name, odd});
        continue
      }
      if(value2 === 1){
        const odd = parseFloat(player_list[i].markets[1].odds);
        if (odd > 10){
          continue
        }
        playerDataPrev.push({ player_name, odd});
        continue
      }
      if(value3 === 1){
        const odd = parseFloat(player_list[i].markets[2].odds);
        if (odd > 10){
          continue
        }
        playerDataPrev.push({ player_name, odd});
        continue
      }
    }
    return 0

  }else{

    for (let i = 0; i < player_list.length; i++) {
      const player_name = player_list[i].name;
      const value1 = player_list[i].markets[0].value;
      const value2 = player_list[i].markets[1].value;
      const value3 = player_list[i].markets[2].value;
      if(value1 === 1){
        const odd = parseFloat(player_list[i].markets[0].odds);
        if (odd > 10){
          continue
        }
        playerDataCurrent.push({ player_name, odd});
        continue
      }
      if(value2 === 1){
        const odd = parseFloat(player_list[i].markets[1].odds);
        if (odd > 10){
          continue
        }
        playerDataCurrent.push({ player_name, odd});
        continue
      }
      if(value3 === 1){
        const odd = parseFloat(player_list[i].markets[2].odds);
        if (odd > 10){
          continue
        }
        playerDataCurrent.push({ player_name, odd});
        continue
      }
    }
    return 0

  }
}


async function check_changes(){
    console.log('im here')
    for(var i = 0; i < playerDataPrev.length; i++){
      for(var j = 0; j < playerDataCurrent.length; j++){
        if (playerDataPrev[i].player_name === playerDataCurrent[j].player_name){
          // console.log('nome '+playerDataPrev[i].player_name+' prev odd '+playerDataPrev[i].odd+'new odd '+playerDataCurrent[j].odd)
          if(playerDataPrev[i].odd === playerDataCurrent[j].odd){
          }else{
            if(playerDataPrev[i].odd > playerDataCurrent[j].odd){
              const diff = playerDataPrev[i].odd - playerDataCurrent[j].odd
              console.log('nome '+playerDataPrev[i].player_name+' prev odd '+playerDataPrev[i].odd+'new odd '+playerDataCurrent[j].odd)}
            // sendMessageToGroup('nome '+playerDataCurrent[j].player_name,'\n prev value '+playerDataPrev[i].odd,'\n current value '+playerDataCurrent[j].odd,'\n diff value '+diff);
          }
          }
        }
      }
    }


// Start the main function
main();