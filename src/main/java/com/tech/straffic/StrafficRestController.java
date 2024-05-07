package com.tech.straffic;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tech.straffic.dto.BStorageInfoDto;

@RestController
public class StrafficRestController {
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST,value = "/bstorageinfo")
	public String bstorageinfo(HttpServletRequest request) throws ClassNotFoundException {
		System.out.println("bstorageinfo rest con()");
        
        String key = "55756f727977687138317466627a7a";    
        String result = "";
//        List<BStorageInfoDto> storageList = new ArrayList<>();
		
		try{

			String apiURL = "http://openapi.seoul.go.kr:8088/"+key+"/json/bikeList/1/10/";
			URL url = new URL(apiURL);
			BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			result = bf.readLine();
			bf.close();
	        
	        JSONObject obj = new JSONObject(result);
	        JSONObject rentBikeStatus = obj.getJSONObject("rentBikeStatus");
	        JSONObject bresult = rentBikeStatus.getJSONObject("RESULT");
	        JSONArray rows = rentBikeStatus.getJSONArray("row");

	        System.out.println("RESULT : " + bresult.getString("CODE"));
	        System.out.println("RESULT : " + bresult.getString("MESSAGE"));
	        System.out.println();
	        
	        for (int i = 0; i < rows.length(); i++) {
                JSONObject row = rows.getJSONObject(i);
                System.out.println("Station Name: " + row.getString("stationName"));
                System.out.println("Total Racks: " + row.getString("rackTotCnt"));
                System.out.println("Total Parking Bikes: " + row.getString("parkingBikeTotCnt"));
                System.out.println("Shared: " + row.getString("shared"));
                System.out.println("Latitude: " + row.getString("stationLatitude"));
                System.out.println("Longitude: " + row.getString("stationLongitude"));
                System.out.println("Station ID: " + row.getString("stationId"));
                System.out.println();
            }
      	
        	
		}catch(Exception e){
			e.printStackTrace();
		}
        
        return result.toString();
	}

}
