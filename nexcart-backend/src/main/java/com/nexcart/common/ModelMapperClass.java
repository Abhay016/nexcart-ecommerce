package com.nexcart.common;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperClass {

    private static final Logger logger = LoggerFactory.getLogger(ModelMapperClass.class);

    @Bean
    public ModelMapper modelMapper() {
        logger.debug("Creating ModelMapper bean");
        return new ModelMapper();
    }

}
