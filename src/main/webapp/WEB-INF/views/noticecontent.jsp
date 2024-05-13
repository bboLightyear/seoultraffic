<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="path" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<link rel="stylesheet" href="resources/css/straffic.css" />
<%@ include file="header.jsp" %>
<body>
<div class="wrap_all">
	<div class="wrap_board">
	
		<div class="board_sidemenu">
			<div style="width: 235px; height: 30px; margin-top: 40px; margin-bottom: 40px; margin-left: 15px;">
				<p style="margin: 0; font-size: 24px">공지사항</p>
			</div>
			<div class="container_side">
				<a href="" >공지사항</a>
			</div>
			<div class="container_side" style="border-top: none">
				<a href="" >FAQ</a>
			</div>
		</div>
		
		<div class="board_main">
			
			<div class="board_title">
				<h4 style="font-size: 35px; margin: 0;">공지사항</h4>
			</div>
			
			<div class="board_searchbox">
				<p style="margin-left: 10px;">${content.stitle}</p>
				<p style="text-align: right; margin-right: 20px;">작성일 :&nbsp;<fmt:formatDate value="${content.sdate }" pattern="yy/MM/dd" /></p>
			</div>
			
			<div style="padding: 15px;">
				<pre>
					${content.scontent }
				</pre>
			</div>
			
			<div >
				<img style="width: 900px; height: 100%;" src="${path }/resources/upload/${content.sfilesrc}" alt="${content.sfilesrc}" />
			</div>
			
			<a href="noticeeditview?sno=${content.sno }" style="color: white; background-color: #1034a6; text-decoration: none; font-weight: bold; font-size: 20px;">수정</a>
			<a href="noticeDelete?sno=${content.sno }" style="color: white; background-color: #1034a6; text-decoration: none; font-weight: bold; font-size: 20px;">삭제</a>
			
		</div>
	
	</div>
</div>

</body>
</html>