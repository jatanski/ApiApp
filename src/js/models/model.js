class BaseModel {
    constructor() {}

    async fetchAllCoinNames() {
        const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
        const data = await response.json();
        if (data.Response !== "Success") {
            return [];
        }

        const currencies = [];
        Object.values(data.Data).map(coin => {
            currencies.push({ name: coin.CoinName, symbol: coin.Name });
        });
        console.log(currencies);

        const additionalCurrencies = await this.fetchCurrencies();

        additionalCurrencies.forEach(currency => {
            let exists = currencies.find(el => {
                // console.log(el.symbol, currency);
                return el.symbol === currency;
            });
            if (!exists) {
                currencies.push({ name: currency, symbol: currency });
            }
        });

        return currencies;
    }

    async fetchPrice(symbol1, symbol2) {
        const responseJSON = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol1}&tsyms=${symbol2}`);
        const response = await responseJSON.json();
        if (!!response.Response) {
            console.error("Couldn't fetch price");
            return -1;
        } else {
            return response[symbol2];
        }
    }

    async fetchCurrencies() {
        const responseJSON = await fetch(`https://min-api.cryptocompare.com/data/v2/cccagg/pairs`);
        const response = await responseJSON.json();
        const currencies = [];
        if (false) {
            console.error("Couldn't fetch price");
            return -1;
        } else {
            console.log(response.Data.pairs);

            Object.keys(response.Data.pairs).map(currency => {
                currencies.push(currency);
            });
            console.log(currencies);
        }
        return currencies;
    }

    // async checkCurrencies(currencies) {
    //     console.log(currencies.length);
    //     for (let i = 0; i < currencies.length; i++) {
    //         let el = currencies[i].symbol;
    //         let exists = await this.checkIfExsists(el);
    //         if (!exists) {
    //             // console.log(el);
    //         } else {
    //             // console.log(el);
    //         }
    //     }
    // }

    // async checkIfExsists(currency) {
    //     const response = await this.fetchPrice(currency, "USD");
    //     if (response === -1) {
    //         console.log(currency + " doesnt exist");
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
}

export default BaseModel;
