package synqra.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import synqra.backend.entity.User;
import synqra.backend.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userRepository.findAll()
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean active) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setActive(active);

        userRepository.save(user);

        return ResponseEntity.ok(
                "User status updated"
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id) {

        if (!userRepository.existsById(id)) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        userRepository.deleteById(id);

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }
}