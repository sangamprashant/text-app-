import { Table, Tag, message } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthenticationContext";
import { apiRequest } from "../../../utilities/apis/apiRequest";

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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiRequest(`/teacher-student?type=${type}`, "GET", undefined, {
                    Authorization: `Bearer ${token}`,
                });
                setUsers(response.data);
            } catch (error) {
                message.error("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [type, token]);

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
