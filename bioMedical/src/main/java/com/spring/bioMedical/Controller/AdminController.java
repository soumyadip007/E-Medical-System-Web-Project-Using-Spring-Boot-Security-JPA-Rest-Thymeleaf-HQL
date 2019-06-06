package com.spring.bioMedical.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	
	@GetMapping("/add-doctor")
	public String showFormForAdd(Model theModel) {
		
		// create model attribute to bind form data
		Admin admin = new Admin();
		
		theModel.addAttribute("doctor", admin);
		
		return "admin/addDoctor";
	}
	
	
	@PostMapping("/save-doctor")
	public String saveEmployee(@ModelAttribute("doctor") Admin admin) {
		
		// save the employee
	//	admin.setId(0);
		
		admin.setRole("ROLE_DOCTOR");
		
		admin.setPassword("default");
		
		admin.setEnabled(true);
		
		admin.setConfirmationToken("ByAdmin-Panel");
		
		System.out.println(admin);
		
		adminServiceImplementation.save(admin);
		
		// use a redirect to prevent duplicate submissions
		return "redirect:/admin/userdetails";
	}
	
	

	@GetMapping("/add-admin")
	public String showForm(Model theModel) {
		
		// create model attribute to bind form data
		Admin admin = new Admin();
		
		theModel.addAttribute("doctor", admin);
		
		return "admin/addDoctor";
	}
	
	
	@PostMapping("/save-admin")
	public String saveEmploye(@ModelAttribute("doctor") Admin admin) {
		
		// save the employee
	//	admin.setId(0);
		
		admin.setRole("ROLE_DOCTOR");
		
		admin.setPassword("default");
		
		admin.setEnabled(true);
		
		admin.setConfirmationToken("ByAdmin-Panel");
		
		System.out.println(admin);
		
		adminServiceImplementation.save(admin);
		
		// use a redirect to prevent duplicate submissions
		return "redirect:/admin/userdetails";
	}
	
}
