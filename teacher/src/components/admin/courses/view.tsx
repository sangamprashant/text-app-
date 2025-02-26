import { Button, Modal, Space, Table } from "antd";
import React, { useState } from "react";
import { useCoursesList } from "../../../providers/CoursesListContext";

const ViewCourse: React.FC = () => {
    const { courses, loading, deleteCourse } = useCoursesList()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    // Show Modal for Delete Confirmation
    const showDeleteModal = (course: Course) => {
        setSelectedCourse(course);
        setIsModalVisible(true);
    };

    // Handle Delete Confirm
    const handleDelete = async () => {
        if (!selectedCourse) return;
        deleteCourse(selectedCourse._id)
    };

    const columns = [
        {
            title: "Course Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Course Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Action",
            key: "action",
            render: (_: any, record: Course) => (
                <Space>
                    <Button type="primary" danger onClick={() => showDeleteModal(record)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4">
            <Table
                dataSource={courses}
                columns={columns}
                loading={loading}
                rowKey="_id"
                bordered
                pagination={false}
            />

            {/* Delete Confirmation Modal */}
            <Modal
                title="Confirm Delete"
                open={isModalVisible}
                onOk={handleDelete}
                onCancel={() => setIsModalVisible(false)}
                okText="Yes, Delete"
                cancelText="Cancel"
                okType="danger"
            >
                <p>Are you sure you want to delete <strong>{selectedCourse?.name}</strong>?</p>
                <p>This action cannot be undone.</p>
            </Modal>
        </div>
    );
};

export default ViewCourse;
