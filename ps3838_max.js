
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
  const game_list = [226431, 226433, 226434, 226432];
  const base_url = 'https://bv2.digitalsportstech.com/api/dfm/marketsByOu?sb=betonline&statistic=Points';


  for (let gameId of game_list) {

    const api_request = `${base_url}&gameId=${gameId}`;
    try{
      await getGame(api_request, 0);
    }catch{
      console.log("o id " +gameId+' fudeu')
    }
    // Wait for 5 seconds before the next request
    await new Promise(resolve => setTimeout(resolve, 3000));
}

  while (true) {

      for (let gameId of game_list) {
        const api_request = `${base_url}&gameId=${gameId}`;
        await getGame(api_request, 1);

        // Wait for 5 seconds before the next request
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    check_changes()

    playerDataPrev = [...playerDataCurrent];
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
      const value = player_list[i].markets[0].value;
      const over = parseFloat(player_list[i].markets[0].odds);
      const under = parseFloat(player_list[i].markets[1].odds);
      playerDataPrev.push({ player_name, value, over, under });
    }
    return 0

  }else{

      for (let i = 0; i < player_list.length; i++) {
        const player_name = player_list[i].name;
        const value = player_list[i].markets[0].value;
        const over = parseFloat(player_list[i].markets[0].odds);
        const under = parseFloat(player_list[i].markets[1].odds);
        playerDataCurrent.push({ player_name, value, over, under });
      }
      return 0;

  }
}


async function check_changes(){
    for(var i = 0; i < playerDataPrev.length; i++){
      for(var j = 0; j < playerDataCurrent.length; j++){
        if (playerDataPrev[i].player_name === playerDataCurrent[j].player_name){
          // console.log('value no diff')
          if(playerDataPrev[i].value === playerDataCurrent[j].value){
          }else{
            const diff = playerDataPrev[i].value - playerDataCurrent[j].value
            sendMessageToGroup('nome'+playerDataCurrent[j].player_name,'prev value'+playerDataPrev[i].value,'current value'+playerDataCurrent[j].value,'diff value'+diff);
          }

          if(playerDataPrev[i].over === playerDataCurrent[j].over){
            // console.log('over no diff')
          }else{
            var over_move = playerDataPrev[i].over - playerDataCurrent[j].over
            console.log('nome'+playerDataCurrent[j].player_name+'prev value over '+playerDataPrev[i].over+'current value over'+playerDataCurrent[j].over+'diff over'+over_move)
            if(over_move > 0.1){
              sendMessageToGroup('nome'+playerDataCurrent[j].player_name+'prev value over '+playerDataPrev[i].over+'current value over'+playerDataCurrent[j].over+'diff over'+over_move+'value'+playerDataCurrent[j].value);
              return 0;
            }
          }

          if(playerDataPrev[i].under === playerDataCurrent[j].under){
            // console.log('under no diff')
          }else{
            var under_move = playerDataPrev[i].under - playerDataCurrent[j].under
            console.log('nome'+playerDataCurrent[j].player_name+'prev value under '+playerDataPrev[i].under+'current value under'+playerDataCurrent[j].under+'diff under'+under_move)
            if(under_move > 0.1){
              sendMessageToGroup('nome'+playerDataCurrent[j].player_name+'prev value under '+playerDataPrev[i].under+'current value under'+playerDataCurrent[j].under+'diff under'+under_move+'value'+playerDataCurrent[j].value);
              return 0;
            }
          }


          }
        }
      }
    }


// Start the main function
main();

// let playerDataPrev = [];
// let playerDataCurrent = [];

// const gameList = [226430, 226429];
// const baseUrl = 'https://bv2.digitalsportstech.com/api/dfm/marketsByOu?sb=betonline&statistic=Points';

// async function main() {
//   await fetchInitialData();
//   while (true) {
//     await fetchCurrentData();
//     checkChanges();
//     playerDataPrev = [...playerDataCurrent];
//     playerDataCurrent = [];
//   }
// }

// async function fetchInitialData() {
//   for (const gameId of gameList) {
//     const apiRequest = `${baseUrl}&gameId=${gameId}`;
//     await fetchGameData(apiRequest, 0);
//     await delay(3000);
//   }
// }

// async function fetchCurrentData() {
//   for (const gameId of gameList) {
//     const apiRequest = `${baseUrl}&gameId=${gameId}`;
//     await fetchGameData(apiRequest, 1);
//     await delay(3000);
//   }
// }

// async function fetchGameData(apiRequest, arrayType) {
//   try {
//     const response = await fetch(apiRequest);
//     const data = await response.json();
//     processGameData(data, arrayType);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// function processGameData(data, arrayType) {
//   const playerList = data[0].players;
//   const targetArray = arrayType === 0 ? playerDataPrev : playerDataCurrent;

//   playerList.forEach(player => {
//     const { name: playerName, markets } = player;
//     const value = markets[0].value;
//     const over = parseFloat(markets[0].odds);
//     const under = parseFloat(markets[1].odds);
//     targetArray.push({ playerName, value, over, under });
//   });
// }

// function checkChanges() {
//   playerDataPrev.forEach(prevPlayer => {
//     const currentPlayer = playerDataCurrent.find(player => player.playerName === prevPlayer.playerName);
//     if (currentPlayer) {
//       if (prevPlayer.value !== currentPlayer.value) {
//         console.log('notification value');
//       }

//       const overMove = prevPlayer.over - currentPlayer.over;
//       if (overMove > 0.1) {
//         console.log('notification over');
//         return;
//       }

//       const underMove = prevPlayer.under - currentPlayer.under;
//       if (underMove > 0.1) {
//         console.log('notification under');
//         return;
//       }
//     }
//   });
// }

// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Start the main function
// main();