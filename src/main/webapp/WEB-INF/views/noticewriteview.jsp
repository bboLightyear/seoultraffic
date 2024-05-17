<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<div class="cs_write_wrap_all">
		<div class="cs_write_wrap_form">
		
			<div class="cs_write_wrap_form_back"><a class="cs_write_wrap_form_back_a" href="strafficnotice">&lt;목록으로</a></div> 
			
			<div class="cs_write_wrap_form_head"><h3 style="margin: 0;">글쓰기</h3></div>
		
			<form action="noticewrite" method="post" enctype="multipart/form-data" accept-charset="UTF-8">
				
				<div class="cs_write_wrap_form_title">
					<input type="text" class="cs_write_wrap_form_title_it" name="stitle" value="제목을 입력해주세요." onfocus="clearInput(this)"/>
					
					<script>// 글제목 커서 올릴 때 제목입력 문구 사라지게 하는 스크립트
			
			        function clearInput(inputField) {
			            if (inputField.value.trim() === "제목을 입력해주세요.") {
			                inputField.value = "";
			            }
			        }
					</script>
				</div><!--cs_write_wrap_form_title-->
				
				<div class="cs_write_wrap_form_wrap_content">
					<div class="cs_write_wrap_form_content">
						<p style="margin: 0;">내용 입력</p>
						<textarea type="text" class="cs_write_wrap_form_content_ta" name="scontent"></textarea>
					</div><!--cs_write_wrap_form_content-->
				</div><!--cs_write_wrap_form_wrap_content-->
					
				<div class="cs_write_wrap_form_wrap_filebtn">
					<label for="file-upload" class="custom-file-upload">
	    				<i class="fa fa-cloud-upload"></i> 파일 첨부하기
					</label>
					
					<input id="file-upload" type="file" class="cs_write_wrap_form_filebtn" name="sfile" style="display: none;" multiple="multiple"  onchange="displayFileName(this)"/>
				</div><!--cs_write_wrap_form_wrap_filebtn-->
				
				<div class="cs_write_wrap_form_file_wrap_display">
					<div id="file-name-display-a" class="cs_write_wrap_form_file_display">
						<p style="margin: 0; border-bottom: 1px;">첨부된 파일</p>
						<div class="" id="file-name-display"> </div>					
					</div>
				</div>
				
				<script>// 사진 첨부 후에 첨부한 사진 리스트 나오도록 하는 스크립트
					function displayFileName(input) {
						const maxFiles = 3; // 최대 파일 수 설정

				        const files = input.files;
				        const fileNameDisplay = document.getElementById('file-name-display');
				        const fileNameDisplayA = document.getElementById('file-name-display-a');
	
				        if (files.length >= maxFiles) {
				            alert("파일은 2개까지 업로드 가능합니다."); // 파일 수가 최대 값보다 많으면 알림 표시
				            input.value = null; // 파일 선택 초기화
				            fileNameDisplayA.style.display = "none"; // 파일 이름 표시 부분 숨김
				        } else {
				            fileNameDisplayA.style.display = "flex"; // 파일 이름 표시 부분 표시

				            // 파일 이름 표시 부분 업데이트
				            fileNameDisplay.innerHTML = "";
				            for (var i = 0; i < files.length; i++) {
				                const fileNameDiv = document.createElement("div");
				                fileNameDiv.innerText = files[i].name;
				                fileNameDisplay.appendChild(fileNameDiv);
				            }
				        }
				    }
				</script>
					
				<div class="cs_write_wrap_form_wrap_writebtn">
					
					<input type="submit" class="cs_write_wrap_form_writebtn" value="완료" />
				</div><!--cs_write_wrap_form_wrap_writebtn-->
			
			</form>
		</div>
</div><!--cs_write_wrap_all-->
</body>
<%@ include file="footer.jsp" %>
</html>