<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Seoul Traffic</title>
<%@ include file="header.jsp" %>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d97b909cd863aa67602cb221511183bf&autoload=false"></script>
<script type="text/javascript" src="resources/js/strafficB.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"></script>
<link rel="stylesheet" href="resources/css/straffic.css" />
</head>

<body>
<div style="">
	<div style="width: 80px; height: 600px; background-color: #f6f6f6; border: 1px solid #ddd;position: absolute; z-index: 3;">
		<button type="button" class="sidebarbtn" onclick="bstorageinfo()">
			<img width="40px;" height="40px;" alt="location_img" src="resources/img/location.png">
			<p style="margin: 0">저장소<br>위치</p>
		</button>
		<button type="button" class="sidebarbtn" onclick="busage()">
			<img width="40px;" height="40px;" alt="analytics_img" src="resources/img/analytics.png">
			<p style="margin: 0">월별<br>사용량</p>
		</button>
		<button type="button" class="sidebarbtn" >
			<img width="40px;" height="40px;" alt="analytics_img" src="resources/img/analytics.png">
			<p style="margin: 0">가입자<br>추이</p>
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

<canvas id="yearchart" width="300" height="100"></canvas>
</body>
<script>
/* function busage() {
	let yearCt = document.getElementById('yearchart');
	
     $.ajax({
        type: "post",
        async: true,
        url: "busage",
        success: function(data) {
            console.log(data);
        }
    });
} 
// 페이지가 로드되면 busage 함수 실행
$(document).ready(function() {
    busage();
}); */
function busage() {
    let yearCt = document.getElementById('yearchart');

    if (!yearCt) {
        console.error("요소를 찾을 수 없습니다.");
        return;
    }

    $.ajax({
        type: "post",
        async: true,
        url: "busage",
        success: function(data) {
            console.log(data);
            
            // 데이터 변환
            const labels = data.map(entry => entry.sdate);
            const dataset = {
                label: 'Dataset',
                data: data.map(entry => entry.susage),
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // 차트 색상 설정
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            };
            
            // 차트 생성
            let myChart = new Chart(yearCt, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [dataset]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true // 차트 크기 유지 설정
                }
            });
        }
    });
}
</script>
</html>