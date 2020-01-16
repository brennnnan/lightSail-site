

var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: '# of Listeners',
            data: [120, 190, 136, 152, 202, 135, 144],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1,
            fill:0,
            lineTension:.2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    color: 'rgba(250, 250, 250, 0.8)',
                    zeroLineColor: 'rgba(250, 250, 250, 0.8)',
                    drawBorder:false,
                }
            }],
            xAxes: [{
                 gridLines: {
                   display: false
                 }
            }]
        }
    }
});