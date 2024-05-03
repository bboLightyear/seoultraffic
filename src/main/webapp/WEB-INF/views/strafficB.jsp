<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Seoul Traffic</title>
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=d97b909cd863aa67602cb221511183bf"></script>
<%@ include file="header.jsp" %>
</head>
<body>
<!-- 지도를 표시할 div 입니다 -->
<div id="map" style="width:100%;height:350px;"></div>

<script>
function initializeMap() {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.kakao && window.kakao.maps) {
        initializeMap();
    } else {
        var checkKakaoInterval = setInterval(function() {
            if (window.kakao && window.kakao.maps) {
                clearInterval(checkKakaoInterval);
                initializeMap();
            }
        }, 100); // 100ms마다 확인
    }
});
</script>
</body>
</html>