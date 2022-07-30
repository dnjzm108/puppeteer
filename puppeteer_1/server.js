const puppeteer = require('puppeteer');


(async () => {
    console.log('starting...');
    // console.log('puppeteer',puppeteer);

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size-1920,1080'],
        slowMo: 30,
    })

    const page = await browser.newPage();  //크롬에서 탭을 생성

    await page.setViewport({
        width: 1580,
        height: 1050
    })
    await Promise.all([
        page.goto("http://www.naver.com"),  //생성한 탭에 naver 페이지 열기
        page.waitForNavigation()  //위 페이지가 로드 될때까지 기다려라. 위에랑 셋트
    ])

    let target = "//span[text()='쇼핑']/ancestor::a";
    // await page.waitForTimeout(3000) //이 함수를 쓰게 되면 무조건 3초를 기다린 후에 다음이 실행된다.
    await page.waitForXPath(target)  //로딩되고 target이 잡힌두 넘어간다. 디폴트로 최대 30초 가되어 있다. 변경도 가능. 
    let s = await page.$x(target) //같은게 여러게 있을 수 있으므로 배열로 값을 반환하게 된다.
    s = s[0]


    await Promise.all([
        await s.click(),  //클릭 이벤트 추가 
        page.waitForNavigation()
    ])

    target = "//ul[@id='categoryListPage1']/li/button";
    await page.waitForXPath(target)
    s = await page.$x(target)

    for (item of s) {
        const value = await item.evaluate(el => el.textContent);
        console.log('value', value.trim()); //공백이 있으므로 trim 을 써서 공백을 없앤다.
    }

    target = "//input[@title='검색어 입력']";
    await page.waitForXPath(target)
    s = await page.$x(target)
    s = s[0]
    await s.type('양말')

    target = "//button[@class='_searchInput_button_search_1n1aw']";
    await page.waitForXPath(target)
    s = await page.$x(target)
    s = s[0]
    await s.click()


    await page.waitForTimeout(3000);  // 3초간 기다려라

    await page.close();  // 페이지를 닫아라
})()