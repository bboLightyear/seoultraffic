package com.tech.straffic.service;

import java.util.HashMap;

import org.springframework.ui.Model;

public interface StrafficService {

	public void excute(Model model);

	public void excute(Model model, HashMap<String, Object> map);
}
