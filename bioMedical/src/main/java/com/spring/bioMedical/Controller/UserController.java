package com.spring.bioMedical.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.bioMedical.entity.Admin;
import com.spring.bioMedical.entity.Appointment;
import com.spring.bioMedical.service.AdminServiceImplementation;
import com.spring.bioMedical.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {

	private UserService userService;

	private AdminServiceImplementation adminServiceImplementation;
	
	@Autowired
	public UserController(UserService userService,AdminServiceImplementation obj ) {
		this.userService = userService;
		adminServiceImplementation=obj;
		 
	}
	
	@GetMapping("/index")
	public String index(Model model){
		
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
		
		
		         
		 Appointment obj=new Appointment();
		 
		 model.addAttribute("app",obj);
		
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