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
<div style="width: 60px; height: 600px; border: 1px solid black;position: absolute; z-index: 2;"></div>
<div style="width: 300px; height: 600px; border: 1px solid black;position: absolute; z-index: 3;"></div>
<div id="map" style="width :100% ;height:600px; position: relative; z-index: 1;"></div>
</div>
<input type="button" onclick="bstorageinfo()" value="저장소 위치"/>
<input type="button" value="?"/>
<input type="button" value="?"/>
</body>
</html>