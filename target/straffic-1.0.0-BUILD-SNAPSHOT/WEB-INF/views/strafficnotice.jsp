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
<link rel="stylesheet" href="resources/css/board.css" />
<%@ include file="header.jsp" %>
<body style="margin: 0">
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
			
			<div class="board_searchbox" style="display: flex; justify-content: center; align-items: center;">
			    <form action="strafficnotice" style="text-align: center;">
			        <input class="input" type="text" name="sk" value="${searchKeyword }"/>
			        <input class="button" type="submit" value="검색" />			
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
			                <td><a href="noticecontent?sno=${dto.sno}">${dto.stitle}</a></td>		          
			                <td><fmt:formatDate value="${dto.sdate}" pattern="yy/MM/dd" /></td>
			            	<td>${dto.shit}</td>
			        	</tr>
			       	</c:forEach>
			    </tbody>
		  	</table>
			
			<a href="noticewriteview" style="color: white; background-color: #1034a6; text-decoration: none; font-weight: bold; font-size: 20px;">글쓰기</a>
			
			<div class="cs_list_wrap_pagenum">
				<a class="cs_list_writebtn_a" href="strafficnotice?page=1&sk=${searchKeyword}">
						 << 처음으로</a>
				<a class="cs_list_writebtn_a" href="strafficnotice?page=${searchVo.page-1 }&sk=${searchKeyword}">
						&nbsp;이전</a>

		
				<c:forEach begin="${searchVo.pageStart }" end="${searchVo.pageEnd }" var="i">
					<c:choose>
					
						<c:when test="${i eq searchVo.page }">
							<span style="color: #1034a6; font-weight: bold;">&nbsp;${i }&nbsp;</span>
						</c:when>
						
						<c:otherwise>
							<a class="cs_list_writebtn_a" href="strafficnotice?page=${i }&sk=${searchKeyword}">${i }</a> &nbsp;
						</c:otherwise>
					
					</c:choose>
				</c:forEach>
		
					<a class="cs_list_writebtn_a" href="strafficnotice?page=${searchVo.page+1 }&sk=${searchKeyword}">
							다음&nbsp;</a>
					
					<a class="cs_list_writebtn_a" href="strafficnotice?page=${searchVo.totPage }&sk=${searchKeyword}">
							끝으로 >></a>
			</div>
		</div>
	
	</div>
</div>

</body>
<%@ include file="footer.jsp" %>
</html>