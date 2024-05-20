<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<title>Seoul Traffic</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d97b909cd863aa67602cb221511183bf&libraries=services&autoload=false"></script>
<script type="text/javascript" src="resources/js/strafficB.js"></script>
<link rel="stylesheet" href="resources/css/straffic.css" />
</head>
<%@ include file="header.jsp" %>
<body style="margin: 0">
	<div style="">
		<div style="width: 80px; height: 600px; background-color: #f6f6f6; border: 1px solid #ddd;position: absolute; z-index: 3;">
			<button type="button" class="sidebarbtn" onclick="accidentinfo()">
				<img width="40px;" height="40px;" alt="location_img" src="resources/img/location.png">
				<p style="margin: 0">돌발<br>정보</p>
			</button>
			<button type="button" class="sidebarbtn" >
				<img width="40px;" height="40px;" alt="analytics_img" src="resources/img/analytics.png">
				<p style="margin: 0">통제<br>정보</p>
			</button>
			<button type="button" class="sidebarbtn" >
				<img width="40px;" height="40px;" alt="analytics_img" src="resources/img/analytics.png">
				<p style="margin: 0">따릉이<br>정보</p>
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
		
		<div style="width:230px; text-align:center; position: absolute; z-index: 2; margin-left: 400px; margin-top: 10px; background-color: #0067ad; color: white; border-radius: 10px">
			<input type="checkbox" id="chkTraffic" onclick="setOverlayMapTypeId()" checked="checked" /> 교통정보       
	    	<input type="checkbox" id="chkBicycle" onclick="setOverlayMapTypeId()" /> 자전거도로
		</div>
		
		<div id="map" style="width :100% ;height:600px; position: relative; z-index: 1;"></div>
	</div>

</body>
<%@ include file="footer.jsp" %>
</html>
