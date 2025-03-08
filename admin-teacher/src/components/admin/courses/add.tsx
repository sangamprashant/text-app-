import { Button, Form, Input, InputNumber } from "antd";
import React, { useState } from "react";
import { useAuth } from "../../../providers/AuthenticationContext";
import { useCoursesList } from "../../../providers/CoursesListContext";
import { useNotificationContext } from "../../../providers/NotificationContext";
import { apiRequest, errorMsg } from "../../../utilities/apis/apiRequest";

interface ResponseData {
    data: Course;
    message: string;
}

const AddCourse: React.FC = () => {
    const { addCourse } = useCoursesList()
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const { _notification } = useNotificationContext();
    const [form] = Form.useForm();

    const onFinish = async (values: { name: string; code: number }) => {
        setLoading(true);
        try {
            const res: ResponseData = await apiRequest("/courses", "POST", values, {
                Authorization: `Bearer ${token}`,
            });
            addCourse(res.data)
            _notification.Success("Course Added", `Course "${res.data.name}" was added successfully!`);
            form.resetFields();
        } catch (error: unknown) {
            _notification.Error("Error", errorMsg(error));
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-4">
            <h2 className="mb-4">Add New Course</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className="grid grid-cols-2 gap-2">
                    {/* Course Name */}
                    <Form.Item
                        label="Course Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter course name" }]}
                    >
                        <Input placeholder="Enter course name" />
                    </Form.Item>

                    <Form.Item
                        label="Course Code"
                        name="code"
                        className="w-full"
                        rules={[{ required: true, message: "Please enter course code" }]}
                    >
                        <InputNumber placeholder="Enter course code" style={{ width: "100%" }} />
                    </Form.Item>

                </div>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                        Add Course
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCourse;
