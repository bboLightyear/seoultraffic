package com.tech.straffic;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StrafficRestController {
	
	@RequestMapping(method = RequestMethod.POST,value = "/bstorageinfo")
	public String bstorageinfo(HttpServletRequest request) throws ClassNotFoundException {
		System.out.println("bstorageinfo rest con()");
		
		StringBuilder result = new StringBuilder();
        try {
            String apiUrl = "http://openapi.seoul.go.kr:8088/55756f727977687138317466627a7a/json/bikeList/1/10/";

            URL url = new URL(apiUrl);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(),"UTF-8"));

            String returnLine;

            while((returnLine = bufferedReader.readLine()) != null) {
                result.append(returnLine + "\n");
            }
            urlConnection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result.toString();
	}

}
