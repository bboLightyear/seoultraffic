package com.tech.straffic.service;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.ui.Model;

import com.tech.straffic.dao.StrafficDao;
import com.tech.straffic.dto.StrafficNoticeDto;
import com.tech.straffic.vo.SearchVO;

public class NoticeListService implements StrafficService {

	private SqlSession sqlSession;
	
	public NoticeListService(SqlSession sqlSession) {
		this.sqlSession=sqlSession;
	}

	@Override
	public void execute(Model model) {
		
	StrafficDao dao = sqlSession.getMapper(StrafficDao.class);
	
	Map<String, Object> map=model.asMap();
	HttpServletRequest request=(HttpServletRequest) map.get("request");
	SearchVO searchVO=(SearchVO) map.get("searchVO");
	
	ArrayList<StrafficNoticeDto> list = dao.noticeList();
	
	System.out.println(list.size());
	
	model.addAttribute("list",list);
		
	}
}
