import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNotificationContext } from "../../../providers/NotificationContext";
import { apiRequest } from "../../../utilities/apis/apiRequest";
import { useAuth } from "../../../providers/AuthenticationContext";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Teacher name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
});

const AddTeachers: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { _notification } = useNotificationContext();
  const { token } = useAuth();
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: { name: string; email: string; subject: string }) => {
    setLoading(true);
    try {
      await apiRequest("/teachers", "POST", values, {
        Authorization: `Bearer ${token}`,
      });

      _notification.Success("Success", "Teacher added successfully");
      reset();
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
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Name" validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
          <Input {...register("name")} placeholder="Enter teacher's name" />
        </Form.Item>

        <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
          <Input {...register("email")} type="email" placeholder="Enter email" />
        </Form.Item>

        <Form.Item label="Subject" validateStatus={errors.subject ? "error" : ""} help={errors.subject?.message}>
          <Input {...register("subject")} placeholder="Enter subject" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Add Teacher
        </Button>
      </Form>
    </div>
  );
};

export default AddTeachers;
