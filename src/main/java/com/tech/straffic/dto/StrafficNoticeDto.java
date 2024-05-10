package com.tech.straffic.dto;

import java.util.Date;

public class StrafficNoticeDto {
	private int sno;
	private String stitle;
	private String scontent;
	private Date sdate;
	private int shit;
	private String sfilesrc;
	
	public StrafficNoticeDto() {

	}
	
	public int getSno() {
		return sno;
	}
	public void setSno(int sno) {
		this.sno = sno;
	}
	public String getStitle() {
		return stitle;
	}
	public void setStitle(String stitle) {
		this.stitle = stitle;
	}
	public String getScontent() {
		return scontent;
	}
	public void setScontent(String scontent) {
		this.scontent = scontent;
	}
	public Date getSdate() {
		return sdate;
	}
	public void setSdate(Date sdate) {
		this.sdate = sdate;
	}
	public int getShit() {
		return shit;
	}
	public void setShit(int shit) {
		this.shit = shit;
	}
	public String getSfilesrc() {
		return sfilesrc;
	}
	public void setSfilesrc(String sfilesrc) {
		this.sfilesrc = sfilesrc;
	}
	
	
}
