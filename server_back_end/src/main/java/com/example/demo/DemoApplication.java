package com.example.demo;

import java.util.stream.Stream;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

/* 	@Bean
	ApplicationRunner init(UserRepository repository){
		return args -> {
			Stream.of("Jane", "Joe", "John").forEach(name ->{
				User user = new User();
				user.setUsername(name);
				user.setPassword("psw");
				repository.save(user);
			});
			repository.findAll().forEach(System.out::println);
		};
	} */

}

