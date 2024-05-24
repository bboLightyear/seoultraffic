let myChart = null; // 전역 변수로 선언

function accidatareg(year) {
    let myCt = document.getElementById('accidataregcanvas').getContext('2d');
    
    let accidataregdiv = document.getElementById('accidataregdiv');
    let accidatatotdiv = document.getElementById('accidatatotdiv');
    let accidatadiv = document.getElementById('accidatadiv');
    
    $.ajax({
        type: "post",
        async: true,
        url: "accidatareg/" + year,
        success: function(data) {
            console.log("성공");
            console.log(data);
            
            accidataregdiv.style.display = 'block';
            accidatatotdiv.style.display = 'none';
            accidatadiv.style.display = 'none';
            
            // 연도별 데이터를 저장할 배열 초기화
            let reg = [];
            let acciData = [];
            let injuredData = [];
            let deathsData = [];
            
            // 데이터 순회하며 연도별 데이터 추출
            data.forEach(item => {
                reg.push(item.reg);
                acciData.push(item.acci);
                injuredData.push(item.injured);
                deathsData.push(item.deaths);
            });
            
            // 이전 차트가 존재하면 파괴
            if (myChart) {
                myChart.destroy();
            }

            // 차트 데이터 설정
            myChart = new Chart(myCt, {
                data: {
                    labels: reg,
                    datasets: [
                        {
                            label: '총 사고건수',
                            data: acciData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            type: 'bar',
                            yAxisID: 'y1'
                        },
                        {
                            label: '총 부상자 (명)',
                            data: injuredData,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            type: 'bar',
                            yAxisID: 'y1'
                        },
                        {
                            label: '총 사망자 (명)',
                            data: deathsData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            type: 'line',
                            yAxisID: 'y2' // 두 번째 Y축에 연결
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                id: 'y1',
                                type: 'linear',
                                position: 'left',
                                ticks: {
                                    beginAtZero: true,
                                    callback: function(value) { return value.toLocaleString(); }
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Accidents and Injuries'
                                }
                            },
                            {
                                id: 'y2',
                                type: 'linear',
                                position: 'right', // 이 부분을 수정함
                                ticks: {
                                    beginAtZero: true,
                                    callback: function(value) { return value.toLocaleString(); }
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Deaths'
                                }
                            }
                        ],
                        xAxes: [{
                            ticks: {
                                callback: function(value) { return value.toLocaleString(); }
                            }
                        }]
                    }
                }
            });
        },
        error: function(error) {
            console.log("실패", error);
        }
    });
}