const { NseIndia } =  require("stock-nse-india");
const fs = require('fs');

const  nseIndia = new  NseIndia()

var symbolsList = []
var selectedStocks = []
// To get all symbols from NSE
/*nseIndia.getAllStockSymbols().then(symbols  => {
    symbolsList.push(symbols)
    console.log(symbols)
})

fs.writeFileSync('symbols.json', JSON.stringify(symbolsList), (err) => {
    if (err) throw err;
    console.log('Data written to symbols.json');
  });*/

const execute = async () => {
    const symbols = await nseIndia.getAllStockSymbols().then(symbols  => {
        symbolsList = symbols
        console.log(symbols)
    })
}



/*execute().then(() =>{
    fs.writeFileSync('symbols.json', JSON.stringify(symbolsList), (err) => {
        if (err) throw err;
        console.log('Data written to symbols.json');
    });
})*/

const getDetails = async () => {
    execute().then(() =>{
        var count = 0;
        const promises = symbolsList.map(element => {
            return nseIndia.getEquityDetails(element).then(details => {
                let data = {};
                const val = (details['priceInfo']['lastPrice'] - details['priceInfo']['previousClose']) / details['priceInfo']['previousClose'] * 100;
                data['symbol'] = details['info']['symbol'];
                data['name'] = details['info']['companyName'];
                data['time'] = details['metadata']['lastUpdateTime']
                data['total_buy_qty'] = details['preOpenMarket']['totalBuyQuantity']
                data['total_sell_qty'] = details['preOpenMarket']['totalSellQuantity']
                data['price'] = details['priceInfo']['lastPrice'];
                data['change'] = val;
                count++;
                if (val >= 2) {
                    data['state'] = "Accepted"
                    selectedStocks.push(data);
                    console.log(data);
                    console.log("- - - - - "+count+" - - - - -")
                }else{
                    data['state'] = "Rejected"
                    selectedStocks.push(data);
                    console.log(data);
                    console.log("- - - - - "+count+" - - - - -")
                }
            });
        });
        
        Promise.all(promises).then(() => {
            /*fs.writeFileSync('selectedStocks.json', JSON.stringify(selectedStocks), (err) => {
                if (err) throw err;
                console.log('Data written to selectedStocks.json');
            });*/
            return selectedStocks;
        }).catch(error => {
            console.error("Error:", error);
            return error;
        });
    })
}

// To get equity details for specific symbol
/*nseIndia.getEquityDetails('JSWSTEEL').then(details  => {
console.log(details)
})*/

module.exports = {
    getDetails,
    selectedStocks
}