
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

/*function accidentinfo() {
    $.ajax({
        type: "post",
        async: true,
        url: "accidentinfo",
        success: function(data) {
            console.log("success");
            console.log(data);

            //마커 위치 생성하는 곳 대여소 이름과 위경도 받아서 생성
            var positions = [];
            for (var i = 0; i < data.length; i++) {

                var geocoder = new kakao.maps.services.Geocoder(), // 좌표계 변환 객체를 생성합니다
                    wtmX = data[i].grs80TM_X, // 변환할 WTM X 좌표 입니다
                    wtmY = data[i].grs80TM_Y; // 변환할 WTM Y 좌표 입니다

                // WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
                geocoder.transCoord(wtmX, wtmY, transCoordCB, {
                    input_coord: kakao.maps.services.Coords.WTM, // 변환을 위해 입력한 좌표계 입니다
                    output_coord: kakao.maps.services.Coords.WGS84 // 변환 결과로 받을 좌표계 입니다 
                });

                // 마커 생성을 위한 데이터를 positions 배열에 추가합니다.
                // latlng 값은 아직 알 수 없으므로 null로 설정합니다.
                positions.push({
                    content: '<div><h3>' + data[i].acc_INFO + '</h3></div>',
                    latlng: null
                });
            }

            // transCoord 콜백 함수
            function transCoordCB(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    // 좌표 변환에 성공한 경우 해당 위경도를 positions 배열에 업데이트합니다.
                    positions[i].latlng = new kakao.maps.LatLng(result[0].y, result[0].x);
                    createMarker(positions[i]); // 마커 생성 함수 호출
                } else {
                    console.log('TM 좌표를 WGS84 좌표로 변환하는 데 실패했습니다.');
                }
            }

            // 마커를 생성하는 함수
            function createMarker(position) {
                var marker = new kakao.maps.Marker({
                    map: map, // 전역 변수 map 사용
                    position: position.latlng
                });

                var infowindow = new kakao.maps.InfoWindow({
                    content: position.content
                });

                kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
            }
        }
    });
}*/

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