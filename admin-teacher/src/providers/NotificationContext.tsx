import { notification } from "antd";
import React, { createContext, ReactNode, useContext } from "react";

// Define the context type
interface NotificationContextType {
    _notification: {
        Info: (message: string, description?: string) => void;
        Success: (message: string, description?: string) => void;
        Warning: (message: string, description?: string) => void;
        Error: (message: string, description?: string) => void;
    }
}

// Create the context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider Component
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    // Function to show notification
    const showNotification = (type: "info" | "success" | "warning" | "error", message: string, description?: string) => {
        api[type]({
            message,
            description,
            placement: "topRight",
        });
    };

    return (
        <NotificationContext.Provider value={{
            _notification: {
                Info: (msg, desc) => showNotification("info", msg, desc),
                Success: (msg, desc) => showNotification("success", msg, desc),
                Warning: (msg, desc) => showNotification("warning", msg, desc),
                Error: (msg, desc) => showNotification("error", msg, desc),
            }
        }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

// Custom Hook to use Notification Context
export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotificationContext must be used within a NotificationProvider");
    }
    return context;
};
