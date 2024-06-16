const fs = require('fs');
const puppeteer = require('puppeteer');

async function launchBrowser() {
    return await puppeteer.launch({
        executablePath: 'C:/Users/max_r/Desktop/max drive/scraper/chrome-win-b/chrome.exe',
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp1"
    });
}

async function extractJsonData(page, url) {
    await page.goto(url);
    await page.waitForSelector('body > pre');
    await page.waitForTimeout(3000);
    return await page.evaluate(() => {
        const dataElement = document.querySelector('body > pre');
        return dataElement ? JSON.parse(dataElement.textContent) : null;
    });
}

async function processResultsData(jsonData, betsSet) {
    const leagueList = jsonData[2];
    let matches = [];

    for (const leagueData of leagueList) {
        const league = leagueData[0];
        if (!String(league).includes('Corners')) {
            const gameList = leagueData[1];
            for (const game of gameList) {
                const team1 = game[0];
                const team2 = game[1];
                const result = game[6][0];
                if (!(result === "Cancelled")) {
                    const matchInfo = `${league} ${team1} ${team2}`;
                    if (betsSet.has(matchInfo)) {
                        matches.push(`${matchInfo} ${result}`);
                    }
                }
            }
        }
    }

    // Save the matches to a file
    fs.writeFileSync('games_with_results.txt', matches.join('\n'), 'utf-8');
}

function readBets(filePath) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const bets = fileData.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    return new Set(bets);
}

(async () => {
    const betsFilePath = 'file.txt'; // replace with your actual file path
    const betsSet = readBets(betsFilePath);

    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.waitForTimeout(2000);

    await page.goto('https://www.ps3838.com/en/sports/basketball');

    unix = (Math.floor(Date.now() / 1000));
    const soccerResultUrl = 'https://www.ps3838.com/member-service/v2/results/events?sp=29&lg=0&o=LEAGUE&d=2024-05-24&_=' + unix + '&locale=en_US';
    let result = await extractJsonData(page, soccerResultUrl);
    await processResultsData(result, betsSet);

    await browser.close();
})();