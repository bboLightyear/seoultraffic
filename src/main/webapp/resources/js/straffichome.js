$(document).ready(function() {
    // 사고 정보를 로드하고 표시하는 함수
    function accinfo() {
        $.ajax({
            type: "post",
            async: true,
            url: "accidentinfo",
            success: function(data) {
                console.log("사고 정보 로드 성공");
                console.log(data);

                displayAccidentInfo(data);

                $('input[name="accinfo"]').on('change', function() {
                    filterAccidentInfo(data, $(this).attr('id'));
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading accident info:", status, error);
            }
        });
    }

    // 날씨 정보를 로드하는 함수
    function weatherinfo() {
    	
    	var weatherinfodiv = document.getElementById("weatherinfodiv");
        var htmlText = "";
    	
        $.ajax({
            type: "post",
            async: true,
            url: "weatherinfo",
            success: function(data) {
                console.log("날씨 정보 로드 성공");
                console.log(data);
            	
                if (Array.isArray(data) && data.length > 0) {
                var weatherData = data[0];
                htmlText += "<li>";
                htmlText += "<strong>날씨:</strong>" + weatherData.description + "<br>";
                htmlText += "<strong>기온:</strong>" + weatherData.temp + "<br>";
                htmlText += "<strong>최저기온:</strong>" + weatherData.temp_min + "<br>";
                htmlText += "<strong>최고기온:</strong>" + weatherData.temp_max + "<br>";
                htmlText += "<strong>지역:</strong>" + weatherData.name;
                htmlText += "</li>";
            
                } else {
                    htmlText += "<li>날씨 정보를 불러오지 못했습니다.</li>";
                }
                
                $(weatherinfodiv).append(htmlText);
            },
            error: function(xhr, status, error) {
                console.error("Error loading weather info:", status, error);
            }
        });
    }

    // 사고 정보를 표시하는 함수
    function displayAccidentInfo(data) {
        var accinfodiv = document.getElementById("accinfodiv");
        var htmlText = "";

        // 데이터가 배열인지 확인
        if (Array.isArray(data)) {
            // 데이터가 배열일 경우
            for (var i = 0; i < data.length; i++) {
                var accidentData = data[i];
                htmlText += "<li data-type=" + accidentData.acc_TYPE + ">";
                htmlText += "<strong>사고 ID:</strong>" + accidentData.acc_ID + "<br>";
                htmlText += "<strong>정보:</strong>" + accidentData.acc_INFO + "<br>";
                htmlText += "<strong>예상 종료일:</strong>" + accidentData.exp_CLR_DATE + "<br>";
                htmlText += "<strong>예상 종료 시간:</strong>" + accidentData.exp_CLR_TIME;
                htmlText += "</li>";
            }
        } else {
            // 데이터가 배열이 아닌 경우 (하나의 객체)
            var accidentData = data;
            htmlText += "<li data-type=" + accidentData.acc_TYPE + ">";
            htmlText += "<strong>사고 ID:</strong>" + accidentData.acc_ID + "<br>";
            htmlText += "<strong>정보:</strong>" + accidentData.acc_INFO + "<br>";
            htmlText += "<strong>예상 종료일:</strong>" + accidentData.exp_CLR_DATE + "<br>";
            htmlText += "<strong>예상 종료 시간:</strong>" + accidentData.exp_CLR_TIME;
            htmlText += "</li>";
        }

        $(accinfodiv).find("ul").append(htmlText);
    }

    // 사고 정보를 필터링하는 함수
    function filterAccidentInfo(data, filter) {
        let filteredData = [];
        if (filter === 'allaccident') {
            filteredData = data;
        } else if (filter === 'accident') {
            filteredData = data.filter(item => item.acc_TYPE.startsWith("A01") || item.acc_TYPE.startsWith("A02") || item.acc_TYPE.startsWith("A03") || item.acc_TYPE.startsWith("A06") || item.acc_TYPE.startsWith("A07"));
        } else if (filter === 'construction') {
            filteredData = data.filter(item => item.acc_TYPE.startsWith("A04") || item.acc_TYPE.startsWith("A10"));
        } else if (filter === 'weather') {
            filteredData = data.filter(item => item.acc_TYPE.startsWith("A05") || item.acc_TYPE.startsWith("A08") || item.acc_TYPE.startsWith("A09"));
        }

        clearAccidentInfo(); // 리스트 초기화
        displayAccidentInfo(filteredData);
    }

    // 사고 정보를 초기화하는 함수
    function clearAccidentInfo() {
        $("#accinfodiv ul").empty(); // 리스트 내용 비움
    }

    // 두 함수 호출
    accinfo();
    weatherinfo();
});

//사고정보 열어주는 div
/*function accidata() {
    let myCt = document.getElementById('accidatacanvas');
    
    $.ajax({
        type: "post",
        async: true,
        url: "accidata",
        success: function(data) {
            console.log("성공");
            console.log(data);
            
            // 연도별 데이터를 저장할 배열 초기화
            let years = [];
            let acciData = [];
            let injuredData = [];
            let deathsData = [];
            
            // 데이터 순회하며 연도별 데이터 추출
            data.forEach(item => {
                years.push(item.year);
                acciData.push(item.acci);
                injuredData.push(item.injured);
                deathsData.push(item.deaths);
            });
            
            // 차트 데이터 설정
            let myChart = new Chart(myCt, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [
                        {
                            label: 'Accidents',
                            data: acciData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Injuries',
                            data: injuredData,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Deaths',
                            data: deathsData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            type: 'line',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        error: function(error) {
            console.log("실패", error);
        }
    });
}*/
function accidata() {
    let myCt = document.getElementById('accidatacanvas').getContext('2d');
    
    $.ajax({
        type: "post",
        async: true,
        url: "accidata",
        success: function(data) {
            console.log("성공");
            console.log(data);
            
            // 연도별 데이터를 저장할 배열 초기화
            let years = [];
            let acciData = [];
            let injuredData = [];
            let deathsData = [];
            
            // 데이터 순회하며 연도별 데이터 추출
            data.forEach(item => {
                years.push(item.year);
                acciData.push(item.acci);
                injuredData.push(item.injured);
                deathsData.push(item.deaths);
            });
            
            // 차트 데이터 설정
            let myChart = new Chart(myCt, {
                data: {
                    labels: years,
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
                            label: '부상자 (명)',
                            data: injuredData,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            type: 'bar',
                            yAxisID: 'y1'
                        },
                        {
                            label: '사망자 (명)',
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
