package com.security.email.controller;

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
		
		return "success";
	}
	
	@RequestMapping("/")
	public String x(){
		
		return "success";
	}

}
