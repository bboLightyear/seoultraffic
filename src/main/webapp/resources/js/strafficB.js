
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