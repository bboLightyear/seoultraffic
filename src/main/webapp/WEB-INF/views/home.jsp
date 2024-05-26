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
<script src="https://cdn.jsdelivr.net/npm/moment"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment"></script>
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
	
	        <input type="radio" id="bikeinfo" name="info" class="radiobtn" onclick="trafficspeeddata(2014)" style="display: none;">
	        <label for="bikeinfo" class="sidebarbtn">
	            <img alt="bike_img" src="resources/img/analytics.png" style="width: 40px; height: 40px;">
	            <p style="margin: 0">속도<br>정보</p>
	        </label>
		</div> 
		
		<div style="width: 280px; height: 600px; background-color: #f6f6f6; border: 1px solid #ddd; padding-left:80px; position: absolute; z-index: 2;">
			<div  id="weatherinfodiv" style="width: 280px; height: 159px; border-bottom: 1px solid #ddd;">
				<h3 style="text-align: center;">날씨</h3>
			</div>
			<div style="width: 280px; height: 80px; border-bottom: 1px solid #ddd;">

				<h4 style="margin: 0; text-align: center; margin-top: 20px;">
					서울시 전체 속도 
				    <c:choose>
				        <c:when test="${spdStat1Det eq '서행'}">
				            <span style="background-color:yellow; border-radius: 5px; display: inline-block; width: 50px; height: 20px; text-align: center; border: 2px solid black;">${spdStat1Det}</span>
				        </c:when>
				        <c:when test="${spdStat1Det eq '혼잡'}">
				            <span style="background-color:red; border-radius: 5px; display: inline-block; width: 50px; height: 20px; text-align: center; border: 2px solid black;">${spdStat1Det}</span>
				        </c:when>
				        <c:when test="${spdStat1Det eq '원활'}">
				            <span style="background-color: #32c753; border-radius: 5px; display: inline-block; width: 50px; height: 20px; text-align: center; border: 2px solid black;">${spdStat1Det}</span>
				        </c:when>
				        <c:otherwise>
				            <span>${spdStat1Det}</span>
				        </c:otherwise>
				    </c:choose>
					${spdStat1}
				</h4>

				<h4 style="margin: 0; text-align: center; margin-top: 10px;">
					도심 전체 속도 
					<c:choose>
				        <c:when test="${spdStat2Det eq '서행'}">
				            <span style="background-color:yellow; border-radius: 5px; display: inline-block; width: 50px; height: 20px; text-align: center; border: 2px solid black;">${spdStat2Det}</span>
				        </c:when>
				        <c:when test="${spdStat2Det eq '혼잡'}">
				            <span style="background-color:red; border-radius: 5px; display: inline-block; width: 50px; height: 20px; text-align: center; border: 2px solid black;">${spdStat2Det}</span>
				        </c:when>
				        <c:when test="${spdStat2Det eq '원활'}">
				            <span style="background-color: #32c753; border-radius: 5px; display: inline-block; width: 50px; height: 20px; text-align: center; border: 2px solid black;">${spdStat2Det}</span>
				        </c:when>
				        <c:otherwise>
				            <span>${spdStat1Det}</span>
				        </c:otherwise>
				    </c:choose>
					${spdStat2}
				</h4>
				
			</div>
			<div style="width: 280px; height: 300px;">
				<h3 style="text-align: center;">공지사항</h3>
				
				<c:forEach items="${list }" var="dto">
			    	<p style="margin-bottom:10px; margin-top: 0px;"><a style="margin-left:3px;margin-right:3px; font-size:15px;font-weight:bold; text-decoration: none; color: black;" href="noticecontent?sno=${dto.sno}">${dto.stitle}</a></br></p>		          
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
			<h3 style="text-align: center; font-size: 25px; background-color: #1034a6; color: white; margin-top: 0; height: 45px; display: flex; align-items: center; justify-content: center;">사고 및 통제 정보</h3>
		</div>
		
		
		<div style="width: 100%; text-align: center;">
    		<div class="hometabhead" style="display: inline-block;">
		        <ul style="display: flex; justify-content: center; padding: 0; list-style: none; margin-bottom: 20px; font-size: 20px;">
		            <li style="margin: 0 10px; display: flex; align-items: center;">
		                <input type="radio" id="allaccident" name="accinfo" checked="checked" style="display: none;"/>
		                <label for="allaccident" class="accinfolabel">
		                    <h4 style="margin: 0;">전체</h4>
		                </label> 
		            </li>
		            <li style="margin: 0 10px; display: flex; align-items: center;">
		                <input type="radio" id="accident" name="accinfo" style="display: none;"/>
		                <label for="accident" class="accinfolabel">
		                    <h4 style="margin: 0;">사고/고장</h4>
		                </label>
		            </li>
		            <li style="margin: 0 10px; display: flex; align-items: center;">
		                <input type="radio" id="construction" name="accinfo" style="display: none;"/>
		                <label for="construction" class="accinfolabel">
		                    <h4 style="margin: 0">공사/집회</h4>
		                </label> 
		            </li>
		            <li style="margin: 0 10px; display: flex; align-items: center;">
		                <input type="radio" id="weather" name="accinfo" style="display: none;"/>
		                <label for="weather" class="accinfolabel">
		                    <h4 style="margin: 0">기상/화재</h4>
		                </label>
		            </li>
		        </ul>
		    </div>
		    <div style="border: 3px solid #1034a6; width:1030px; border-radius: 10px; display: inline-block;">
			    <div id="accinfodiv">
			        <ul></ul>
			    </div>
		    </div>
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

		<div id="speeddatadiv" style="display: none; width: 1200px;">
			<input type="button" onclick="trafficspeeddata(2014)" value="2014" />
			<input type="button" onclick="trafficspeeddata(2015)" value="2015" />
			<input type="button" onclick="trafficspeeddata(2016)" value="2016" />
			<input type="button" onclick="trafficspeeddata(2017)" value="2017" />
			<input type="button" onclick="trafficspeeddata(2018)" value="2018" />
			<input type="button" onclick="trafficspeeddata(2019)" value="2019" />
			<input type="button" onclick="trafficspeeddata(2020)" value="2020" />
			<input type="button" onclick="trafficspeeddata(2021)" value="2021" />
			<input type="button" onclick="trafficspeeddata(2022)" value="2022" />
			<input type="button" onclick="trafficspeeddata(2023)" value="2023" />
			<canvas id="speeddatacanvas"></canvas>
		</div>

	</div>

</body>
<script type="text/javascript" src="resources/js/straffichome.js"></script>
<script type="text/javascript" src="resources/js/strafficacciregata.js"></script>
<%@ include file="footer.jsp" %>
</html>
