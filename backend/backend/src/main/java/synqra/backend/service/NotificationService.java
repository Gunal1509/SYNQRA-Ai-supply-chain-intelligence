
package synqra.backend.service;

import org.springframework.stereotype.Service;
import synqra.backend.entity.Notification;
import synqra.backend.repository.NotificationRepository;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(
            NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(
            Long userId,
            String message,
            String type) {

        Notification notification = new Notification();

        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);

        return notificationRepository.save(notification);
    }

  
    public List<Notification> getNotifications(Long userId) {
        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(userId);
    }

    public long getUnreadCount(Long userId) {
        return notificationRepository
                .countByUserIdAndIsReadFalse(userId);
    }


    public Notification markAsRead(Long notificationId, Long userId) {

        Notification notification = notificationRepository
                .findById(notificationId)
                .orElseThrow(() ->
                        new RuntimeException("Notification not found"));

        if (!notification.getUserId().equals(userId)) {
            throw new RuntimeException(
                    "You cannot access another user's notification");
        }

        notification.setRead(true);

        return notificationRepository.save(notification);
    }
}
