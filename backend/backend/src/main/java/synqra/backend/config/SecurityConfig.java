
package synqra.backend.config;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import synqra.backend.exception.ErrorResponse;
import synqra.backend.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ObjectMapper objectMapper;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            ObjectMapper objectMapper) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.objectMapper = objectMapper;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173"));

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        configuration.setAllowedHeaders(
                List.of("Authorization", "Content-Type"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                .requestMatchers(
                        "/auth/login",
                        "/auth/signup"
                ).permitAll()

                .requestMatchers("/api/admin/**")
                .hasRole("ADMIN")

                .anyRequest().authenticated()
            )

            // 401 Unauthorized and 403 Forbidden handling
            .exceptionHandling(exception -> exception

                // 401 - User is not authenticated
                .authenticationEntryPoint((request, response, authException) -> {

                    writeErrorResponse(
                            request,
                            response,
                            HttpServletResponse.SC_UNAUTHORIZED,
                            "Unauthorized. Please login."
                    );
                })

                // 403 - User does not have permission
                .accessDeniedHandler((request, response, accessDeniedException) -> {

                    writeErrorResponse(
                            request,
                            response,
                            HttpServletResponse.SC_FORBIDDEN,
                            "You do not have permission to access this resource."
                    );
                })
            )

            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    // Common JSON error response
    private void writeErrorResponse(
            HttpServletRequest request,
            HttpServletResponse response,
            int status,
            String message) throws IOException {

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                status,
                message,
                request.getRequestURI()
        );

        response.setStatus(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        objectMapper.writeValue(response.getWriter(), error);
    }
}
