package com.tech.straffic;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tech.straffic.dao.StrafficDao;
import com.tech.straffic.dto.BStorageInfoDto;
import com.tech.straffic.dto.BUsageDto;

@RestController
public class StrafficRestController {
	
	private SqlSession sqlSession;
	
	public StrafficRestController(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST,value = "/bstorageinfo")
	public ArrayList<BStorageInfoDto> bstorageinfo(HttpServletRequest request) throws ClassNotFoundException {
		System.out.println("bstorageinfo rest con()");
        
        String key = "55756f727977687138317466627a7a";    
        ArrayList<BStorageInfoDto> storageList = new ArrayList<>();
		
		try{
			String apiURL = "http://openapi.seoul.go.kr:8088/"+key+"/json/bikeList/1/1000/";
			URL url = new URL(apiURL);
			BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			String result = bf.readLine();
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
                BStorageInfoDto dto = new BStorageInfoDto();

                dto.setStationName(row.getString("stationName"));
                dto.setRackTotCnt(row.getInt("rackTotCnt"));
                dto.setParkingBikeTotCnt(row.getInt("parkingBikeTotCnt"));
                dto.setShared(row.getInt("shared"));
                dto.setStationLatitude(row.getString("stationLatitude"));
                dto.setStationLongitude(row.getString("stationLongitude"));
                dto.setStationId(row.getString("stationId"));
                
                storageList.add(dto);
	        }
      	
        	
		}catch(Exception e){
			e.printStackTrace();
		}
        
        return storageList;
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST,value = "/busage")
	public ArrayList<BUsageDto> busage(HttpServletRequest request) throws ClassNotFoundException {
		System.out.println("busage rest con()");
		
		StrafficDao dao = sqlSession.getMapper(StrafficDao.class);
		
		ArrayList<BUsageDto> list = dao.busageyear();
		
		System.out.println(list.size());
		
		return list;
	}
}
