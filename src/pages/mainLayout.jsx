import React, { useState } from "react";
import { Layout, Menu, theme, Form, Breadcrumb, notification } from "antd";
import TodoListForm from "../components/todoListForm";
import TodoListItem from "../components/todoListItem";
import { TodoListContext } from "../contexts/TodoListContext";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_DATA,
  INSERT_TASK,
  DELETE_TODO,
  UPDATE_TASK,
} from "../helpers/queries";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [form] = Form.useForm();

  const { loading, error, data, refetch } = useQuery(GET_DATA);
  const [insertTask] = useMutation(INSERT_TASK);
  const [deleteTask] = useMutation(DELETE_TODO);
  const [updateTask] = useMutation(UPDATE_TASK);

  // notification component
  const showNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

  const handleOnFinish = (values) => {
    setButtonLoading(true);
    setTimeout(() => {
      saveData(values);
      setButtonLoading(false);
    }, 800);
    form.resetFields();
  };

  const handleInsert = ({ task_title, task_content, user_id }) => {
    insertTask({
      variables: { task_title, task_content, user_id },
    })
      .then(({ data }) => {
        const affectedRows = data.insert_tasks.affected_rows;
        if (affectedRows > 0) {
          refetch();
          showNotification(
            "success",
            "Added successfully",
            "Task added to the list!"
          );
        } else {
        }
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error case
      });
  };

  const handleDelete = (key) => {
    deleteTask({ variables: { task_id: key } })
      .then(({ data }) => {
        const affectedRows = data.delete_tasks.affected_rows;
        if (affectedRows > 0) {
          refetch();
          showNotification(
            "success",
            "Deleted successfully",
            "Task deleted to the list!"
          );
        }
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error case
      });
  };

  const handleUpdate = ({ task_id, task_title, task_content }) => {
    updateTask({
      variables: { task_title, task_content, task_id },
    })
      .then(({ data }) => {
        const affectedRows = data.update_tasks.affected_rows;
        if (affectedRows > 0) {
          refetch();
          showNotification(
            "success",
            "Added successfully",
            "Task added to the list!"
          );
        } else {
        }
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error case
      });
  };

  // function for updating and inserting data
  const saveData = (values) => {
    const { title, content } = values;
    const user_id = "50bc6ff6-1249-4078-9387-d68e951542b2";

    // if task id is present, update the task data
    if (values.uuid) {
      handleUpdate({
        task_id: selectedKey,
        task_title: title,
        task_content: content,
      });
      setIsModalOpen(false);
    } else {
      // insert new task data
      handleInsert({ task_title: title, task_content: content, user_id });
      setIsModalOpen(false);
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={null}
          />
          <h1 style={{ color: "white" }}>JOSWA TODO-LIST APP</h1>
        </Header>
        <Content
          style={{
            padding: "0 50px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Tools</Breadcrumb.Item>
            <Breadcrumb.Item>Todo List</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
            }}
          >
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
              }}
            >
              <TodoListContext.Provider
                value={{
                  GET_DATA,
                  isEditing,
                  form,
                  isModalOpen,
                  loading,
                  data,
                  error,
                  selectedKey,
                  buttonLoading,
                  setSelectedKey,
                  setIsModalOpen,
                  handleOnFinish,
                  setIsEditing,
                  handleDelete,
                }}
              >
                {/* Components */}
                <TodoListForm />
                <div className="pt-6 flex justify-center">
                  <TodoListItem />
                </div>
              </TodoListContext.Provider>
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
};

export default MainLayout;
