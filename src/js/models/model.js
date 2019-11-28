class BaseModel {
    constructor() {}

    async fetchAllCoinNames() {
        const currencies = [];

        //fetch coins from api listing nearly all supported crypto
        const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
        const data = await response.json();
        if (!!data && data.Response !== "Success") {
            console.error("failed to fetch from main source");
            console.log(data);
            return [];
        }
        Object.values(data.Data).map(coin => {
            currencies.push({ name: coin.CoinName, symbol: coin.Name });
        });

        //fetch real currencies
        const realCurrencies = await this.fetchRealCurrencies();
        Object.values(realCurrencies).map(currency => {
            currencies.push({ name: currency.name, symbol: currency.code });
        });

        //fetch some more supported crypto
        const possiblyNewCurrencies = await this.fetchAdditionalCurrencies();
        const additionalCurrencies = [];
        possiblyNewCurrencies.forEach(currency => {
            let exists = currencies.find(el => {
                return el.symbol === currency;
            });
            if (!exists) {
                additionalCurrencies.push({ name: currency, symbol: currency });
            }
        });
        currencies.push(...additionalCurrencies);

        return currencies;
    }

    async fetchPrice(symbol1, symbol2, supressErrors = false) {
        const responseJSON = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol1}&tsyms=${symbol2}`);
        const response = await responseJSON.json();
        if (!!response.Response) {
            if (!supressErrors) {
                console.error("Couldn't fetch price");
            }
            return -1;
        } else {
            return response[symbol2];
        }
    }

    async fetchAdditionalCurrencies() {
        const responseJSON = await fetch(`https://min-api.cryptocompare.com/data/v2/cccagg/pairs`);
        const response = await responseJSON.json();
        const currencies = [];

        if (!response.Data.pairs) {
            console.error("Couldn't fetch prices of additional currencies");
            console.log(response);
            return [];
        } else {
            Object.keys(response.Data.pairs).map(currency => {
                currencies.push(currency);
            });
        }

        return currencies;
    }

    async fetchRealCurrencies() {
        const possibleRealCurrencies = [];
        const response = await fetch(
            `https://gist.githubusercontent.com/Fluidbyte/2973986/raw/255641f9d09bc4973c139b927c0d602106d227ae/Common-Currency.json`
        );
        const currencies = await response.json();
        Object.values(currencies).map(currency => {
            possibleRealCurrencies.push({ name: currency.name, symbol: currency.code });
        });
        const existingCurrencies = await this.checkCurrencies(possibleRealCurrencies);

        return existingCurrencies;
    }

    //checks if currency is supported by api
    async checkCurrencies(currencies) {
        const existingCurrencies = [];
        for (let i = 0; i < currencies.length; i++) {
            let el = currencies[i];
            let exists = await this.checkIfExsists(el.symbol);
            if (exists) {
                existingCurrencies.push(el);
            }
        }

        return existingCurrencies;
    }

    async checkIfExsists(currency) {
        const response = await this.fetchPrice(currency, "USD", true);
        return response !== -1;
    }
}

export default BaseModel;
