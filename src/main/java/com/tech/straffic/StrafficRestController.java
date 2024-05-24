package com.tech.straffic;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonObjectFormatVisitor;
import com.tech.straffic.dao.StrafficDao;
import com.tech.straffic.dto.AcciDataDto;
import com.tech.straffic.dto.AccidentInfoDto;
import com.tech.straffic.dto.BStorageInfoDto;
import com.tech.straffic.dto.BSubRateDto;
import com.tech.straffic.dto.BUsageDto;
import com.tech.straffic.dto.WeatherinfoDto;

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
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST,value = "/bsubrate")
	public ArrayList<BSubRateDto> bsubrate(HttpServletRequest request) throws ClassNotFoundException {
		System.out.println("bsubrate rest con()");
		
		StrafficDao dao = sqlSession.getMapper(StrafficDao.class);
		
		ArrayList<BSubRateDto> list = dao.bsubrate();
		
		System.out.println(list.size());
		
		return list;
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST,value = "/accidentinfo")
	public ArrayList<AccidentInfoDto> accidentinfo(HttpServletRequest request) throws ClassNotFoundException {
		System.out.println("accidentinfo rest con()");
        
        String key = "55756f727977687138317466627a7a";    
        ArrayList<AccidentInfoDto> accidentList = new ArrayList<>();
        
        try {
			String apiURL = "http://openapi.seoul.go.kr:8088/"+key+"/xml/AccInfo/1/1000/";
			
			URL url = new URL(apiURL);
			BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
			String result = bf.readLine();
			bf.close();
			
			JSONObject xmlJSONObj = XML.toJSONObject(result.toString());
			String jsonaccinfo = xmlJSONObj.toString(4);
	        System.out.println(jsonaccinfo);
	        
	        JSONObject obj = new JSONObject(jsonaccinfo);
        	JSONObject AccInfo = obj.getJSONObject("AccInfo");
        	
        	int list_total_count = AccInfo.getInt("list_total_count");
        	System.out.println("결과 :"+ list_total_count);
	        
        	JSONArray rows = AccInfo.optJSONArray("row");

        	if (rows != null) {
                for (int i = 0; i < rows.length(); i++) {
                    JSONObject row = rows.getJSONObject(i);
                    AccidentInfoDto dto = new AccidentInfoDto();
                    
                    dto.setOCCR_DATE(row.getInt("occr_date"));
                    dto.setACC_TYPE(row.getString("acc_type"));
                    dto.setGRS80TM_X(row.getFloat("grs80tm_x"));
                    dto.setGRS80TM_Y(row.getFloat("grs80tm_y"));
                    dto.setEXP_CLR_TIME(row.getInt("exp_clr_time"));
                    dto.setACC_INFO(row.getString("acc_info"));
                    dto.setOCCR_TIME(row.getInt("occr_time"));
                    dto.setACC_ID(row.getInt("acc_id"));
                    dto.setEXP_CLR_DATE(row.getInt("exp_clr_date"));
                    dto.setLINK_ID(row.getInt("link_id"));
                    dto.setACC_DTYPE(row.getString("acc_dtype"));
                    dto.setAcc_road_code(row.getString("acc_road_code"));
                    
                    accidentList.add(dto);
                }
            } else {
                JSONObject row = AccInfo.getJSONObject("row");
                AccidentInfoDto dto = new AccidentInfoDto();
                
                dto.setOCCR_DATE(row.getInt("occr_date"));
                dto.setACC_TYPE(row.getString("acc_type"));
                dto.setGRS80TM_X(row.getFloat("grs80tm_x"));
                dto.setGRS80TM_Y(row.getFloat("grs80tm_y"));
                dto.setEXP_CLR_TIME(row.getInt("exp_clr_time"));
                dto.setACC_INFO(row.getString("acc_info"));
                dto.setOCCR_TIME(row.getInt("occr_time"));
                dto.setACC_ID(row.getInt("acc_id"));
                dto.setEXP_CLR_DATE(row.getInt("exp_clr_date"));
                dto.setLINK_ID(row.getInt("link_id"));
                dto.setACC_DTYPE(row.getString("acc_dtype"));
                dto.setAcc_road_code(row.getString("acc_road_code"));
                
                accidentList.add(dto);
            }
	        
        }catch (Exception e) {
			e.printStackTrace();
		}
        
		
        return accidentList;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/weatherinfo")
	@ResponseBody
	public ArrayList<WeatherinfoDto> weatherinfo(HttpServletRequest request) throws ClassNotFoundException {
	    System.out.println("weatherinfo rest con()");

	    String key = "6acc2fe42d6a07b0c29ae252f7183139";

	    ArrayList<WeatherinfoDto> weatherinfo = new ArrayList<>();

	    try {
	        String apiURL = "http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=" + key + "&lang=kr&units=metric";

	        URL url = new URL(apiURL);
	        BufferedReader bf = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));
	        String result = bf.readLine();
	        bf.close();

	        JSONObject obj = new JSONObject(result);

	        // weather 배열 처리
	        JSONArray weatherArray = obj.getJSONArray("weather");
	        JSONObject weather = weatherArray.getJSONObject(0);

	        JSONObject main = obj.getJSONObject("main");
	        String name = obj.getString("name");

	        WeatherinfoDto dto = new WeatherinfoDto();
	        dto.setDescription(weather.getString("description"));
	        dto.setTemp(main.getFloat("temp"));
	        dto.setTemp_min(main.getFloat("temp_min"));
	        dto.setTemp_max(main.getFloat("temp_max"));
	        dto.setName(name);

	        weatherinfo.add(dto);

	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    return weatherinfo;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/accidata")
	@ResponseBody
	public ArrayList<AcciDataDto> accidata(HttpServletRequest request) throws ClassNotFoundException {
		System.out.println("accidata rest con()");
		
		StrafficDao dao = sqlSession.getMapper(StrafficDao.class);
		
		ArrayList<AcciDataDto> accidataavg = dao.accidataavg();
		
		System.out.println(accidataavg.size());

		return accidataavg;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/accidatatot")
	@ResponseBody
	public ArrayList<AcciDataDto> accidatatot(HttpServletRequest request) throws ClassNotFoundException {
		System.out.println("accidatatot rest con()");
		
		StrafficDao dao = sqlSession.getMapper(StrafficDao.class);
		
		ArrayList<AcciDataDto> accidatatot = dao.accidatatot();
		
		System.out.println(accidatatot.size());
		
		return accidatatot;
	}

	@PostMapping("/accidatareg/{year}")
    @ResponseBody
    public ArrayList<AcciDataDto> accidatareg(@PathVariable int year) throws ClassNotFoundException {
        System.out.println("accidatareg rest con()");
        System.out.println("Year: " + year);

        StrafficDao dao = sqlSession.getMapper(StrafficDao.class);

        // 연도에 따른 데이터 가져오기
        ArrayList<AcciDataDto> accidatareg = dao.accidatareg(year);

        System.out.println(accidatareg.size());

        return accidatareg;
    }	

	@PostMapping("/trafficspeeddata/{year}")
	@ResponseBody
	public ArrayList<AcciDataDto> trafficspeeddata(@PathVariable int year) throws ClassNotFoundException {
		System.out.println("accidatareg rest con()");
		System.out.println("Year: " + year);
		
		StrafficDao dao = sqlSession.getMapper(StrafficDao.class);
		
		// 연도에 따른 데이터 가져오기
		ArrayList<AcciDataDto> sppeddata = dao.sppeddata(year);
		
		System.out.println(sppeddata);
		System.out.println(sppeddata.size());
		
		return sppeddata;
	}	
	
}
