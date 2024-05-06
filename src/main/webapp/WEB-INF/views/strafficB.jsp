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
	kakao.maps.load(function(){
		var container = document.getElementById('map');
		var options = {
			center: new kakao.maps.LatLng(37.575789, 126.976777),
			level: 8
		};
		var map = new kakao.maps.Map(container, options);		
		
		//마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
		var positions = [
		    {
		        content: '<div>카카오</div>', 
		        latlng: new kakao.maps.LatLng(33.450705, 126.570677)
		    }
		];
		for (var i = 0; i < positions.length; i ++) {
		    // 마커를 생성합니다
		    var marker = new kakao.maps.Marker({
		        map: map, // 마커를 표시할 지도
		        position: positions[i].latlng // 마커의 위치
		    });
		
		    // 마커에 표시할 인포윈도우를 생성합니다 
		    var infowindow = new kakao.maps.InfoWindow({
		        content: positions[i].content // 인포윈도우에 표시할 내용
		    });
		
		    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
		    // 이벤트 리스너로는 클로저를 만들어 등록합니다 
		    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
		    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
		    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
		}
	});
	
// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}
</script>
<script>
function bstorageinfo() {
	$.ajax({
		type : "post",
		async : true,
		url : "bstorageinfo",

		success : function(data) {
			console.log("success");
			console.log(data);
		}			
	})
}
</script>
<body>
<div id="map" style="width :100% ;height:600px;"></div>
<input type="button" onclick="bstorageinfo()" value="저장소 위치"/>
<input type="button" value="?"/>
<input type="button" value="?"/>
</body>
</html>