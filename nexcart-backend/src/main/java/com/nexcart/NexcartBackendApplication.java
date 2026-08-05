package com.nexcart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NexcartBackendApplication {

	private static final Logger logger = LoggerFactory.getLogger(NexcartBackendApplication.class);

	public static void main(String[] args) {
		logger.info("Starting Nexcart backend application");
		SpringApplication.run(NexcartBackendApplication.class, args);
	}

}
