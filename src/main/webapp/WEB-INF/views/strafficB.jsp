<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Seoul Traffic</title>
<%@ include file="header.jsp" %>
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d97b909cd863aa67602cb221511183bf&autoload=false"></script>

<script>
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
                    content: '<div>' + data[i].stationName + '</div>',
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
</script>
<body>
<div id="map" style="width :100% ;height:600px; position: relative; z-index: 1;"></div>
<input type="button" onclick="bstorageinfo()" value="저장소 위치"/>
<input type="button" value="?"/>
<input type="button" value="?"/>
</body>
</html>