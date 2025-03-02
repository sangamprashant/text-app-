import { useEffect, useState } from "react";
import { apiRequest } from "../../../utilities/apis/apiRequest";
import { useAuth } from "../../../providers/AuthenticationContext";
import { ColumnsType } from "antd/es/table";
import { Table, Button, Space, Card } from "antd";

export const ViewQuizComponent = () => {
    const { token } = useAuth()
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await apiRequest("/teacher.quiz", "GET", undefined, {
                    Authorization: `Bearer ${token}`,
                })
                setQuizzes(res.data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const columns: ColumnsType<Question> = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Time (mins)",
            dataIndex: "time",
            key: "time",
            render: (time: number) => `${time} mins`,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: Question) => (
                <Space>
                    <Button type="primary">View</Button>
                    <Button danger>Delete</Button>
                </Space>
            ),
        },
    ];


    return (
        <Card className="p-2">
            <Table
                columns={columns}
                dataSource={quizzes}
                loading={loading}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
            />
        </Card>
    )
}
