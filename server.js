const puppeteer = require('puppeteer');


( async()=>{
console.log('starting...');
console.log('puppeteer',puppeteer);

const browser = await puppeteer.launch({
    headless:false,
    args:['--window-size-1920,1080'],
    slowMo:30,
})

const page = await browser.newPage();  //크롬에서 탭을 생성

await Promise.all([
    page.goto("http://www.naver.com"),  //생성한 탭에 naver 페이지 열기
    page.waitForNavigation()  //위 페이지가 로드 될때까지 기다려라. 위에랑 셋트
])

await page.waitForTimeout(3000);  // 3초간 기다려라

await page.close();  // 페이지를 닫아라
})()