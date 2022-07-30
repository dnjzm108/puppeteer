const { browser, newPage } = require('./puppeteer')
const { urls } = require("./urls");

const sliceArray = (arr, size) => {
    //원하는 사이즈로 자르고 담을 배열
    const result = [];
    // 자를 시점을 체크하기 위한 변수
    let start = 0;

    // 배열의 사이즈 보다 작을 때만 작동
    while (start < arr.length) {
        // 사이즈 만큼 자르기 
        const cut = arr.slice(start, start + size)
        result.push(cut)
        // 자른 사이즈 만큼 start 숫자 더해주기
        start += size;
    }
    return result;
}

(async () => {
    const Browser = await browser();
    const size = 4;

    const cutting = sliceArray(urls, size);

    // cutting 배열 만큼 반복문 돌리기 
    for (link of cutting) {
        try {
// 사이즈 만큼 나눠진 url 페이지 열어서 작동 
            const test = link.map(async (link) => {
                return await newPage(Browser, link)
            })

            await Promise.all(test)

        } catch (e) {
            // 에러가 나도 계속 진행하기 위해 try 문 사용
            console.log(e);
            continue
        }
    }
})()