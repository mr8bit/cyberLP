(function ($) {
    $.fn.extend({
        googleAnalyticsChart: function () {
            var $chart = $(this);
            var ctx = $chart.get(0).getContext("2d");
            var $data = $chart.find('.chart-data');
            var $dataItems = $data.find('.chart-data-item');
            var labels = [];
            var data = [];
            $dataItems.each(function () {
                labels.push($(this).data('date'));
                data.push($(this).data('value'));
            });
            console.log($chart.find('.chart-fillColor').css('color'))
            var config = {
                type: 'line',
                data: {
                    labels: labels,

                    datasets: [{
                        data: data,
                        fill: false,
                        backgroundColor: $chart.find('.chart-fillColor').css('color'),
                        borderColor: $chart.find('.chart-strokeColor').css('color'),
                        pointBackgroundColor: $chart.find('.chart-pointColor').css('color'),
                        pointHoverBackgroundColor: $chart.find('.chart-pointHighlightFill').css('color'),
                    }],
                },
                options: {
                    responsive: true,
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false,
                        labels: {
                            fontColor: 'black'
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                               fontColor: 'white',
                                fontFamily: 'Arial, sans-serif',

                                fontSize: 13
                            }
                        }],
                         xAxes: [{
                            ticks: {
                               fontColor: 'white',
                                fontFamily: 'Arial, sans-serif',

                                fontSize: 13
                            }
                        }]
                    },
                }
            };

            window.myLine = new Chart(ctx, config);
        }
    });
})(jet.jQuery);