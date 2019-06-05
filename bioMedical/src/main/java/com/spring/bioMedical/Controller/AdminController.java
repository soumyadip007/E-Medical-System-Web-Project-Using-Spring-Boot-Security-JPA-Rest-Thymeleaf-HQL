package com.spring.bioMedical.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.bioMedical.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {

	private UserService userService;

	@Autowired
	public AdminController(UserService userService) {
		this.userService = userService;
	}
	
	
	@RequestMapping("/index")
	public String index(Model model){
		
		
		return "admin/success";
	}

}
