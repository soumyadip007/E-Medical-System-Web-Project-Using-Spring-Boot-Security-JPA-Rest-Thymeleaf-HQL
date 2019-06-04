package com.spring.bioMedical.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {


	@RequestMapping("/showMyLoginPage")
	public String showHome()
	{
		
		return "login";
	}

	

	@RequestMapping("/authenticateTheUser")
	public String shwHome()
	{
		
		return "user/success";
	}
	
	@RequestMapping("/")
	public String x(){
		
		return "";
	}

	@RequestMapping("/admin")
	public String x1(){
		
		return "user/success";
	}
	
	@RequestMapping("/index")
	public String x11(){
		
		return "user/success";
	}

}
