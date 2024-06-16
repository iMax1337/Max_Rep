// Replace with your token
const token = '7053710958:AAGr7BcalPwn4oyJlH527OPrceGcX7RNdVM';

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Replace with your token
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const chromeExecutablePath1 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win/chrome.exe';
// const chromeExecutablePath2 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile2/chrome.exe';
// const chromeExecutablePath3 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile3/chrome.exe';
// const chromeExecutablePath4 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile4/chrome.exe';
// const chromeExecutablePath5 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile5/chrome.exe';
// const chromeExecutablePath6 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile6/chrome.exe';
// const chromeExecutablePath7 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile7/chrome.exe';
// const chromeExecutablePath8 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile8/chrome.exe';
// const chromeExecutablePath9 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile9/chrome.exe';
// const chromeExecutablePath10 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile10/chrome.exe';
// const chromeExecutablePath11 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile11/chrome.exe';
// const chromeExecutablePath12 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile12/chrome.exe';
// const chromeExecutablePath13 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile13/chrome.exe';
// const chromeExecutablePath14 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile14/chrome.exe';
// const chromeExecutablePath15 = 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-profile15/chrome.exe';

const extensionPath = 'C:/Users/max_r/AppData/Local/Google/Chrome/User Data/Default/Extensions/padekgcemlokbadohgkifijomclgjgif/2.5.21_0';

async function launchBrowser(executablePath, userDataDir) {
  try {
    return await puppeteer.launch({
      executablePath,
      headless: false,
      defaultViewport: false,
      userDataDir,
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        '--enable-automation'
      ]
    });
  } catch (error) {
    console.error(`Failed to launch browser: ${error}`);
  }
}

function isValidFormat(message) {
  const parts = message.split(';');
  return parts.length === 2 && parts.every(part => part.trim() !== '');
}

async function handleNewLink(page, link, odd) {
  try {
    await page.goto(link);
    await page.waitForSelector('body > app-desktop > div.layout > div > div > div > sports-right-menu > sports-betting-slip > div > div > div > div > betting-slip-content > div > div > div > betting-slip-selection-card > div > div.progressiveBettingSlip_cardContainer > betting-slip-selection-card-title > div.progressiveBettingSlip_cardContent > betting-slip-odds-field > div > button > span');

    const webOdd = await page.$eval('body > app-desktop > div.layout > div > div > div > sports-right-menu > sports-betting-slip > div > div > div > div > betting-slip-content > div > div > div > betting-slip-selection-card > div > div.progressiveBettingSlip_cardContainer > betting-slip-selection-card-title > div.progressiveBettingSlip_cardContent > betting-slip-odds-field > div > button > span', div => div.textContent.trim());

    if (String(webOdd) === String(odd)) {
      console.log('Odds match, placing bet');
      await page.type('body > app-desktop > div.layout > div > div > div > sports-right-menu > sports-betting-slip > div > div > div > div > betting-slip-content > div > div > div > betting-slip-selection-card > div > div.progressiveBettingSlip_cardContainer > betting-slip-selection-card-footer > div > betting-slip-stake-field > div > input', '1');
      await page.click('body > app-desktop > div.layout > div > div > div > sports-right-menu > sports-betting-slip > div > div > betting-slip-footer > div > div > div:nth-child(2) > div.progressiveBettingSlip_footerEnd > div > button');
      await new Promise(resolve => setTimeout(resolve, 300));
      await page.goto('https://www.betclic.pt/');
    } else {
      console.log('Odds do not match, closing selection');
    }
    await page.click('body > app-desktop > div.layout > div > div > div > sports-right-menu > sports-betting-slip > div > div > div > div > betting-slip-content > div > div > div > betting-slip-selection-card > div > div.progressiveBettingSlip_cardContainer > betting-slip-selection-card-title > div.progressiveBettingSlip_cardStart > div.btnWrapper > button');
  } catch (error) {
    console.error(`Failed to handle new link: ${error}`);
  }
}

