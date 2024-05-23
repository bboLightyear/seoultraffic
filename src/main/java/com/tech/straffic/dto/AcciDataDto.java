package com.tech.straffic.dto;

public class AcciDataDto {
	private String reg;
	private int year;
	private int acci;
	private Float acciper10k;
	private int deaths;
	private Float deathsper10k;
	private int injured;
	private Float injuredper10k;
	
	public AcciDataDto() {
	
	}

	public String getReg() {
		return reg;
	}

	public void setReg(String reg) {
		this.reg = reg;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getAcci() {
		return acci;
	}

	public void setAcci(int acci) {
		this.acci = acci;
	}

	public Float getAcciper10k() {
		return acciper10k;
	}

	public void setAcciper10k(Float acciper10k) {
		this.acciper10k = acciper10k;
	}

	public int getDeaths() {
		return deaths;
	}

	public void setDeaths(int deaths) {
		this.deaths = deaths;
	}

	public Float getDeathsper10k() {
		return deathsper10k;
	}

	public void setDeathsper10k(Float deathsper10k) {
		this.deathsper10k = deathsper10k;
	}

	public int getInjured() {
		return injured;
	}

	public void setInjured(int injured) {
		this.injured = injured;
	}

	public Float getInjuredper10k() {
		return injuredper10k;
	}

	public void setInjuredper10k(Float injuredper10k) {
		this.injuredper10k = injuredper10k;
	}
	
	
}
