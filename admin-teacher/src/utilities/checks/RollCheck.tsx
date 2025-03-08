import React from "react";
import { useAuth } from "../../providers/AuthenticationContext";

interface RollCheckProps {
    children: React.ReactElement;
    role: "admin" | "teacher";
}

const RollCheck: React.FC<RollCheckProps> = ({ children, role }) => {
    const { user } = useAuth()
    if (user?.role !== role) {
        return <div>Access Denied</div>; 
    }

    return children;
};

export default RollCheck;
