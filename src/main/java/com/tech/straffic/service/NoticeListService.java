package com.tech.straffic.service;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.ui.Model;

import com.tech.straffic.dao.StrafficDao;
import com.tech.straffic.dto.StrafficNoticeDto;
import com.tech.straffic.vo.SearchVO;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;


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
	   
	   // sk값 가져오기(검색 키워드)
	   String searchKeyword = request.getParameter("sk");
	   
	   // 검색문자 null처리
	   if (searchKeyword == null) {
	      searchKeyword = "";
	   }
	   model.addAttribute("searchKeyword", searchKeyword);
	   
	   // searchKeyword 확인하는 출력문
	   System.out.println("searchKeyword : " + searchKeyword);
	   
	   String strPage=request.getParameter("page");
	   if (strPage==null) { //시작 (처음페이지)는 페이지 넘버가 없으므로 null일 경우 1로 처리해줌
	      strPage="1";  
	   }
	   
	   int page=Integer.parseInt(strPage); //문자열 page int로 변환
	   searchVO.setPage(page);
	   
	   //토탈 글 갯수
	   int total=dao.selNoticeTotCount();
	   
	   //   total count 찍히게
	   searchVO.pageCalculate(total);
	   
	   int rowStart=searchVO.getRowStart();
	   int rowEnd=searchVO.getRowEnd();
	   
	   ArrayList<StrafficNoticeDto> list = dao.noticeList(rowStart,rowEnd,searchKeyword);
	   
	   System.out.println(list.size());
	   
	   model.addAttribute("list",list);
	   
	   model.addAttribute("totalRowcnt", total);
	   model.addAttribute("searchVo", searchVO);
	      
	   }
}






