
var map, mapTypes; 

//지도 생성하는 메소드 오류 가끔 발생하니 load메소드 사용해서 지도 생성
kakao.maps.load(function(){
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5667, 126.978),
        level: 5
    };
    map = new kakao.maps.Map(container, options);
    
    mapTypes = { 
    		traffic :  kakao.maps.MapTypeId.TRAFFIC,
    		bicycle : kakao.maps.MapTypeId.BICYCLE
    };
}); 
// 체크 박스를 선택하면 호출되는 함수
window.onload = function() {
   setOverlayMapTypeId(); // 페이지 로드 시 함수 실행   
};

function setOverlayMapTypeId() {
	var  chkTraffic = document.getElementById('chkTraffic'),
	chkBicycle = document.getElementById('chkBicycle');
	
	// 지도 타입을 제거합니다
	for (var type in mapTypes) {
		map.removeOverlayMapTypeId(mapTypes[type]);    
	}
	
	// 교통정보 체크박스가 체크되어있으면 지도에 교통정보 지도타입을 추가합니다
	if (chkTraffic.checked) {
		map.addOverlayMapTypeId(mapTypes.traffic);    
	}
	
	// 자전거도로정보 체크박스가 체크되어있으면 지도에 자전거도로정보 지도타입을 추가합니다
	if (chkBicycle.checked) {
		map.addOverlayMapTypeId(mapTypes.bicycle);    
	}
	
} 

function bstorageinfo() {
    $.ajax({
        type: "post",
        async: true,
        url: "bstorageinfo",
        success: function(data) {
            console.log("success");
            console.log(data);
			
            //마커 위치 생성하는 곳 대여소 이름과 위경도 받아서 생성
            var positions = [];
            for (var i = 0; i < data.length; i++) {
                positions.push({
                    content: 
                    '<div class="storageinfo">' +
                    '<h3>'+ data[i].stationName + '</h3>' +
                    '<hr>' +
                    '<p>대여소 ID'+ data[i].stationId + '</p>' +
                    '<p>거치대 수 :'+ data[i].rackTotCnt + '</p>' +
                    '<p>거치된 자전거 :'+ data[i].parkingBikeTotCnt +'대 </p>' +
                    '<p>오늘 총 대여수 :'+ data[i].shared + '</p>' +
                    '</div>',
                    latlng: new kakao.maps.LatLng(data[i].stationLatitude, data[i].stationLongitude)
                });
            }
            
            //마커를 생성해내는 곳
            for (var i = 0; i < positions.length; i++) {
                var marker = new kakao.maps.Marker({
                    map: map, // 전역 변수 map 사용
                    position: positions[i].latlng
                });

                var infowindow = new kakao.maps.InfoWindow({
                    content: positions[i].content
                });

                kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
            }
        }
    });
}

function accidentinfo() {
    $.ajax({
        type: "post",
        async: true,
        url: "accidentinfo",
        success: function(data) {
            console.log("성공");
            console.log(data);

            // 마커 위치 생성
            var positions = [];
            for (var i = 0; i < data.length; i++) {
                var geocoder = new kakao.maps.services.Geocoder(); // 좌표 변환 객체 생성
                var wtmX = data[i].grs80TM_X; // 변환할 WTM X 좌표
                var wtmY = data[i].grs80TM_Y; // 변환할 WTM Y 좌표
                var accInfo = data[i].acc_INFO; //사고정보 스크립트

                // WTM 좌표를 WGS84 좌표계로 변환
                geocoder.transCoord(wtmX, wtmY, function(result, status) {
                    // 변환 결과가 정상적으로 완료되면
                    if (status === kakao.maps.services.Status.OK) {
                        // 마커를 생성된 위치에 표시
                    	
                    	var imageSrc = 'resources/img/warn.png', // 마커이미지의 주소입니다    
                        imageSize = new kakao.maps.Size(34, 30), // 마커이미지의 크기입니다
                        imageOption = {offset: new kakao.maps.Point(27, 69)};
                    	
                    	var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
                    	
                        var marker = new kakao.maps.Marker({
                        	image: markerImage,
                            position: new kakao.maps.LatLng(result[0].y, result[0].x), // 마커 위치
                            map: map // 지도 객체
                        });

                        // 정보 윈도우 생성
                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div><h3>' + accInfo + '</h3></div>'
                        });

                        // 마커에 이벤트 리스너 등록
                        kakao.maps.event.addListener(marker, 'mouseover', function() {
                            infowindow.open(map, marker);
                        });

                        kakao.maps.event.addListener(marker, 'mouseout', function() {
                            infowindow.close();
                        });
                    }
                }, {
                    input_coord: kakao.maps.services.Coords.WTM, // 입력 좌표계
                    output_coord: kakao.maps.services.Coords.WGS84 // 출력 좌표계
                });
            }
        }
    });
}


//인포 윈도우 여는 메소드
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}
//인포 윈도우 닫는 메소드
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}


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
