import React, { useEffect, useState } from "react";
import { FaBell, FaCommentDots, FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../lib/config";
import { socket } from "../lib/socket";

const TopIcons = ({ earnings = 0 }) => {
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

    socket.on('receiveNotification', () => {
      setHasUnread(true);
    });

    socket.on('notificationRead', () => {
      checkUnreadNotifications();
    });

    return () => {
      socket.off('receiveNotification');
      socket.off('notificationRead');
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Earnings Wallet */}
      <button
        onClick={() => navigate("/doctor/wallet")}
        title="Wallet"
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#E8F4F8] hover:bg-[#0A4D68] hover:text-white transition-all duration-200 group border-2 border-[#E8F4F8] hover:border-[#0A4D68]"
      >
        <FaWallet className="text-base text-[#0A4D68] group-hover:text-white transition-colors duration-200" />
        <span className="text-sm font-bold text-[#0A4D68] group-hover:text-white transition-colors duration-200 hidden sm:inline">
          ₹{earnings?.toLocaleString() || "0"}
        </span>
      </button>

      {/* Chat Icon */}
      <button
        onClick={() => navigate("/doctor/ai-chat")}
        title="Chat"
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#E8F4F8] hover:bg-[#0A4D68] transition-all duration-200 group border-2 border-[#E8F4F8] hover:border-[#0A4D68]"
      >
        <FaCommentDots className="text-base text-[#0A4D68] group-hover:text-white transition-colors duration-200" />
      </button>

      {/* Notification Icon with Dot */}
      <button
        onClick={() => navigate("/doctor/notifications")}
        title="Notifications"
        className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-[#E8F4F8] hover:bg-[#0A4D68] transition-all duration-200 group border-2 border-[#E8F4F8] hover:border-[#0A4D68]"
      >
        <FaBell className="text-base text-[#0A4D68] group-hover:text-white transition-colors duration-200" />

        {hasUnread && (
          <>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </>
        )}
      </button>
    </div>
  );
};

export default TopIcons;
