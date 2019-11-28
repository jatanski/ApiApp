class BaseModel {
    constructor() {
        this.fetchCurrencies();
        this.fetchSomething();
    }

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
        const response = await fetch(
            `https://gist.githubusercontent.com/Fluidbyte/2973986/raw/255641f9d09bc4973c139b927c0d602106d227ae/Common-Currency.json`
        );
        const currencies = await response.json();
        console.log(currencies);

        const arr = [];
        Object.values(currencies).map(currency => {
            arr.push({ name: currency.name, symbol: currency.code });
        });
        console.log(arr);
        // await this.checkCurrencies(arr);
        return currencies;
    }

    async fetchSomething() {
        const responseJSON = await fetch(`https://min-api.cryptocompare.com/data/v2/cccagg/pairs`);
        const response = await responseJSON.json();
        if (false) {
            console.error("Couldn't fetch price");
            return -1;
        } else {
            console.log(response.Data.pairs);
            const arr = [];
            Object.keys(response.Data.pairs).map(currency => {
                arr.push(currency);
            });
            console.log(arr);
        }
    }

    async checkCurrencies(currencies) {
        console.log(currencies.length);
        for (let i = 0; i < currencies.length; i++) {
            let el = currencies[i].symbol;
            let exists = await this.checkIfExsists(el);
            if (!exists) {
                // console.log(el);
            } else {
                // console.log(el);
            }
        }
    }

    async checkIfExsists(currency) {
        const response = await this.fetchPrice(currency, "USD");
        if (response === -1) {
            console.log(currency + " doesnt exist");
            return false;
        } else {
            return true;
        }
    }
}

export default BaseModel;
