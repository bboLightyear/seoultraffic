<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
<title>Seoul Traffic</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d97b909cd863aa67602cb221511183bf&libraries=services&autoload=false"></script>
<script type="text/javascript" src="resources/js/strafficB.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script> -->
<link rel="stylesheet" href="resources/css/straffic.css" />
</head>
<%@ include file="header.jsp" %>
<body style="margin: 0">
	<div style="">
		<div style="width: 80px; height: 600px; background-color: #f6f6f6; border: 1px solid #ddd;position: absolute; z-index: 3;">
	 		<input type="radio" id="accidentinfo" name="info" class="radiobtn" onclick="accidentinfo()" style="display: none;">
	        <label for="accidentinfo" class="sidebarbtn">
	            <img alt="location_img" src="resources/img/location.png" style="width: 40px; height: 40px;">
	            <p style="margin: 0">돌발<br>정보</p>
	        </label>
	
	        <input type="radio" id="controlinfo" name="info" class="radiobtn" onclick="accidata(); accidatatot();" style="display: none;">
	        <label for="controlinfo" class="sidebarbtn">
	            <img alt="control_img" src="resources/img/analytics.png" style="width: 40px; height: 40px;">
	            <p style="margin: 0">교통사고<br>정보</p>
	        </label>
	
	        <input type="radio" id="bikeinfo" name="info" class="radiobtn" onclick="trafficspeeddata()" style="display: none;">
	        <label for="bikeinfo" class="sidebarbtn">
	            <img alt="bike_img" src="resources/img/analytics.png" style="width: 40px; height: 40px;">
	            <p style="margin: 0">속도<br>정보</p>
	        </label>
		</div> 
		
		<div style="width: 260px; height: 600px; background-color: #f6f6f6; border: 1px solid #ddd; padding-left:80px; position: absolute; z-index: 2;">
			<div  id="weatherinfodiv" style="width: 260px; height: 159px; border-bottom: 1px solid #ddd;">
				날씨정보 넣을 거에요
			</div>
			<div style="width: 260px; height: 80px; border-bottom: 1px solid #ddd;">
				속도정보 넣을 거에요
			</div>
			<div style="width: 260px; height: 300px; border-bottom: 1px solid #ddd;">
				<p>공지사항</p>
				
				<c:forEach items="${list }" var="dto">
			    	<a href="noticecontent?sno=${dto.sno}">${dto.stitle}</a></br>		          
			  	</c:forEach>
			</div>
		</div>
		
		<div style="width:230px; text-align:center; position: absolute; z-index: 2; margin-left: 400px; margin-top: 10px; background-color: #0067ad; color: white; border-radius: 10px">
			<input type="checkbox" id="chkTraffic" onclick="setOverlayMapTypeId()" checked="checked" /> 교통정보       
	    	<input type="checkbox" id="chkBicycle" onclick="setOverlayMapTypeId()" /> 자전거도로
		</div>
		
		<div id="map" style="width :100% ;height:600px; position: relative; z-index: 1;"></div>
	</div>
	
	<div>
		<div>
			<h3>사고 및 통제 정보</h3>
		</div>
		
		<div class="hometabhead">
			<ul>
				<li>
					<input type="radio" id="allaccident" name="accinfo" checked="checked"/>
					<label for="allaccident" class="accinfolabel">
						<h4 style="margin: 0">전체</h4>
					</label> 
				</li>
				<li>
					<input type="radio" id="accident" name="accinfo"/>
					<label for="accident" class="accinfolabel">
						<h4 style="margin: 0">사고/고장</h4>
					</label>
				</li>
				<li>
					<input type="radio" id="construction" name="accinfo"/>
					<label for="construction" class="accinfolabel">
						<h4 style="margin: 0">공사/집회</h4>
					</label> 
				</li>
				<li>
					<input type="radio" id="weather" name="accinfo"/>
					<label for="weather" class="accinfolabel">
						<h4 style="margin: 0">기상/화재</h4>
					</label>
				</li>
			</ul>
		</div>
		
		<div id="accinfodiv">
			<ul></ul>
		</div>
		
		<div id="accidatadiv" style="display: none; width: 800px;">
			<input type="button" onclick="accidatareg(2014)" value="지역별 사고 건수" />
			<canvas id="accidatacanvas"></canvas>
		</div>
		
		<div id="accidatatotdiv" style="display: none; width: 800px;">
			<canvas id="accidatatotcanvas"></canvas>
		</div>

		<div id="accidataregdiv" style="display: none; width: 1200px;">
			<input type="button" onclick="accidatareg(2014)" value="2014" />
			<input type="button" onclick="accidatareg(2015)" value="2015" />
			<input type="button" onclick="accidatareg(2016)" value="2016" />
			<input type="button" onclick="accidatareg(2017)" value="2017" />
			<input type="button" onclick="accidatareg(2018)" value="2018" />
			<input type="button" onclick="accidatareg(2019)" value="2019" />
			<input type="button" onclick="accidatareg(2020)" value="2020" />
			<input type="button" onclick="accidatareg(2021)" value="2021" />
			<input type="button" onclick="accidatareg(2022)" value="2022" />
			<input type="button" onclick="accidatareg(2023)" value="2023" />
			<canvas id="accidataregcanvas"></canvas>
		</div>

	</div>

</body>
<script type="text/javascript" src="resources/js/straffichome.js"></script>
<script type="text/javascript" src="resources/js/strafficacciregata.js"></script>
<%@ include file="footer.jsp" %>
</html>
