package com.spring.bioMedical.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.bioMedical.entity.Admin;
import com.spring.bioMedical.repository.AdminRepository;
import com.spring.bioMedical.repository.AppointmentRepository;

@Service
public class AppointmentServiceImplementation  {

	private AppointmentRepository appointmentRepository;

	//inject employee dao
	@Autowired   //Adding bean id @Qualifier
	public AppointmentServiceImplementation( AppointmentRepository obj)
	{
		appointmentRepository=obj;
	}
	
	
	public void save(Admin admin)
	{
		
		appointmentRepository.save(admin);
	}


	
}
