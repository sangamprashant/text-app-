import { Button, Card, Form, Input, InputNumber } from "antd";
import { useState } from "react";
import { QuestionForm } from "./QuestionForm";
import { apiRequest, errorMsg } from "../../../utilities/apis/apiRequest";
import { useNotificationContext } from "../../../providers/NotificationContext";
import { useAuth } from "../../../providers/AuthenticationContext";

const AddQuizComponent = () => {
    const { token } = useAuth()
    const { _notification } = useNotificationContext()
    const [questions, setQuestions] = useState<Question[]>([
        { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
    };

    const handleRemoveQuestion = (index: number) => {
        if (questions.length > 1) {
            setQuestions(questions.filter((_, qIndex) => qIndex !== index));
        }
    };

    const handleQuestionUpdate = (index: number, updatedQuestion: Question) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = updatedQuestion;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (values: any) => {
        try {
            const processedQuestions = questions.map((q) => {
                if (!q.question.trim() || !Array.isArray(q.options) || q.options.length < 4 || !q.correctAnswer.trim()) {
                    throw new Error("Each question must have a question text, four options, and a correct answer.");
                }

                const trimmedOptions = q.options.map((opt: string) => opt.trim());

                if (!trimmedOptions.every((opt) => opt.length > 0)) {
                    throw new Error("Each option must be a non-empty string.");
                }

                if (new Set(trimmedOptions).size !== trimmedOptions.length) {
                    throw new Error("Some question options are repeated.");
                }

                return {
                    question: q.question.trim(),
                    options: trimmedOptions,
                    correctAnswer: q.correctAnswer.trim(),
                };
            });

            const formData = {
                title: values.title.trim(),
                time: values.time,
                questions: processedQuestions,
            };

            const res = await apiRequest("/teacher.quiz", "POST", formData, {
                Authorization: `Bearer ${token}`,
            })

            _notification.Success("Success", res.message)
        } catch (error) {
            _notification.Error("Error", errorMsg(error));
        }
    };


    return (
        <Card title="Create a New Quiz">
            <Form layout="vertical" onFinish={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                    <Form.Item
                        label="Quiz Title"
                        name="title"
                        rules={[{ required: true, message: "Enter the quiz title" }]}
                    >
                        <Input placeholder="Enter quiz title" />
                    </Form.Item>
                    <Form.Item
                        label={<>Quiz Time{" "}<sub className="ml-2 text-red-500">(values in minutes)</sub></>}
                        name="time"
                        rules={[{ required: true, message: "Enter the quiz time" }]}
                    >
                        <InputNumber placeholder="Enter quiz time" style={{ width: "100%" }} />
                    </Form.Item>
                </div>

                {questions.map((q, qIndex) => (
                    <QuestionForm
                        key={qIndex}
                        questionData={q}
                        index={qIndex}
                        onUpdate={handleQuestionUpdate}
                        onRemove={() => handleRemoveQuestion(qIndex)}
                        canRemove={questions.length > 1}
                    />
                ))}

                {/* Add Question Button */}
                <Form.Item>
                    <Button type="dashed" onClick={handleAddQuestion} block>
                        Add Question
                    </Button>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Submit Quiz
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AddQuizComponent;
