package com.spring.bioMedical.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

	@RequestMapping("/index")
	public String index(){

		
		return "user/success";
	}
	
	
}
