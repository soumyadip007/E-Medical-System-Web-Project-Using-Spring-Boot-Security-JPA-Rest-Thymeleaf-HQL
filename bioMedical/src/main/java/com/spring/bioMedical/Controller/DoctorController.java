package com.spring.bioMedical.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.bioMedical.entity.Admin;
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

		// get last seen
		String username="";
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails) {
		   username = ((UserDetails)principal).getUsername();
		  String Pass = ((UserDetails)principal).getPassword();
		  System.out.println("One + "+username+"   "+Pass);
		  
		  
		} else {
		 username = principal.toString();
		  System.out.println("Two + "+username);
		}
		
		Admin admin = adminServiceImplementation.findByEmail(username);
				 
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");  
		    Date now = new Date();  
		    
		         String log=now.toString();
		    
		         admin.setLastseen(log);
		         
		         adminServiceImplementation.save(admin);
		
		
		
		return "doctor/index";
	}
	
	
}
