import React, { useEffect, useState } from "react";
import { FaBell, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../lib/config";
import { socket } from "../lib/socket";

const TopIcons = () => {
  const navigate = useNavigate();
  const [hasUnread, setHasUnread] = useState(false);

  const checkUnreadNotifications = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('doctorToken');
      const res = await axios.get(`${API_BASE_URL}/api/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHasUnread(res.data.count > 0);
    } catch (error) {
      console.error('Failed to fetch unread notifications:', error);
    }
  };

  useEffect(() => {
    checkUnreadNotifications();

    // Listen for new notifications
    socket.on('receiveNotification', () => {
      setHasUnread(true);
    });

    // Update unread status when notifications are marked as read
    socket.on('notificationRead', () => {
      checkUnreadNotifications();
    });

    return () => {
      socket.off('receiveNotification');
      socket.off('notificationRead');
    };
  }, []);

  return (
    <div className="flex items-center gap-5">
      {/* Chat Icon */}
      <div
        onClick={() => navigate("/doctor/ai-chat")}
        title="Chat"
        className="relative group cursor-pointer"
      >
        <FaCommentDots className="text-2xl text-[#0A4D68] group-hover:text-[#08374f] transition duration-200" />
      </div>

      {/* Notification Icon with Dot */}
      <div
        onClick={() => navigate("/doctor/notifications")}
        title="Notifications"
        className="relative group cursor-pointer"
      >
        <FaBell className="text-2xl text-[#0A4D68] group-hover:text-[#08374f] transition duration-200" />

        {/* Red dot for unread notifications */}
        {hasUnread && (
          <>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </>
        )}
      </div>
    </div>
  );

};

export default TopIcons;
