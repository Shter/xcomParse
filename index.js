var request = require("request"),
    cheerio = require('cheerio');
    Excel = require('exceljs');
    fileBook = new Excel.Workbook()
    sheet = fileBook.addWorksheet('test')
    listL = [ 'https://www.xcom-shop.ru/catalog/kompyutery_i_noytbyki/']/*,
        'https://www.xcom-shop.ru/catalog/kompyuternye_komplektyyuschie/']
        'https://www.ttn.by/appliances',
        'https://www.ttn.by/beauty_and_health',
        'https://www.ttn.by/construction_and_repair',
        'https://www.ttn.by/household_products',
        'https://www.ttn.by/crockery_and_cutlery',
        'https://www.ttn.by/products_for_children',
        'https://www.ttn.by/garden',
        'https://www.ttn.by/sport_and_leisure',
        'https://www.ttn.by/everything_for_the_office',
        'https://www.ttn.by/car_goods' ]*/
    listLinks = []
    listTitles = []
    listPrices = []
    page = 1

for (var i=0; i <= listL.length-1; ++i){
    getValues(listL[i])
    //console.log(listLL)
}

function getValues(listOfLinks) {
    request(listOfLinks, function (error, response, body) {
        const $ = cheerio.load(body)
        bodyForTitleAndLinks = $('div.name').children()
        bodyForPrices = $('div.new')
        parametr = $('div.navigation.block-universal.clear.gray')[0]
        for (var n=0; n <= bodyForTitleAndLinks.length-1; ++n){
            listLinks.push('https://www.xcom-shop.ru/' + bodyForTitleAndLinks[n].attribs.href)
            listTitles.push(bodyForTitleAndLinks[n].attribs.title)
            listPrices.push(bodyForPrices[n].children[0].data)
        }
        page++
        if(parametr !== undefined){
            getValues(listOfLinks + '?list_page=' + page)
            console.log(listTitles)
        }
        //console.log(page)
        /*function writeToFile() {
            i = 1
            var cell = sheet.getCell('A'+(i+1))
            cell.value = titleName
            var cell = sheet.getCell('B'+(i+1))
            cell.value = link
            var cell = sheet.getCell('C'+(i+1))
            cell.value = price
        }

        writeToFile();

        fileBook.xlsx.writeFile('Парсер Xcom.xlsx')*/
    });

}