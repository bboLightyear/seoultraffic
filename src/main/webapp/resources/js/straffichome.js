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
                htmlText += "<div class='weatherdatadiv'>";
                htmlText += "<p style='text-align: center;'><strong>지역&nbsp;</strong>" + weatherData.name + "</p>";

                htmlText += "<div class='weatherdatadiv2'>";
                
                htmlText += "<div style='width:140px;'><p class='weatherp' style='margin-top:0;'><strong>날씨&nbsp;</strong>" + weatherData.description + "</p>";
                htmlText += "<p class='weatherp'><strong>기온&nbsp;</strong>" + weatherData.temp + "&nbsp;ºC</p></div>";
                htmlText += "<div style='width:140px;'><p class='weatherp' style='margin-top:0;'><strong>최저&nbsp;</strong>" + weatherData.temp_min + "&nbsp;ºC</p>";
                htmlText += "<p class='weatherp'><strong>최고&nbsp;</strong>" + weatherData.temp_max + "&nbsp;ºC</p></div>";

                htmlText += "</div>";
                htmlText += "</div>";
            
                } else {
                    htmlText += "<h4>날씨 정보를 불러오지 못했습니다.</h4>";
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
                
                var imgSrc;
                
                switch (accidentData.acc_TYPE) {
                    case 'A01':
                        imgSrc = 'resources/img/A01.png';
                        break;
                    case 'A02':
                        imgSrc = 'resources/img/A02.png';
                        break;
                    case 'A03':
                        imgSrc = 'resources/img/A03.png';
                        break;
                    case 'A04':
                    	imgSrc = 'resources/img/A04.png';
                    	break;
                    case 'A05':
                    	imgSrc = 'resources/img/A05.png';
                    	break;
                    case 'A06':
                    	imgSrc = 'resources/img/A06.png';
                    	break;
                    case 'A07':
                    	imgSrc = 'resources/img/A07.png';
                    	break;
                    case 'A08':
                    	imgSrc = 'resources/img/A08.png';
                    	break;
                    case 'A09':
                    	imgSrc = 'resources/img/A09.png';
                    	break;
                    case 'A10':
                    	imgSrc = 'resources/img/A10.png';
                    	break;
                    case 'A11':
                    	imgSrc = 'resources/img/A11.png';
                    	break;
                    case 'A12':
                    	imgSrc = 'resources/img/A12.png';
                    	break;
                    
                    default:
                        imgSrc = 'resources/img/default.png';
                }
                
                htmlText += "<div data-type=" + accidentData.acc_TYPE + ">";

                htmlText += "<div style='display:flex;'>" +
                		"<span style='display:flex; align-items: center;'>" +
                		"<img style='width:32px; height:32px;' src='" + imgSrc + "' alt='" + accidentData.acc_TYPE + "'></span>";
                
                htmlText += "<p style='margin-bottom:0; margin-left:10px;'><strong>정보:</strong>" + accidentData.acc_INFO + "</p></div>";
                htmlText += "<div style='text-align:right; margin-right:10px;'><strong>예상 종료일:</strong>" + accidentData.exp_CLR_DATE + "<br>";
                htmlText += "<strong>예상 종료 시간:</strong>" + accidentData.exp_CLR_TIME;
                htmlText += "</div></div>";
            }
        } else {
            // 데이터가 배열이 아닌 경우 (하나의 객체)
            var accidentData = data;
            

            htmlText += "<div data-type=" + accidentData.acc_TYPE + ">";
            
            htmlText += "<img src='" + imgSrc + "' alt='" + accidentData.acc_TYPE + "'>";

            htmlText += "<p><strong>정보:</strong>" + accidentData.acc_INFO + "</p>";
            htmlText += "<strong>예상 종료일:</strong>" + accidentData.exp_CLR_DATE + "<br>";
            htmlText += "<strong>예상 종료 시간:</strong>" + accidentData.exp_CLR_TIME;
            htmlText += "</div>";
        }

        $(accinfodiv).find("div").append(htmlText);
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


function accidata() {
    let myCt = document.getElementById('accidatacanvas').getContext('2d');
    let accidatadiv = document.getElementById('accidatadiv');
    let waccidatadiv = document.getElementById('waccidatadiv');
    let accidatabtn = document.getElementById('accidatabtn');
    let speeddatadiv = document.getElementById('speeddatadiv');
    
    $.ajax({
        type: "post",
        async: true,
        url: "accidata",
        success: function(data) {
            console.log("성공");
            console.log(data);
            
            accidatadiv.style.display = 'block';
            waccidatadiv.style.display = 'block';
            accidatabtn.style.display = 'block';
            speeddatadiv.style.display = 'none';
            
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
                            label: '평균 사고건수',
                            data: acciData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            type: 'bar',
                            yAxisID: 'y1'
                        },
                        {
                            label: '평균 부상자 (명)',
                            data: injuredData,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                            type: 'bar',
                            yAxisID: 'y1'
                        },
                        {
                            label: '평균 사망자 (명)',
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

function accidatatot() {
	let myCt = document.getElementById('accidatatotcanvas').getContext('2d');
	let accidatatotdiv = document.getElementById('accidatatotdiv');
	
	$.ajax({
		type: "post",
		async: true,
		url: "accidatatot",
		success: function(data) {
			console.log("성공");
			console.log(data);
			
			accidatatotdiv.style.display = 'block';
			
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