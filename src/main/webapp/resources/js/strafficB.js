
var map; 

//지도 생성하는 메소드 오류 가끔 발생하니 load메소드 사용해서 지도 생성
kakao.maps.load(function(){
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.575789, 126.976777),
        level: 8
    };
    map = new kakao.maps.Map(container, options);
});

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