const puppeteer = require("puppeteer");

// 브라우져 생성하는 함수
const browser = async () => {
    return await puppeteer.launch({
        headless: false,
        args: ["--window-size-1500,1000"],
        slowMo: 40
    })
}

// 페이지 생성하는 함수 
const newPage = async (Browser, url) => {

    const page = await Browser.newPage();
    // 페이지 사이즈 
    await page.setViewport({
        width: 1500,
        height: 1000
    })

    await Promise.all([
        page.goto(url),
        page.waitForNavigation()
    ])

    // return new Promise(resolve => setTimeout(resolve, 1000))
    
}

module.exports = {
    browser,
    newPage
}