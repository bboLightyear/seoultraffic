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
<body>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d97b909cd863aa67602cb221511183bf&autoload=false"></script>
	<script>
		
		kakao.maps.load(function(){
			var container = document.getElementById('map');
			var options = {
				center: new kakao.maps.LatLng(37.575789, 126.976777),
				level: 8
			};
			var map = new kakao.maps.Map(container, options);			
		});
	</script>
<div id="map" style="width :100% ;height:600px;"></div>
</body>
</html>