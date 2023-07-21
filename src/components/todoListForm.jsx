import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { TodoListContext } from "../contexts/TodoListContext";

const { TextArea } = Input;

const TodoListForm = () => {
  const { handleOnFinish, form, buttonLoading } = useContext(TodoListContext);

  return (
    <div className="flex align-center justify-center">
      <Form
        labelCol={{
          span: 8,
        }}
        name="basic"
        style={{ width: "400px" }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleOnFinish}
        form={form}
        autoComplete="off"
      >
        <Form.Item name="uuid" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Empty fields can't be added!",
            },
          ]}
        >
          <Input placeholder="Task title" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: "Empty fields can't be added!",
            },
          ]}
        >
          <TextArea rows={3} placeholder="Task content" maxLength={250} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 13 }}>
          <Button type="primary" htmlType="submit" loading={buttonLoading}>
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TodoListForm;
