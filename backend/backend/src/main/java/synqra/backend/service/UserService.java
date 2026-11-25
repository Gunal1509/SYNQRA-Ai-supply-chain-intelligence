
package synqra.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import synqra.backend.entity.User;
import synqra.backend.repository.UserRepository;
import synqra.backend.security.JwtService;

import java.util.Map;

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
            throw new RuntimeException("Email already registered");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        user.setRole("USER");
        user.setActive(true);

        return userRepository.save(user);
    }

    // LOGIN
    public Map<String, Object> login(
            String email,
            String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        if (!user.isActive()) {
            throw new RuntimeException("Account is inactive");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        return Map.of(
                "token", token,
                "role", user.getRole(),
                "userId", user.getId()
        );
    }
}
