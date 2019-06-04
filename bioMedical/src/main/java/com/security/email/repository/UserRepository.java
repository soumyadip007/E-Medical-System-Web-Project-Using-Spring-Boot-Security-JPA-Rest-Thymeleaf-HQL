package com.security.email.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.security.email.entity.User;

@Repository("userRepository")
public interface UserRepository extends CrudRepository<User, Long> {
	
	 User findByEmail(String email);
	
	 User findByConfirmationToken(String confirmationToken);
}