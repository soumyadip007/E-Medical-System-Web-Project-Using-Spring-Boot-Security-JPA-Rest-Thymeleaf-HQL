package com.spring.bioMedical.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.bioMedical.entity.Admin;
import com.spring.bioMedical.entity.User;

@Repository("adminRepository")
public interface AppointmentRepository extends JpaRepository<Admin, Long> {

	Admin findByEmail(String user);
	
	List<Admin> findByRole(String user);
}