package com.spring.bioMedical.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {



	@RequestMapping("/index")
	public String index(Model model){

		
		return "admin/success";
	}

}
