package com.spring.bioMedical.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Admin;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import com.spring.bioMedical.entity.*;
import com.spring.bioMedical.service.AdminServiceImplementation;
import com.spring.bioMedical.service.UserService;
@Controller
@RequestMapping("/admin")
public class AdminController {

	private UserService userService;

	private AdminServiceImplementation adminServiceImplementation;
	
	@Autowired
	public AdminController(UserService userService,AdminServiceImplementation obj ) {
		this.userService = userService;
		adminServiceImplementation=obj;
	}
	
	
	@RequestMapping("/userdetails")
	public String index(Model model){
		
		
		List<User> list=userService.findAll();
		
		
		
		for (User user : list) {
		
//			 if (user.getRole().equalsIgnoreCase("ROLE_ADMIN")) {
//			        list.remove(user);
//			    }
//		//	System.out.println(user);
//			
		}
		
		// add to the spring model
		model.addAttribute("user", list);
		
		
		return "admin/user";
	}
	
	@RequestMapping("/admindetails")
	public String adminDetails(Model model){
		
		
		List<com.spring.bioMedical.entity.Admin> list=adminServiceImplementation.findAll();
		
		
		
		// add to the spring model
		model.addAttribute("user", list);
		
		
		return "admin/admin";
	}
	
	
	@RequestMapping("/add-doctor")
	public String addDoctor(){
		

		
		
		return "admin/addDoctor";
	}

}
