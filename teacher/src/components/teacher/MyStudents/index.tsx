import { Table } from "antd";
import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthenticationContext";
import { useNotificationContext } from "../../../providers/NotificationContext";
import { apiRequest, errorMsg } from "../../../utilities/apis/apiRequest";


interface Students {
    _id: string;
    name: string;
    email: string;
    role: "student";
}

const MyStudentsComponent = () => {
    const { token } = useAuth()
    const { _notification } = useNotificationContext()
    const [users, setUsers] = useState<Students[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;

            setLoading(true);
            try {
                const response = await apiRequest(`/teacher/my-students`, "GET", undefined, {
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
    }, [token]);

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
    )
}

export default MyStudentsComponent