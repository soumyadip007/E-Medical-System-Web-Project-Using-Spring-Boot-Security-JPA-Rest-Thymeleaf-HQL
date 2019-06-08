package com.spring.bioMedical.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.springframework.data.annotation.Transient;

@Entity
@Table(name = "app")
public class Appointment {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Column(name = "username", nullable = false, unique = true)
	private String name;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "data")
	private String date;
	
	@Column(name = "description")
	private String description;
	
	

}