<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
				<form action="">
					<input type="text" value="검색"/>
					<input type="submit" value="검색" />			
				</form>
			</div>
			
			<table class="rwd-table">
			    <tbody>
			      	<tr>
				        <th style="width: 50px;">번호</th>
				        <th style="width: 620px;">제목</th>
				        <th style="width: 100px;">작성일</th>
				        <th style="width: 60px;">조회수</th>
			      	</tr>
			    
				    <c:forEach items="${list }" var="dto">
			        	<tr>
			                <td>${dto.sno}</td>
			                <td><a href="">${dto.stitle}</a></td>		          
			                <td><fmt:formatDate value="${dto.sdate}" pattern="yy/MM/dd" /></td>
			            	<td>${dto.shit}</td>
			        	</tr>
			       	</c:forEach>
			    </tbody>
		  	</table>
			
			<a href="noticewriteview" style="color: white; background-color: #1034a6; text-decoration: none; font-weight: bold; font-size: 20px;">글쓰기</a>
		</div>
	
	</div>
</div>

</body>
</html>