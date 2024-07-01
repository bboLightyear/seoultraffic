//package com.tech.straffic.service;
//
//import java.io.IOException;
//import java.security.cert.CertificateException;
//
//import javax.net.ssl.HostnameVerifier;
//import javax.net.ssl.HttpsURLConnection;
//import javax.net.ssl.SSLContext;
//import javax.net.ssl.SSLSession;
//import javax.net.ssl.TrustManager;
//import javax.net.ssl.X509TrustManager;
//import javax.security.cert.X509Certificate;
//
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//
//import org.springframework.ui.Model;
//
//public class crollingService implements StrafficService {
//	
//	static {
//        // SSL 인증서 검증 비활성화
//        try {
//            TrustManager[] trustAllCerts = new TrustManager[] {
//                new X509TrustManager() {
//                    public java.security.cert.X509Certificate[] getAcceptedIssuers() {
//                        return null;
//                    }
//                    public void checkClientTrusted(X509Certificate[] certs, String authType) {
//                    }
//                    public void checkServerTrusted(X509Certificate[] certs, String authType) {
//                    }
//					@Override
//					public void checkClientTrusted(java.security.cert.X509Certificate[] arg0, String arg1)
//							throws CertificateException {
//						// TODO Auto-generated method stub
//						
//					}
//					@Override
//					public void checkServerTrusted(java.security.cert.X509Certificate[] arg0, String arg1)
//							throws CertificateException {
//						// TODO Auto-generated method stub
//						
//					}
//                }
//            };
//    
//            SSLContext sc = SSLContext.getInstance("SSL");
//            sc.init(null, trustAllCerts, new java.security.SecureRandom());
//            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
//    
//            // Hostname verification 비활성화
//            HostnameVerifier allHostsValid = new HostnameVerifier() {
//                public boolean verify(String hostname, SSLSession session) {
//                    return true;
//                }
//            };
//            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//
//
//	@Override
//	public void execute(Model model) {
//	
//		String URL = "https://topis.seoul.go.kr/";
//		try {
//			Document doc = Jsoup.connect(URL).get();
//			
//			String topishtml = doc.html();
//			
//			System.out.println("topishtml : " + topishtml);
//			
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		
//	}
//
//}

package com.tech.straffic.service;

import java.security.cert.CertificateException;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.security.cert.X509Certificate;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import org.springframework.ui.Model;

// 크롤링 서비스 클래스
public class CrollingService implements StrafficService {
	
	static {
        // SSL 인증서 검증 비활성화
        try {
            TrustManager[] trustAllCerts = new TrustManager[] {
                new X509TrustManager() {
                    public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                        return null;
                    }
                    public void checkClientTrusted(X509Certificate[] certs, String authType) {
                    }
                    public void checkServerTrusted(X509Certificate[] certs, String authType) {
                    }
					@Override
					public void checkClientTrusted(java.security.cert.X509Certificate[] arg0, String arg1)
							throws CertificateException {
						
					}
					@Override
					public void checkServerTrusted(java.security.cert.X509Certificate[] arg0, String arg1)
							throws CertificateException {
						
					}
                }
            };
    
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
    
            // Hostname verification 비활성화
            HostnameVerifier allHostsValid = new HostnameVerifier() {
                public boolean verify(String hostname, SSLSession session) {
                    return true;
                }
            };
            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

	 @Override
	    public void execute(Model model) {
		 
		 System.setProperty("webdriver.chrome.driver", "C:\\Users\\bokun\\OneDrive\\바탕 화면\\BgTrafficPrj\\chromedriver-win64\\chromedriver.exe");
	        
	        // ChromeOptions 설정
	        ChromeOptions options = new ChromeOptions();
	        options.setCapability("ignoreProtectedModeSettings", true);
	        options.addArguments("--remote-allow-origins=*");
	        options.addArguments("headless");


	        // WebDriver 생성
	        WebDriver driver = new ChromeDriver(options);

	        try {
	        	
	            // URL로 이동
	            driver.get("https://topis.seoul.go.kr/");
	            
	            // 페이지가 완전히 로드될 때까지 대기
	            Thread.sleep(5000); // 필요한 경우 더 긴 시간 대기
	            
	            // id가 spdStat2Det인 요소
	            WebElement spdStat1DetElement = driver.findElement(By.id("spdStat1Det"));
	            String spdStat1Det = spdStat1DetElement != null ? spdStat1DetElement.getText() : "N/A";
	            
	            // id가 spdStat2인 요소.
	            WebElement spdStat1Element = driver.findElement(By.id("spdStat1"));
	            String spdStat1 = spdStat1Element != null ? spdStat1Element.getText() : "N/A";

	            // id가 spdStat2Det인 요소
	            WebElement spdStat2DetElement = driver.findElement(By.id("spdStat2Det"));
	            String spdStat2Det = spdStat2DetElement != null ? spdStat2DetElement.getText() : "N/A";
	            
	            // id가 spdStat2인 요소
	            WebElement spdStat2Element = driver.findElement(By.id("spdStat2"));
	            String spdStat2 = spdStat2Element != null ? spdStat2Element.getText() : "N/A";
	            
	            System.out.println("spdStat1Det : " + spdStat1Det);
	            System.out.println("spdStat1 : " + spdStat1);
	            System.out.println("spdStat2Det : " + spdStat2Det);
	            System.out.println("spdStat2 : " + spdStat2);
	            
	            model.addAttribute("spdStat1Det",spdStat1Det);
	            model.addAttribute("spdStat1",spdStat1);
	            model.addAttribute("spdStat2Det",spdStat2Det);
	            model.addAttribute("spdStat2",spdStat2);
	            
	        } catch (Exception e) {
	            e.printStackTrace();
	        } finally {
	            // WebDriver 종료.
	            driver.quit();
	        }
	    }

}