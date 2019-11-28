import BaseView from "../views/view";
import { callbackify } from "util";

class MainCtrl {
    constructor() {
        this.view = new BaseView();
    }

    init() {}
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
