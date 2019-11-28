import BaseView from "../views/view";
import BaseModel from "../models/model";
import { callbackify } from "util";

class MainCtrl {
    constructor() {
        this.view = new BaseView();
        this.model = new BaseModel();
    }

    async init() {
        const currencies = await this.model.fetchData();
        const arr = [];
        console.log(currencies.Data);
        Object.values(currencies.Data).map((coin, index) => {
            arr.push({ name: coin.CoinName, symbol: coin.Name });
        });
        console.log(arr[0]);
        let price = await this.model.fetchPrice(arr[133].symbol, "USD");
        console.log(price);
    }
}

function selectItem(el, x) {
    underline.style.left = x;
    menuItems.forEach((el, index) => {
        el.classList.remove("select");
    });
    el.classList.add("select");
}

const underline = document.querySelector(".underline");
const menuItems = document.querySelectorAll(".menuItem");
const sites = document.querySelectorAll(".content");
menuItems.forEach((el, index) => {
    el.addEventListener("click", () => {
        switch (index) {
            case 0:
                selectItem(el, "5%");
                sites[0].scrollIntoView();
                break;
            case 1:
                selectItem(el, "37.5%");
                sites[1].scrollIntoView();
                break;
            case 2:
                selectItem(el, "70%");
                sites[2].scrollIntoView();
                break;
            default:
                break;
        }
    });
});

export default MainCtrl;
