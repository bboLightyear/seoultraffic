package com.tech.straffic.dao;

import java.util.ArrayList;

import com.tech.straffic.dto.StrafficNoticeDto;

public interface StrafficDao {

	ArrayList<StrafficNoticeDto> noticeList();

	void noticewrite(String stitle, String scontent, String changeFile);
}
