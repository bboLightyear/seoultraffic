package com.tech.straffic.service;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.ui.Model;

import com.tech.straffic.dao.StrafficDao;
import com.tech.straffic.dto.StrafficNoticeDto;


public class HomeNoticeService implements StrafficService {

private SqlSession sqlSession;
	
	public HomeNoticeService(SqlSession sqlSession) {
		this.sqlSession=sqlSession;
	}

	@Override
	public void execute(Model model) {
		
	StrafficDao dao = sqlSession.getMapper(StrafficDao.class);
	
	ArrayList<StrafficNoticeDto> list = dao.homenotice();
	
	System.out.println(list.size());
	
	model.addAttribute("list", list);
		
	}
}
