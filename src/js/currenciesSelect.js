import additioncalCurrenciesData from "./currencies_data";

    const currencies = [];

    fetch(additioncalCurrenciesData)
        .then(dot => dot.json())
        .then(data => currencies.push(...data))

    function findMatches(searched, currencies) {
        return currencies.filter(currency => {
            const regex = new RegExp(searched, 'gi');
            return currency.name.match(regex) || currency.symbol.match(regex)
        });
    } 

    function displayMatches() {
        const matchArray = findMatches(this.value, currencies);
        const html = matchArray.map(currency => {
            const regex = new RegExp(this.value, 'gi');
            const currencyName = currency.name.replace(regex, `<span class="h1">${this.value}</span>`);
            const currencySymbol = currency.symbol.replace(regex, `<span class="h1">${this.value}</span>`);
            return `
            <li>
                <span class="name">${currencyName}, ${currencySymbol}</span>
            </li>
            `;
        });
        suggestions.innerHTML = html;
    }

    const searchInput = document.getElementById('currFrom');
    const suggestions = document.querySelectorAll('.suggestions');
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);

    export default displayMatches;
