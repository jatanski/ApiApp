import BaseView from "../views/view";
import BaseModel from "../models/model";
import myChart from "../views/chart";
import displayMatches from "../currenciesSelect"
import { callbackify } from "util";

class MainCtrl {
    constructor() {
        this.view = new BaseView();
        this.model = new BaseModel();

        this.currencies;
        this.currenciesAvailable = false; //if false cant filter coins
        this.error = false;
        this.fetchingData = false;
    }

    async init() {
        //grab supported cryptocurriences (not actual currencies though, those are missing RN)
        this.fetchingData = true;
        this.currencies = await this.model.fetchAllCoinNames();
        if (!this.currencies || this.currencies.length === 0) {
            this.error = true;
            console.error("Unable to fetch supported coins names");
        } else {
            this.currenciesAvailable = true;
            console.log(this.currencies);
        }
        this.fetchingData = false;

        //this is how you grab price to display
        if (this.currenciesAvailable) {
            let price = await this.model.fetchPrice(this.currencies[1].symbol, "USD");
            console.log(price);
        }
    }
}

function selectItem(el, x) {
    underline.style.left = x;
    menuItems.forEach((el, index) => {
        el.classList.remove("select");
    });
    el.classList.add("select");
}

function getScrollPercent() {
  var h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

const underline = document.querySelector(".underline");
const menuItems = document.querySelectorAll(".menuItem");
const sites = document.querySelectorAll(".content");

document.addEventListener('scroll', ()=>{
  let scrollPercent = getScrollPercent();
  if(scrollPercent<25) selectItem(menuItems[0], (scrollPercent / 1.5384 + 5) + '%');
  if(scrollPercent>25) selectItem(menuItems[1], (scrollPercent / 1.5384 + 5) + '%');
  if(scrollPercent>75) selectItem(menuItems[2], (scrollPercent / 1.5384 + 5) + '%');
})

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
