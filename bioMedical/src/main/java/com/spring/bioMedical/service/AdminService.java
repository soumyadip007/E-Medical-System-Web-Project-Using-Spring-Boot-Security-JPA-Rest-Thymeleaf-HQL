package com.spring.bioMedical.service;

import java.util.List;

import com.spring.bioMedical.entity.User;

public interface AdminService {

	public List<User> findAll();

	public void save(User user);
	
}
