package com.tech.straffic;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.tech.straffic.service.CrollingService;
import com.tech.straffic.service.HomeNoticeService;
import com.tech.straffic.service.NoticeContentService;
import com.tech.straffic.service.NoticeDeleteService;
import com.tech.straffic.service.NoticeEditService;
import com.tech.straffic.service.NoticeListService;
import com.tech.straffic.service.NoticeWriteService;
import com.tech.straffic.service.StrafficService;
import com.tech.straffic.vo.SearchVO;

@Controller
public class StrafficController {
	
	@Autowired
	private SqlSession sqlSession;
	
	StrafficService strafficService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model) {
		
		strafficService = new HomeNoticeService(sqlSession);
		strafficService.execute(model);
		
		strafficService = new CrollingService();
		strafficService.execute(model);		
		
		return "home";
	}

	@RequestMapping(value = "/strafficB", method = RequestMethod.GET)
	public String strafficB(Model model) {
		
		strafficService = new HomeNoticeService(sqlSession);
		strafficService.execute(model);
		
		strafficService = new CrollingService();
		strafficService.execute(model);	
		
		return "strafficB";
	}

	@RequestMapping(value = "/strafficnotice", method = RequestMethod.GET)
	public String strafficnotice(Model model,HttpServletRequest request,SearchVO searchVO) {
		System.out.println("strafficnotice controller");
		
		model.addAttribute("request",request);
		model.addAttribute("searchVo",searchVO);
		
		strafficService = new NoticeListService(sqlSession);
		strafficService.execute(model);
		
		return "strafficnotice";
	}
	
	@RequestMapping(value = "/noticewriteview", method = RequestMethod.GET)
	public String noticewriteview(Model model,HttpServletRequest request) {
		System.out.println("strafficnoticewriteview controller");
		
		return "noticewriteview";
	}

	@RequestMapping(value = "/noticewrite", method = RequestMethod.POST)
	public String noticewrite(Model model,MultipartHttpServletRequest mftrequest) {
		System.out.println("strafficnoticewrite controller");
		
		model.addAttribute("mftrequest",mftrequest);
		
		strafficService = new NoticeWriteService(sqlSession);
		strafficService.execute(model);
		
		return "redirect:strafficnotice";
	}
	
	@RequestMapping(value = "/noticecontent", method = RequestMethod.GET)
	public String noticecontent(Model model,HttpServletRequest request) {
		System.out.println("noticecontent controller");
		
		model.addAttribute("request",request);
		
		strafficService = new NoticeContentService(sqlSession);
		strafficService.execute(model);
		
		return "noticecontent";
	}

	@RequestMapping(value = "/noticeDelete", method = RequestMethod.GET)
	public String noticeDelete(Model model,HttpServletRequest request) {
		System.out.println("noticeDelete controller");
		
		model.addAttribute("request",request);
		
		strafficService = new NoticeDeleteService(sqlSession);
		strafficService.execute(model);
		
		return "redirect:strafficnotice";
	}

	@RequestMapping(value = "/noticeeditview", method = RequestMethod.GET)
	public String noticeEditview(Model model,HttpServletRequest request) {
		System.out.println("noticeEditview controller");
		
		model.addAttribute("request",request);
		
		strafficService = new NoticeContentService(sqlSession);
		strafficService.execute(model);
		
		return "noticeeditview";
	}
	
	@RequestMapping(value = "/noticeedit", method = RequestMethod.POST)
	public String noticeedit(Model model,MultipartHttpServletRequest mftrequest) {
		System.out.println("noticeedit controller");
		
		model.addAttribute("mftrequest",mftrequest);
		
		String sno=mftrequest.getParameter("sno");
		
		strafficService = new NoticeEditService(sqlSession);
		strafficService.execute(model);
		
		return "redirect:noticecontent?sno="+sno;
	}
}
