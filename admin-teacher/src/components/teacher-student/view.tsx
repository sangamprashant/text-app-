import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../providers/AuthenticationContext";
import { useNotificationContext } from "../../providers/NotificationContext";
import { apiRequest, errorMsg } from "../../utilities/apis/apiRequest";

interface User {
    _id: string;
    name: string;
    email: string;
    role: "teacher" | "student";
    course?: {
        _id: string;
        name: string;
        code: number
    };
}

const ViewUsers: React.FC<{ type: "teacher" | "student" }> = ({ type }) => {
    const { token } = useAuth()
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { _notification } = useNotificationContext()
    const { code } = useParams()

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;

            setLoading(true);
            try {
                const response = await apiRequest(`/teacher-student?type=${type}&subject=${code}`, "GET", undefined, {
                    Authorization: `Bearer ${token}`,
                });

                if (response && response.data) {
                    setUsers(response.data);
                }
            } catch (error) {
                _notification.Error("Error", errorMsg(error));
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [type, token, code]);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: string) => (
                <Tag color={role === "teacher" ? "green" : "blue"}>{role.toUpperCase()}</Tag>
            ),
        },
        {
            title: "Course",
            dataIndex: "course",
            key: "course",
            render: (_: unknown, data: User) => data.course?.name || "N/A",
        },
    ];

    return (
        <div className="p-4">
            <h2 className="mb-4">Users List</h2>
            <Table
                columns={columns}
                dataSource={users.map(user => ({ ...user, key: user._id }))}
                loading={loading}
                bordered
            />
        </div>
    );
};

export default ViewUsers;
