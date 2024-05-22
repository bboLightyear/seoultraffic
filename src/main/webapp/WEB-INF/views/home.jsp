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
	 		<input type="radio" id="accidentinfo" name="info" class="radiobtn" onclick="accidentinfo()" style="display: none;">
	        <label for="accidentinfo" class="sidebarbtn">
	            <img alt="location_img" src="resources/img/location.png" style="width: 40px; height: 40px;">
	            <p style="margin: 0">돌발<br>정보</p>
	        </label>
	
	        <input type="radio" id="controlinfo" name="info" class="radiobtn" onclick="handleRadioClick(this)" style="display: none;">
	        <label for="controlinfo" class="sidebarbtn">
	            <img alt="control_img" src="resources/img/analytics.png" style="width: 40px; height: 40px;">
	            <p style="margin: 0">통제<br>정보</p>
	        </label>
	
	        <input type="radio" id="bikeinfo" name="info" class="radiobtn" onclick="handleRadioClick(this)" style="display: none;">
	        <label for="bikeinfo" class="sidebarbtn">
	            <img alt="bike_img" src="resources/img/analytics.png" style="width: 40px; height: 40px;">
	            <p style="margin: 0">따릉이<br>정보</p>
	        </label>
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
	</div>

</body>
<script>
//사고정보 띄우는 메소드
$(document).ready(function() {
    function accinfo() {
        $.ajax({
            type: "post",
            async: true,
            url: "accidentinfo",
            success: function(data) {
                console.log("사고 정보 로드 성공");
                console.log(data);

                displayAccidentInfo(data);

                $('input[name="accinfo"]').on('change', function() {
                    filterAccidentInfo(data, $(this).attr('id'));
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading accident info:", status, error);
            }
        });
    }	

    function displayAccidentInfo(data) {
        var accinfodiv = document.getElementById("accinfodiv");
        var htmlText = "";

        // 데이터가 배열인지 확인
        if (Array.isArray(data)) {
            // 데이터가 배열일 경우
            for (var i = 0; i < data.length; i++) {
                var accidentData = data[i];
                htmlText += "<li data-type=" + accidentData.acc_TYPE + ">";
                htmlText += "<strong>사고 ID:</strong>" + accidentData.acc_ID + "<br>";
                htmlText += "<strong>정보:</strong>" + accidentData.acc_INFO + "<br>";
                htmlText += "<strong>예상 종료일:</strong>" + accidentData.exp_CLR_DATE + "<br>";
                htmlText += "<strong>예상 종료 시간:</strong>" + accidentData.exp_CLR_TIME;
                htmlText += "</li>";
            }
        } else {
            // 데이터가 배열이 아닌 경우 (하나의 객체)
            var accidentData = data;
            htmlText += "<li data-type=" + accidentData.acc_TYPE + ">";
            htmlText += "<strong>사고 ID:</strong>" + accidentData.acc_ID + "<br>";
            htmlText += "<strong>정보:</strong>" + accidentData.acc_INFO + "<br>";
            htmlText += "<strong>예상 종료일:</strong>" + accidentData.exp_CLR_DATE + "<br>";
            htmlText += "<strong>예상 종료 시간:</strong>" + accidentData.exp_CLR_TIME;
            htmlText += "</li>";
        }

        $(accinfodiv).find("ul").append(htmlText);
    }

    function filterAccidentInfo(data, filter) {
        let filteredData = [];
        if (filter === 'allaccident') {
            filteredData = data;
        } else if (filter === 'accident') {
            filteredData = data.filter(item => item.acc_TYPE.startsWith("A01") || item.acc_TYPE.startsWith("A02") || item.acc_TYPE.startsWith("A03") || item.acc_TYPE.startsWith("A04") || item.acc_TYPE.startsWith("A06") || item.acc_TYPE.startsWith("A07"));
        } else if (filter === 'construction') {
            filteredData = data.filter(item => item.acc_TYPE.startsWith("A04") || item.acc_TYPE.startsWith("A10"));
        } else if (filter === 'weather') {
            filteredData = data.filter(item => item.acc_TYPE.startsWith("A05") || item.acc_TYPE.startsWith("A08") || item.acc_TYPE.startsWith("A09"));
        }

        clearAccidentInfo(); // 리스트 초기화
        displayAccidentInfo(filteredData);
    }

    function clearAccidentInfo() {
        $("#accinfodiv ul").empty(); // 리스트 내용 비움
    }

    accinfo();
});
</script>
<%@ include file="footer.jsp" %>
</html>
