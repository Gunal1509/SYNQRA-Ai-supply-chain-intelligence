package synqra.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import synqra.backend.entity.User;
import synqra.backend.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {

        return userService.signup(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User user) {

        Map<String, String> result =
                userService.login(
                        user.getEmail(),
                        user.getPassword()
                );

        return ResponseEntity.ok(result);
    }
}