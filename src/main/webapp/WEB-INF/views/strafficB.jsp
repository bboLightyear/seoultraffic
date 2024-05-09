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
<script type="text/javascript" src="resources/js/strafficB.js"></script>
<link rel="stylesheet" href="resources/css/straffic.css" />

<body>
<div style="">
	<div style="width: 80px; height: 600px; background-color: #f6f6f6; border: 1px solid #ddd;position: absolute; z-index: 3;">
		<button type="button" class="sidebarbtn" onclick="bstorageinfo()">
			<img width="40px;" height="40px;" alt="location_img" src="resources/img/location.png">
			<p style="margin: 0">저장소<br>위치</p>
		</button>
		<button type="button" class="sidebarbtn" >
			<img width="40px;" height="40px;" alt="analytics_img" src="resources/img/analytics.png">
			<p style="margin: 0">월별<br>사용량</p>
		</button>
		<button type="button" class="sidebarbtn" >
			<img width="40px;" height="40px;" alt="analytics_img" src="resources/img/analytics.png">
			<p style="margin: 0">지역별<br>사용량</p>
		</button>
	</div>
	
	<div style="width: 260px; height: 600px; background-color: #f6f6f6; border: 1px solid #ddd; padding-left:80px; position: absolute; z-index: 2;">
		<div style="width: 260px; height: 159px; border-bottom: 1px solid #ddd;">
			날씨정보 넣을 거에요
		</div>
		<div style="width: 260px; height: 80px; border-bottom: 1px solid #ddd;">
			속도정보 넣을 거에요
		</div>
		<div style="width: 260px; height: 300px; border-bottom: 1px solid #ddd;">
			공지사항 넣을 거에요
		</div>
		
	</div>
	
	<div id="map" style="width :100% ;height:600px; position: relative; z-index: 1;"></div>
</div>
</body>
</html>