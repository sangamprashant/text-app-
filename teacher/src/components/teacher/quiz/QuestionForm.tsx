import { Button, Card, Divider, Form, Input, Select } from "antd";

const { Option } = Select;

export const QuestionForm = ({ questionData, index, onUpdate, onRemove, canRemove }: QuestionFormProps) => {
    const handleChange = (key: keyof Question, value: string | string[]) => {
        onUpdate(index, { ...questionData, [key]: value });
    };
    // Check if any required field is missing
    const isIncomplete =
        !questionData.question.trim() ||
        questionData.options.some((option) => !option.trim()) ||
        !questionData.correctAnswer.trim() ||
        new Set(questionData.options).size !== questionData.options.length; // Check for duplicate options


    return (
        <Card
            title={`Question ${index + 1}`}
            extra={canRemove && (
                <Button type="link" danger onClick={onRemove}>
                    Remove
                </Button>
            )}
            style={{ marginBottom: 20, backgroundColor: isIncomplete ? "#fef2f2" : "#f0fdf4", }}
        >
            {isIncomplete && (
                <>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        ⚠️ Some fields are missing, or options are duplicated.
                    </p>
                    <Divider />
                </>
            )}

            <Form.Item label="Question" rules={[{ required: true, message: "Enter the question" }]}>
                <Input
                    placeholder="Enter question"
                    value={questionData.question}
                    onChange={(e) => handleChange("question", e.target.value)}
                />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                {questionData.options.map((option, oIndex) => (
                    <Form.Item key={oIndex} label={`Option ${oIndex + 1}`} rules={[{ required: true, message: "Enter this option" }]}>
                        <Input
                            placeholder={`Enter option ${oIndex + 1}`}
                            value={option}
                            onChange={(e) => {
                                const newOptions = [...questionData.options];
                                newOptions[oIndex] = e.target.value;
                                handleChange("options", newOptions);
                            }}
                        />
                    </Form.Item>
                ))}
            </div>

            <Form.Item label="Correct Answer" rules={[{ required: true, message: "Select the correct answer" }]}>
                <Select
                    placeholder="Select the correct answer"
                    value={questionData.correctAnswer}
                    onChange={(value) => handleChange("correctAnswer", value)}
                >
                    {questionData.options.map((option, oIndex) => (
                        <Option key={oIndex} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Card>
    );
};