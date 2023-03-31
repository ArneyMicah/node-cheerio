const axios = require('axios'); // 引入axios
const cheerio = require('cheerio'); // 引入cheerio
const download = require('download'); // 引入download
const webUrl = 'https://www.tuiimg.com/meinv/' // 爬取目标网站
let pageNum = 4; // 爬取当前页数，默认为第一页
// 解析页面信息
const getHtml = async (url) => {
    try {
        let res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
// 获取页面内容
const getWebInfo = async (url, pageNum) => {
    let imgUrl = url + 'list_' + pageNum + '.html';
    let html = await getHtml(imgUrl);
    let $ = cheerio.load(html);
    let imageList = []
    $('.beauty').find('ul li').each((index, item) => {
        let id = index + 1;
        let imageInfo = $(item).find('a img').attr('src');
        let title = $(item).find('a img').attr('alt');
        let url = $(item).find('a').attr('href');
        let imgInfo = {
            id,
            imageInfo,
            title,
            url
        }
        imageList.push(imgInfo)
    })
    imageList.forEach((item, index) => {
        setTimeout(() => {
            getImage(item.url, item.title)
        }, index * 1000)
    })
    return imageList;
}
// 下载图片信息
console.log('===========开始下载===========');
const getImage = async (url, title) => {
    let html = await getHtml(url);
    let $ = cheerio.load(html);
    let pageNum = $('#allbtn').text().match(/\d+/g)[1]
    let image = []
    for (let i = 1; i <= pageNum; i++) {
        let basrUrl = url.replace('www.tuiimg.com', 'i.tuiimg.net/006').replace('meinv/', '');
        image.push({ imageUrl: basrUrl + i + '.jpg' })
    }
    try {
        await Promise.all(image.map(async (item) => {
            let image = await download(item.imageUrl, 'images/' + title);
            console.log(`正在下载: ${item.imageUrl} 文件名称: ${title}`);
        }))
        console.log('===========下载完成===========');
    } catch (error) {
        console.error(error);
        return false;
    }
    return image;
}
(async () => {
    await getWebInfo(webUrl, pageNum);
})();