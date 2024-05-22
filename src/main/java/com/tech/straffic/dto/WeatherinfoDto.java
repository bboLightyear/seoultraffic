package com.tech.straffic.dto;

public class WeatherinfoDto {
	private String description;
	private Float temp;
	private Float temp_min;
	private Float temp_max;
	private String name;
	
	public WeatherinfoDto() {
		
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Float getTemp() {
		return temp;
	}

	public void setTemp(Float temp) {
		this.temp = temp;
	}

	public Float getTemp_min() {
		return temp_min;
	}

	public void setTemp_min(Float temp_min) {
		this.temp_min = temp_min;
	}

	public Float getTemp_max() {
		return temp_max;
	}

	public void setTemp_max(Float temp_max) {
		this.temp_max = temp_max;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
