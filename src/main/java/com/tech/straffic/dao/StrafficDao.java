package com.tech.straffic.dao;

import java.util.ArrayList;

import com.tech.straffic.dto.StrafficNoticeDto;

public interface StrafficDao {

	ArrayList<StrafficNoticeDto> noticeList(int rowStart, int rowEnd, String searchKeyword);

	StrafficNoticeDto noticeList1(String sno);

	void noticewrite(String stitle, String scontent, String changeFile);

	void noticeDelete(String sno);

	String selfilesrc(String sno);

	void noticeEdit(String stitle, String scontent, String changeFile, String sno);

	int selNoticeTotCount();

}