(async () => {
  const browser1 = await launchBrowser(chromeExecutablePath1, './profile_1');
  // const browser2 = await launchBrowser(chromeExecutablePath2, './profile_2');
  // const browser3 = await launchBrowser(chromeExecutablePath3, './profile_3');
  // const browser4 = await launchBrowser(chromeExecutablePath4, './profile_4');
  // const browser5 = await launchBrowser(chromeExecutablePath5, './profile_5');
  // const browser6 = await launchBrowser(chromeExecutablePath6, './profile_6');
  // const browser7 = await launchBrowser(chromeExecutablePath7, './profile_7');
  // const browser8 = await launchBrowser(chromeExecutablePath8, './profile_8');
  // const browser9 = await launchBrowser(chromeExecutablePath9, './profile_9');
  // const browser10 = await launchBrowser(chromeExecutablePath10, './profile_10');
  // const browser11 = await launchBrowser(chromeExecutablePath11, './profile_11');
  // const browser12 = await launchBrowser(chromeExecutablePath12, './profile_12');
  // const browser13 = await launchBrowser(chromeExecutablePath13, './profile_13');
  // const browser14 = await launchBrowser(chromeExecutablePath14, './profile_14');
  // const browser15 = await launchBrowser(chromeExecutablePath15, './profile_15');

  if (!browser1) {
    console.error('Failed to launch one or both browsers');
    return;
  }

  const page1 = await browser1.newPage();
  // const page2 = await browser2.newPage();
  // const page3 = await browser3.newPage();
  // const page4 = await browser4.newPage();
  // const page5 = await browser5.newPage();
  // const page6 = await browser6.newPage();
  // const page7 = await browser7.newPage();
  // const page8 = await browser8.newPage();
  // const page9 = await browser9.newPage();
  // const page10 = await browser10.newPage();
  // const page11 = await browser11.newPage();
  // const page12 = await browser12.newPage();
  // const page13 = await browser13.newPage();
  // const page14 = await browser14.newPage();
  // const page15 = await browser15.newPage();

  await page1.goto('https://www.betclic.pt/'); 
  //alex - Alex.master1200@gmail.com //Killerjunior1200
  // await page2.goto('https://www.betclic.pt/'); //tiago - 
  // await page3.goto('https://www.betclic.pt/'); // gamado
  // await page4.goto('https://www.betclic.pt/'); //constantino -
  
  // await page5.goto('https://www.betclic.pt/'); //edwin
  // await page6.goto('https://www.betclic.pt/'); //pombo
  // await page7.goto('https://www.betclic.pt/'); //marvin
  // await page8.goto('https://www.betclic.pt/'); //maria


  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hi! Send me a message in the format "link;odd" and I will save it to a file.');
  });

  bot.on('message', (msg) => {
    if (msg.text.startsWith('/')) return;

    if (!isValidFormat(msg.text)) {
      bot.sendMessage(msg.chat.id, 'Invalid format. Please use the format "link;odd".');
      return;
    }

    const [link, odd] = msg.text.split(';').map(part => part.trim());
    const message = `${msg.text}\n`;
    const filePath = path.join(__dirname, 'messages.txt');

    fs.appendFile(filePath, message, async (err) => {
      if (err) {
        console.error('Failed to save message:', err);
        bot.sendMessage(msg.chat.id, 'Failed to save your message. Please try again.');
      } else {
        bot.sendMessage(msg.chat.id, 'Message saved!');
        // await Promise.all([
          await handleNewLink(page1, link, odd);
          // await handleNewLink(page2, link, odd);
          // await handleNewLink(page3, link, odd);
          // await handleNewLink(page4, link, odd);
          // await handleNewLink(page5, link, odd);
          // await handleNewLink(page6, link, odd);
          // await handleNewLink(page7, link, odd);
          // await handleNewLink(page8, link, odd);
          // await handleNewLink(page9, link, odd);


      // ]);
      }
    });
  });
})();
