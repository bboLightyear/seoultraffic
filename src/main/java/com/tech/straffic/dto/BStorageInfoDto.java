package com.tech.straffic.dto;

public class BStorageInfoDto {
	private int rackTotCnt;
	private String stationName;
	private int parkingBikeTotCnt;
	private int shared;
	private String stationLatitude;
	private String stationLongitude;
	private String stationId;
	
	public BStorageInfoDto() {
		
	}
	
	public int getRackTotCnt() {
		return rackTotCnt;
	}
	public void setRackTotCnt(int rackTotCnt) {
		this.rackTotCnt = rackTotCnt;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public int getParkingBikeTotCnt() {
		return parkingBikeTotCnt;
	}
	public void setParkingBikeTotCnt(int parkingBikeTotCnt) {
		this.parkingBikeTotCnt = parkingBikeTotCnt;
	}
	public int getShared() {
		return shared;
	}
	public void setShared(int shared) {
		this.shared = shared;
	}
	public String getStationLatitude() {
		return stationLatitude;
	}
	public void setStationLatitude(String stationLatitude) {
		this.stationLatitude = stationLatitude;
	}
	public String getStationLongitude() {
		return stationLongitude;
	}
	public void setStationLongitude(String stationLongitude) {
		this.stationLongitude = stationLongitude;
	}
	public String getStationId() {
		return stationId;
	}
	public void setStationId(String stationId) {
		this.stationId = stationId;
	}
}
