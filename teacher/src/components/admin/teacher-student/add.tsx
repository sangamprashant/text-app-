import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { useAuth } from "../../../providers/AuthenticationContext";
import { useCoursesList } from "../../../providers/CoursesListContext";
import { useNotificationContext } from "../../../providers/NotificationContext";
import { apiRequest } from "../../../utilities/apis/apiRequest";

const AddUser = ({ type }: { type: "student" | 'teacher' }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { _notification } = useNotificationContext();
  const { courses } = useCoursesList();
  const { token } = useAuth();

  const onFinish = async (values: any) => {
    setLoading(true);

    console.log(values)
    try {
      await apiRequest("/teacher-student", "POST", { ...values, type }, {
        Authorization: `Bearer ${token}`,
      });

      _notification.Success("Success", "Teacher added successfully");
      form.resetFields();
    } catch (error: unknown) {
      console.error("Error adding teacher:", error);
      _notification.Error("Error", "Failed to add teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Add New Teacher</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Teacher name is required" }]}
          >
            <Input placeholder="Enter teacher's name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input type="email" placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Course"
            name="course"
            rules={[{ required: true, message: "Course is required" }]}
          >
            <Select placeholder="Select a course" >
              {courses.map((c, i) => (
                <Select.Option key={i} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder="Set password" />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" loading={loading} className="w-full">
          Add Teacher
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
