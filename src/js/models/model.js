class BaseModel {
    constructor() {}

    async fetchAllCoinNames() {
        const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
        const data = await response.json();
        if (data.Response !== "Success") {
            return [];
        }

        const currencies = [];
        Object.values(data.Data).map((coin, index) => {
            currencies.push({ name: coin.CoinName, symbol: coin.Name });
        });
        console.log(currencies);
        return currencies;
    }

    async fetchPrice(symbol1, symbol2) {
        const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol1}&tsyms=${symbol2}`);
        const currency = await response.json();
        console.log(currency);
        return currency;
    }
}

export default BaseModel;
