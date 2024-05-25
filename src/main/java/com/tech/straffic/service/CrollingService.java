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

import java.io.IOException;
import java.security.cert.CertificateException;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.security.cert.X509Certificate;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

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
						// 이 부분은 무시해도 됩니다.
						
					}
					@Override
					public void checkServerTrusted(java.security.cert.X509Certificate[] arg0, String arg1)
							throws CertificateException {
						// 이 부분은 무시해도 됩니다.
						
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
	
		String URL = "https://topis.seoul.go.kr/";
		try {
			Document doc = Jsoup.connect(URL).get();
			
			String topishtml = doc.html();
			
			System.out.println("topishtml : " + topishtml);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

}