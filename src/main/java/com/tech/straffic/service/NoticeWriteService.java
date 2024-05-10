package com.tech.straffic.service;

import java.io.File;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.tech.straffic.dao.StrafficDao;

public class NoticeWriteService implements StrafficService {

	private SqlSession sqlSession;
	
	public NoticeWriteService(SqlSession sqlSession) {
		this.sqlSession=sqlSession;
	}

	@Override
	public void execute(Model model) {
		
		Map<String, Object> map=model.asMap();
		MultipartHttpServletRequest mftrequest=(MultipartHttpServletRequest) map.get("mftrequest");
		
		String stitle = mftrequest.getParameter("stitle");
		String scontent = mftrequest.getParameter("scontent");
		MultipartFile sfile = mftrequest.getFile("sfile");
		
		StrafficDao dao = sqlSession.getMapper(StrafficDao.class);
		
		String path="";
		
		// 파일 이름 업로드 당시 밀리초로 변경
		MultipartFile mf = sfile; // 단일 파일 처리
		String originFile = mf.getOriginalFilename();
		System.out.println("파일이름 : " + originFile);
		long longtime = System.currentTimeMillis();
		String changeFile = longtime + "_" + mf.getOriginalFilename();
		System.out.println("변형된 파일 이름 : " + changeFile);
		String pathFile = path + "\\" + changeFile;

		// 이미지 업로드
		if (!originFile.isEmpty()) {
		    try {
		        mf.transferTo(new File(pathFile));
		        System.out.println("업로드 성공");
		        
		        dao.noticewrite(stitle,scontent, changeFile);
		    } catch (Exception e) {
		        // 예외 처리 로직
		        System.err.println("업로드 실패: " + e.getMessage());
		    }
		}
	}
}
