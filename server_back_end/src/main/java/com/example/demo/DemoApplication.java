package com.example.demo;

import java.util.stream.Stream;

import com.sun.tools.javac.util.List;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

 	@Bean
	ApplicationRunner init(ScoreRepository repository, TutorialRepository tRepo, QuestionRepository qRepo){
		return args -> {
			System.out.println(qRepo.findById(1).get());
		};
	} 

}

