package com.spring.bioMedical.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/doctor")
public class DoctorController {

	@RequestMapping("/index")
	public String index(){

		
		return "doctor/index";
	}
	
	
}
