package com.spring.bioMedical.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.bioMedical.entity.Appointment;

@Repository("adminRepository")
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

}