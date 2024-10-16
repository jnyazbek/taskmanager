package com.taskapp.task_manager.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Permettre CORS pour tous les endpoints commençant par /api/
                .allowedOrigins("http://localhost:4200")  // Autoriser les requêtes provenant de localhost:4200
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Autoriser ces méthodes HTTP
                .allowedHeaders("*");  // Autoriser tous les headers
    }
}
