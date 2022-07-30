const puppeteer = require('puppeteer');
const cheerio = require("cheerio");

(async () => {

    console.log("starting...");

    const browser = await puppeteer.launch({
        headless: false,
        args: ["--window-size-1200,1000"],
        slowMo: 40
    })

    const page = await browser.newPage()
    await page.setViewport({
        width: 1200,
        height: 1000
    })

    await Promise.all([
        page.goto("https://www.goodchoice.kr/product/search/2"),
        page.waitForNavigation()
    ])

    // page HTML 가져오기
    const content = await page.content();
    //  $ 에 cheerido를 로드
    const $ = cheerio.load(content);
    // Selector 로 리스트 모두 가져오기 
    const lists = $("#poduct_list_area > li");

    lists.each((index, list) => {
        // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector 로 가져와 테스트 값을 가져옴
        const name = $(list).find("a>div>div.name>strong").text();
        console.log({
            index, name
        });
    })

    // await page.waitForTimeout(3000)
    await page.close()
})()