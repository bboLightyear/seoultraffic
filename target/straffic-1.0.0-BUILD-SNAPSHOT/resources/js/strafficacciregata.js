let myChart = null; // 전역 변수로 선언

function accidatareg(year) {
    let myCt = document.getElementById('accidataregcanvas').getContext('2d');
    
    let accidataregdiv = document.getElementById('accidataregdiv');
    let accidatatotdiv = document.getElementById('accidatatotdiv');
    let accidatadiv = document.getElementById('accidatadiv');
    let waccidatadiv = document.getElementById('waccidatadiv');
    let accidatabtn = document.getElementById('accidatabtn');
    
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
            accidatabtn.style.display = 'none';
/*            waccidatadiv.style.display = 'none';*/
            
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

function trafficspeeddata(year) {
    let myCt = document.getElementById('speeddatacanvas').getContext('2d');

    let accidataregdiv = document.getElementById('accidataregdiv');
    let accidatatotdiv = document.getElementById('accidatatotdiv');
    let accidatadiv = document.getElementById('accidatadiv');
    let speeddatadiv = document.getElementById('speeddatadiv');

    $.ajax({
        type: "post",
        async: true,
        url: "trafficspeeddata/" + year,
        success: function(data) {
            console.log("성공");
            console.log(data);  // 데이터가 제대로 들어오는지 확인

            speeddatadiv.style.display = 'block';

            accidataregdiv.style.display = 'none';
/*            accidatatotdiv.style.display = 'none';
            accidatadiv.style.display = 'none';*/
            waccidatadiv.style.display = 'none';

            // 연도별 데이터를 저장할 배열 초기화
			let sdate = [];
			let avg = [];
			let gangnam = [];
			let gangbuk = [];
			let jongno_gu = [];
			let jung_gu = [];
			let yongsan_gu = [];
			let seongdong_gu = [];
			let gwangjin_gu = [];
			let dongdaemun_gu = [];
			let jungnang_gu = [];
			let seongbuk_gu = [];
			let gangbuk_gu = [];
			let dobong_gu = [];
			let nowon_gu = [];
			let eunpyeong_gu = [];
			let seodaemun_gu = [];
			let mapo_gu = [];
			let yangcheon_gu = [];
			let gangseo_gu = [];
			let guro_gu = [];
			let geumcheon_gu = [];
			let yeongdeungpo_gu = [];
			let dongjak_gu = [];
			let gwanak_gu = [];
			let seocho_gu = [];
			let gangnam_gu = [];
			let songpa_gu = [];
			let gangdong_gu = [];

            // 데이터 순회하며 연도별 데이터 추출
            data.forEach(item => {
                sdate.push(item.date);
                avg.push(item.avg);
                gangnam.push(item.gangnam);
                gangbuk.push(item.gangbuk);
                jongno_gu.push(item.jongno_gu);
                jung_gu.push(item.jung_gu);
                yongsan_gu.push(item.yongsan_gu);
                seongdong_gu.push(item.seongdong_gu);
                gwangjin_gu.push(item.gwangjin_gu);
                dongdaemun_gu.push(item.dongdaemun_gu);
                jungnang_gu.push(item.jungnang_gu);
                seongbuk_gu.push(item.seongbuk_gu);
                gangbuk_gu.push(item.gangbuk_gu);
                dobong_gu.push(item.dobong_gu);
                nowon_gu.push(item.nowon_gu);
                eunpyeong_gu.push(item.eunpyeong_gu);
                seodaemun_gu.push(item.seodaemun_gu);
                mapo_gu.push(item.mapo_gu);
                yangcheon_gu.push(item.yangcheon_gu);
                gangseo_gu.push(item.gangseo_gu);
                guro_gu.push(item.guro_gu);
                geumcheon_gu.push(item.geumcheon_gu);
                yeongdeungpo_gu.push(item.yeongdeungpo_gu);
                dongjak_gu.push(item.dongjak_gu);
                gwanak_gu.push(item.gwanak_gu);
                seocho_gu.push(item.seocho_gu);
                gangnam_gu.push(item.gangnam_gu);
                songpa_gu.push(item.songpa_gu);
                gangdong_gu.push(item.gangdong_gu);
            });

            console.log(sdate);  // 날짜 데이터 확인
            console.log(jongno_gu);  // 종로구 데이터 확인
            console.log(jung_gu);  // 중구 데이터 확인

            // 이전 차트가 존재하면 파괴
            if (myChart) {
                myChart.destroy();
            }

            // 차트 데이터 설정
            myChart = new Chart(myCt, {
                type: 'line', // 차트 타입을 'line'으로 설정
                data: {
                    labels: sdate,
                    datasets: [
                        {
                            label: '종로구 속도',
                            data: jongno_gu,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '중구 속도',
                            data: jung_gu,
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '용산구 속도',
                            data: yongsan_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '성동구 속도',
                            data: seongdong_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '광진구 속도',
                            data: gwangjin_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '동대문구 속도',
                            data: dongdaemun_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '중랑구 속도',
                            data: jungnang_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '성북구 속도',
                            data: seongbuk_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '강북구 속도',
                            data: gangbuk_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '도봉구 속도',
                            data: dobong_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '노원구 속도',
                            data: nowon_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '은평구 속도',
                            data: eunpyeong_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '서대문구 속도',
                            data: seodaemun_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '마포구 속도',
                            data: mapo_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '양천구 속도',
                            data: yangcheon_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '구로구 속도',
                            data: guro_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '금천구 속도',
                            data: geumcheon_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '영등포구 속도',
                            data: yeongdeungpo_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '동작구 속도',
                            data: dongjak_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '관악구 속도',
                            data: gwanak_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '서초구 속도',
                            data: seocho_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '강남구 속도',
                            data: gangnam_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '송파구 속도',
                            data: songpa_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        },
                        {
                            label: '강동구 속도',
                            data: gangdong_gu,
                            backgroundColor: 'rgba(25, 159, 64, 0.2)',
                            borderColor: 'rgba(255, 159, 64, 1)',
                            borderWidth: 1,
                            fill: false
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                parser: 'yyyy. MM',  // 날짜 형식 확인
                                tooltipFormat: 'MMM yyyy',
                                unit: 'month',
                                displayFormats: {
                                    month: 'MMM yyyy'
                                }
                            },
                            title: {
                                display: true,
                                text: '날짜'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: '속도 (km/h)'
                            }
                        }
                    }
                }
            });
        },
        error: function(error) {
            console.log("실패", error);
        }
    });
}