package com.telusko.BackendStudentApp;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title="Student Application",version = "1.5",description = "This API is about Student management"
		),
		servers = @Server(url = "http://localhost:8080",
		description = "This is server info where our app is deployed")
)
public class BackendStudentAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendStudentAppApplication.class, args);
	}

}
