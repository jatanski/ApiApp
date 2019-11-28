var Chart = require('chart.js');


var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
            // BTC / Dolar      //tymczasowe sztywne dane
        open: [3693, 3825, 3890, 3785, 3822, 3795, 4040],
        close: [3823, 3885, 3787, 3817, 3791, 4040, 4005],
        high: [3845, 3918, 3893, 3850, 3887, 4090, 4070],
        low: [3629, 3770, 3760, 3732, 3780, 3753, 3964],

        labels: ['1.01', '2.01', '3.01', '4.01', '5.01', '6.01', '7.01'],
        datasets: [{
            label: 'open',
            data: [],
            order: 2,
            backgroundColor: [],
            borderWidth: 1
        }, {    
            label: 'close',
            data: [3823, 3885, 3787, 3817, 3791, 4040, 4005],
            order: 1,
            backgroundColor: 'rgba(0, 0, 0, 0)',
        }, {    
            label: 'high',
            data: [],
            order: 3,
            backgroundColor: 'rgba(0, 0, 0, .8)',
            barPercentage: .15,    
        }, {    
            label: 'low',
            data: [],
            order: 1,
            backgroundColor: 'rgba(0, 0, 0, .8)',
            barPercentage: .15,    
        }]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: false,
                    min: 0,
                }
            }]
        },
        legend: {
            display: false,
        }, 
        tooltips: {
            enabled: false,
            custom: function(tooltipModel) {
                // Tooltip Element
                var tooltipEl = document.getElementById('chartjs-tooltip');

                // Create element on first render
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip';
                    tooltipEl.style.background = 'rgba(0,0,0,.55)';
                    tooltipEl.style.color = 'rgb(255,255,255)';
                    // tooltipEl.style.fontWeight = '550';
                    tooltipEl.style.borderRadius = '5px';
                    tooltipEl.style.border = '1px solid black';
                    tooltipEl.innerHTML = '<table></table>';
                    document.body.appendChild(tooltipEl);
                }

                // Hide if no tooltip
                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = 0;
                    return;
                }

                // Set caret Position
                tooltipEl.classList.remove('above', 'below', 'no-transform');
                if (tooltipModel.yAlign) {
                    tooltipEl.classList.add(tooltipModel.yAlign);
                } else {
                    tooltipEl.classList.add('no-transform');
                }

                function getBody(bodyItem) {
                    return bodyItem.lines;
                }

                // Set Text
                if (tooltipModel.body) {
                    var titleLines = tooltipModel.title || [];
                    var bodyLines = tooltipModel.body.map(getBody);
                    var innerHtml = '<thead>';
                    titleLines.forEach(function(title, i) {
                        innerHtml += '<tr><th>' + title + '</th></tr>';  //nagłowek labela
                        innerHtml += '</thead><tbody>';
                        innerHtml += '<tr><td>' + 'open: ' + 
                        myChart.data.open[tooltipModel.dataPoints[0].index] + '</td></tr>';  
                        innerHtml += '<tr><td>' + 'close: ' + 
                        myChart.data.close[tooltipModel.dataPoints[0].index] + '</td></tr>';  
                        innerHtml += '<tr><td>' + 'higher: ' + 
                        myChart.data.high[tooltipModel.dataPoints[0].index] + '</td></tr>';  
                        innerHtml += '<tr><td>' + 'lower: ' + 
                        myChart.data.low[tooltipModel.dataPoints[0].index] + '</td></tr>';  
                    });

                    innerHtml += '</tbody>';
                    var tableRoot = tooltipEl.querySelector('table');
                    tableRoot.innerHTML = innerHtml;
                }

                // `this` will be the overall tooltip
                var position = this._chart.canvas.getBoundingClientRect();

                // Display, position, and set styles for font
                tooltipEl.style.opacity = 1;
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                tooltipEl.style.pointerEvents = 'none';
            }
        }
    }
});

    //ustawienie początku rysowania osi Y od najmniejszego kursu zaokrąglonego do setek
myChart.options.scales.yAxes[0].ticks.min = Math.round(Math.min(...myChart.data.low)/100)*100;

myChart.data.datasets[0].data = [];
myChart.data.datasets[0].backgroundColor = [];
myChart.data.open.forEach((element, index) => {
    //generowanie danych przez obliczanie roznicy otwarcia/zamknięcia        
    var odds = myChart.data.close[index]
                -  myChart.data.open[index];

    if(odds<0){ //kurs otwarcia > kurs zamknięcia //czerw
        myChart.data.datasets[0].data.push(Math.abs(odds));
        myChart.data.datasets[2].data.push(myChart.data.high[index]-myChart.data.open[index]);
        myChart.data.datasets[3].data.push(myChart.data.close[index]-myChart.data.low[index]);
        myChart.data.datasets[1].data[index] -= myChart.data.datasets[3].data[index];
    }
    else{ //kurs otwarcia < kurs zamknięcia //ziel
        myChart.data.datasets[0].data.push(Math.abs(odds));
        myChart.data.datasets[1].data[index] -= Math.abs(odds);
        myChart.data.datasets[2].data.push(myChart.data.high[index]-myChart.data.close[index]);
        myChart.data.datasets[3].data.push(myChart.data.open[index]-myChart.data.low[index]);
        myChart.data.datasets[1].data[index] -= myChart.data.datasets[3].data[index];
    }

    if(odds<0){ //kurs otwarcia > kurs zamknięcia ? ustaw kolor czerwony
            myChart.data.datasets[0].backgroundColor.push("rgba(191, 33, 47, 0.95)");
        }
    else{ //kurs otwarcia < kurs zamknięcia ? ustaw kolor zielony
            myChart.data.datasets[0].backgroundColor.push("rgba(0, 111, 60, 0.95)");
    }
});
myChart.update();

export default myChart;