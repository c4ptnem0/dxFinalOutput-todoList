import React, { useContext } from "react";
import {
  Card,
  Space,
  Dropdown,
  Modal,
  Form,
  Input,
  Button,
  Skeleton,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { TodoListContext } from "../contexts/TodoListContext";

const TodoListItem = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const {
    selectedKey,
    setSelectedKey,
    handleDelete,
    setIsEditing,
    handleOnFinish,
    isModalOpen,
    setIsModalOpen,
    loading,
    error,
    data,
  } = useContext(TodoListContext);

  if (loading || !data) {
    // Show skeleton loading cards based on the number of tasks
    const skeletonCards = Array.from(
      { length: data?.tasks?.length || 4 },
      (_, index) => (
        <Card
          key={index}
          style={{
            width: 260,
            padding: 19,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton active />
        </Card>
      )
    );

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skeletonCards}
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (key) => {
    if (key) {
      setIsEditing(true);
      setIsModalOpen(true);
      form.resetFields();

      // find and compare if the key is existing then populate the form inputs
      const selectedTask = data.tasks.find((todo) => todo.task_id === key);

      form.setFieldsValue({
        uuid: selectedTask.task_id,
        title: selectedTask.task_title,
        content: selectedTask.task_content,
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedKey(null);
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const items = [
    {
      label: "Edit",
      key: "1",
      icon: <EditOutlined />,
      onClick: () => handleEdit(selectedKey),
    },
    {
      label: "Delete",
      key: "2",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(selectedKey),
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.tasks.map((todo) => (
          <div key={todo.task_id}>
            {" "}
            {/* Wrap each card in a separate parent div */}
            <Space
              style={{
                padding: 19,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-120 hover:shadow-lg duration-300"
                title={<h4>{todo.task_title}</h4>}
                bordered={false}
                style={{
                  width: 260,
                }}
                extra={
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <SettingOutlined
                      onClick={() => {
                        setSelectedKey(todo.task_id);
                      }}
                    />
                  </Dropdown>
                }
              >
                <p>{todo.task_content}</p>
              </Card>
            </Space>
          </div>
        ))}
      </div>

      {/* Rest of the code remains unchanged */}
      <Modal
        title="Edit Content"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Cancel</Button>,
          <Button
            type="primary"
            key="submit"
            onClick={handleOk}
            loading={loading}
          >
            Update
          </Button>,
        ]}
      >
        <Form
          name="basic"
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
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            label="Task"
            name="content"
            rules={[
              {
                required: true,
                message: "Empty fields can't be added!",
              },
            ]}
          >
            <TextArea rows={3} placeholder="Content" maxLength={250} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TodoListItem;
