class BaseModel {
    constructor() {}

    async fetchData() {
        const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
        const currency = await response.json();
        console.log(currency);
        return currency;
    }

    async fetchPrice(symbol1, symbol2) {
        const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol1}&tsyms=${symbol2}`);
        const currency = await response.json();
        console.log(currency);
        return currency;
    }
}

export default BaseModel;
