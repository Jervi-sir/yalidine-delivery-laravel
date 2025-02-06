// Notifications Component (Example - Adapt as needed)
import { useState, useEffect } from "react";
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Bell } from "lucide-react"; // Import a notification icon

interface Notification {
  id: number;
  type: "email" | "sms" | "in-app";
  message: string;
  read: boolean;
  createdAt: string; // Or Date object
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "in-app",
      message: "Your order (ORD12345) has been shipped!",
      read: false,
      createdAt: "2024-07-27 10:00 AM",
    },
    {
      id: 2,
      type: "email",
      message: "Order confirmation for ORD12346.",
      read: true,
      createdAt: "2024-07-26 09:30 AM",
    },
    // ... more fake notifications
  ]);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Calculate unread notification count
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) => ({ ...n, read: true }))
    );
  };

  return (
    <ClientLayout path={['Notifications']}>
      <Head title="Notifications" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>

        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Bell className="h-6 w-6 mr-2" /> {/* Display the notification icon */}
              <span className="text-lg font-medium">
                {unreadCount > 0 ? `${unreadCount} Unread Notifications` : "No New Notifications"}
              </span>
            </div>
            {unreadCount > 0 && (
              <Button onClick={handleMarkAllAsRead} size="sm">
                Mark All as Read
              </Button>
            )}
          </div>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`border rounded p-4 mb-2 text-white ${notification.read ? "bg-neutral-950" : ""}`} // Style read notifications
                >
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-500">{notification.createdAt}</p>
                  {!notification.read && (
                    <Button onClick={() => handleMarkAsRead(notification.id)} size="sm" className="mt-2">
                      Mark as Read
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications yet.</p>
          )}
        </Card>
      </div>
    </ClientLayout>
  );
};

