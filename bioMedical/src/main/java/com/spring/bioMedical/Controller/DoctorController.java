package com.spring.bioMedical.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.bioMedical.service.AdminServiceImplementation;
import com.spring.bioMedical.service.UserService;

@Controller
@RequestMapping("/doctor")
public class DoctorController {

	private UserService userService;

	private AdminServiceImplementation adminServiceImplementation;
	
	@Autowired
	public DoctorController(UserService userService,AdminServiceImplementation obj ) {
		this.userService = userService;
		adminServiceImplementation=obj;
		 
	}
	
	
	@RequestMapping("/index")
	public String index(){

		
		return "doctor/index";
	}
	
	
}
