import React, { useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationRead
} from "../Services/service";
import "../styles/Notification.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with the actual logged-in user's ID
  const userId = localStorage.getItem("userId");

  const loadNotifications = async () => {
    try {
      const data = await getMyNotifications(userId);
      setNotifications(data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, read: true } : item
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((item) => (
          <div
            key={item.id}
            className={`notification-card ${
              item.read ? "read" : "unread"
            }`}
          >
            <div>
              <strong>{item.type}</strong>
              <p>{item.message}</p>
              <small>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : ""}
              </small>
            </div>

            {!item.read && (
              <button onClick={() => handleRead(item.id)}>
                Mark as read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;