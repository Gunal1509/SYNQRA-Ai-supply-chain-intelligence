package synqra.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import synqra.backend.entity.User;
import synqra.backend.repository.UserRepository;
import synqra.backend.security.JwtService;
import java.util.Map;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public User signup(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        // Hash password
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        // Normal signup users are USER
        user.setRole("USER");

        // New account is active
        user.setActive(true);

        return userRepository.save(user);
    }

    public Map<String, String> login(String email, String password) {

        User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("User not found"));

    if (!passwordEncoder.matches(
            password,
            user.getPassword())) {

        throw new RuntimeException("Invalid password");
    }

    String token = jwtService.generateToken(
            user.getEmail(),
            user.getRole()
    );

    return Map.of(
            "token", token,
            "role", user.getRole()
    );
}
}