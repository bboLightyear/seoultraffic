package com.tech.straffic.service;

import java.io.File;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.tech.straffic.dao.StrafficDao;

public class NoticeEditService implements StrafficService {

	private SqlSession sqlSession;
	
	public NoticeEditService(SqlSession sqlSession) {
		this.sqlSession=sqlSession;
	}

	@Override
	public void execute(Model model) {
		
		Map<String, Object> map=model.asMap();
		MultipartHttpServletRequest mftrequest=(MultipartHttpServletRequest) map.get("mftrequest");
		
		String sno = mftrequest.getParameter("sno");
		String stitle = mftrequest.getParameter("stitle");
		String scontent = mftrequest.getParameter("scontent");
		MultipartFile sfile = mftrequest.getFile("sfile");
		
		
		System.out.println("stitle :"+stitle);
		System.out.println("scontent :"+scontent);
		System.out.println("sfile :"+sfile);
		
		StrafficDao dao = sqlSession.getMapper(StrafficDao.class);
		
		String path="C:\\23setspring\\springwork23\\seoultraffic\\src\\main\\webapp\\resources\\upload";
		
		// 수정 파일을 올린 경우에만 실행
		if (sfile != null) {
			// 이전 파일 조회
			String selfilesrc = dao.selfilesrc(sno);
			System.out.println("selfilesrc :" + selfilesrc);

			// 이전 파일 삭제
				String f = selfilesrc; 
				File file = new File(path + "\\" + f);
				System.out.println(path + "\\" + f);
				if (file.exists()) {
					file.delete();
					System.out.println("이미지 삭제완료: " + f);
				} else {
					System.out.println("이미지 삭제실패: " + f);
				}
			}		
		
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
		        
		        dao.noticeEdit(stitle,scontent, changeFile,sno);
		    } catch (Exception e) {
		        // 예외 처리 로직
		        System.err.println("업로드 실패: " + e.getMessage());
		    }
		}else {
			dao.noticeEdit(stitle,scontent, null, sno);
		}
	}
}
