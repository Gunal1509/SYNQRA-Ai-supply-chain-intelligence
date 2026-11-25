
package synqra.backend.controller;

import synqra.backend.entity.Notification;
import synqra.backend.entity.User;
import synqra.backend.repository.UserRepository;
import synqra.backend.service.NotificationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public NotificationController(
            NotificationService notificationService,
            UserRepository userRepository) {

        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    // GET LOGGED-IN USER NOTIFICATIONS
    @GetMapping("/user/{userId}")
    public List<Notification> getNotifications(
            @PathVariable Long userId,
            Authentication authentication) {

        User user = getLoggedInUser(authentication);

        if (!user.getId().equals(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You cannot access another user's notifications");
        }

        return notificationService.getNotifications(userId);
    }

    // GET UNREAD COUNT
    @GetMapping("/unread-count")
    public Map<String, Long> getUnreadCount(
            Authentication authentication) {

        User user = getLoggedInUser(authentication);

        long count =
                notificationService.getUnreadCount(user.getId());

        return Map.of("unreadCount", count);
    }

    // MARK NOTIFICATION AS READ
    @PutMapping("/{id}/read")
    public Notification markAsRead(
            @PathVariable Long id,
            Authentication authentication) {

        User user = getLoggedInUser(authentication);

        return notificationService.markAsRead(
                id,
                user.getId());
    }

    private User getLoggedInUser(Authentication authentication) {

        if (authentication == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Please log in");
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found"));
    }
}
