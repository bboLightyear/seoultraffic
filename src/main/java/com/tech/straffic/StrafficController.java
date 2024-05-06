package com.tech.straffic;

import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tech.straffic.service.BStorageInfoService;
import com.tech.straffic.service.StrafficService;

@Controller
public class StrafficController {
	
	StrafficService strafficService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model) {

		
		return "home";
	}

	@RequestMapping(value = "/strafficB", method = RequestMethod.GET)
	public String strafficB(Model model) {
		
		
		return "strafficB";
	}
	
}
