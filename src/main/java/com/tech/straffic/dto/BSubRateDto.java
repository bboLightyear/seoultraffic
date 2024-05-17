package com.tech.straffic.dto;

public class BSubRateDto {

	private String joindate;
	private String usercode;
	private String age;
	private String gender;
	private int subscribers;
	
	public BSubRateDto() {
	}
	
	public String getJoindate() {
		return joindate;
	}
	public void setJoindate(String joindate) {
		this.joindate = joindate;
	}
	public String getUsercode() {
		return usercode;
	}
	public void setUsercode(String usercode) {
		this.usercode = usercode;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public int getSubscribers() {
		return subscribers;
	}
	public void setSubscribers(int subscribers) {
		this.subscribers = subscribers;
	}
	
	
}
