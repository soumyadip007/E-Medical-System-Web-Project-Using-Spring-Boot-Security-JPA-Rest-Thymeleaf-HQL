package com.spring.bioMedical.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {

	@GetMapping("/index")
	public String index(){

		
		return "user/index";
	}
	

	@GetMapping("/about")
	public String about(){

		
		return "user/about";
	}
	
	@GetMapping("/blog-single")
	public String bs(){

		
		return "user/blog-single";
	}
	
	@GetMapping("/blog")
	public String blog(){

		
		return "user/blog";
	}
	
	@GetMapping("/contact")
	public String contact(){

		
		return "user/contact";
	}
	

	@GetMapping("/department-single")
	public String d(){

		
		return "user/department-single";
	}

	@GetMapping("/departments")
	public String dep(){

		
		return "user/departments";
	}

	@GetMapping("/doctor")
	public String doctor(){

		
		return "user/doctor";
	}
}