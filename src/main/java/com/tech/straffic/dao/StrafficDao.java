package com.tech.straffic.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Param;

import com.tech.straffic.dto.AcciDataDto;
import com.tech.straffic.dto.BSubRateDto;
import com.tech.straffic.dto.BUsageDto;
import com.tech.straffic.dto.StrafficNoticeDto;

public interface StrafficDao {

	ArrayList<StrafficNoticeDto> noticeList(int rowStart, int rowEnd, String searchKeyword);

	StrafficNoticeDto noticeList1(String sno);

	void noticewrite(String stitle, String scontent, String changeFile);

	void noticeDelete(String sno);

	String selfilesrc(String sno);

	void noticeEdit(String stitle, String scontent, String changeFile, String sno);

	int selNoticeTotCount();

	ArrayList<BUsageDto> busageyear();

	ArrayList<BSubRateDto> bsubrate();

	ArrayList<StrafficNoticeDto> homenotice();

	ArrayList<AcciDataDto> accidataavg();

	ArrayList<AcciDataDto> accidatatot();

	ArrayList<AcciDataDto> accidatareg(@Param("year") int year);

	ArrayList<AcciDataDto> sppeddata(@Param("year") int year);
}
