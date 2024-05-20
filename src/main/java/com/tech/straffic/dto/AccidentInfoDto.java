package com.tech.straffic.dto;

public class AccidentInfoDto {
	private int acc_id;
	private int occr_date;
	private int occr_time;
	private int exp_clr_date;
	private int exp_clr_time;
	private String acc_type;
	private String acc_dtype;
	private int link_id;
	private Float grs80tm_x;
	private Float grs80tm_y;
	private String acc_info;
	private String acc_road_code;
	
	public AccidentInfoDto() {
		// TODO Auto-generated constructor stub
	}

	public int getACC_ID() {
		return acc_id;
	}

	public void setACC_ID(int aCC_ID) {
		acc_id = aCC_ID;
	}

	public int getOCCR_DATE() {
		return occr_date;
	}

	public void setOCCR_DATE(int oCCR_DATE) {
		occr_date = oCCR_DATE;
	}

	public int getOCCR_TIME() {
		return occr_time;
	}

	public void setOCCR_TIME(int oCCR_TIME) {
		occr_time = oCCR_TIME;
	}

	public int getEXP_CLR_DATE() {
		return exp_clr_date;
	}

	public void setEXP_CLR_DATE(int eXP_CLR_DATE) {
		exp_clr_date = eXP_CLR_DATE;
	}

	public int getEXP_CLR_TIME() {
		return exp_clr_time;
	}

	public void setEXP_CLR_TIME(int eXP_CLR_TIME) {
		exp_clr_time = eXP_CLR_TIME;
	}

	public String getACC_TYPE() {
		return acc_type;
	}

	public void setACC_TYPE(String aCC_TYPE) {
		acc_type = aCC_TYPE;
	}

	public String getACC_DTYPE() {
		return acc_dtype;
	}

	public void setACC_DTYPE(String aCC_DTYPE) {
		acc_dtype = aCC_DTYPE;
	}

	public int getLINK_ID() {
		return link_id;
	}

	public void setLINK_ID(int lINK_ID) {
		link_id = lINK_ID;
	}

	public Float getGRS80TM_X() {
		return grs80tm_x;
	}

	public void setGRS80TM_X(Float gRS80TM_X) {
		grs80tm_x = gRS80TM_X;
	}

	public Float getGRS80TM_Y() {
		return grs80tm_y;
	}

	public void setGRS80TM_Y(Float gRS80TM_Y) {
		grs80tm_y = gRS80TM_Y;
	}

	public String getACC_INFO() {
		return acc_info;
	}

	public void setACC_INFO(String aCC_INFO) {
		acc_info = aCC_INFO;
	}

	public String getAcc_road_code() {
		return acc_road_code;
	}

	public void setAcc_road_code(String acc_road_code) {
		this.acc_road_code = acc_road_code;
	}	
}
