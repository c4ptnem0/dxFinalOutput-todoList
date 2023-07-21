import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Form, Input } from "antd";
import "../css/loginPage.css";

import { useMutation } from "@apollo/client";
import { NEW_USER } from "../helpers/queries";

const signUpPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [newUser] = useMutation(NEW_USER);

  const handleOnFinish = (values) => {
    const { username, password, uuid = crypto.randomUUID() } = values;
    handleInsert({ username: username, password: password, id: uuid });

    form.resetFields();
  };

  const handleInsert = ({ username, password, id }) => {
    newUser({
      variables: { username, password, id },
    })
      .then(({ data }) => {
        const affectedRows = data.insert_users.affected_rows;
        if (affectedRows > 0) {
          console.log("Data inserted successfully");
          // Perform any necessary actions after successful insertion
        } else {
          console.error("Data insertion failed");
          // Handle the case when the insertion was not successful
        }
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
        // Handle error case
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card
          bordered={false}
          style={{
            width: 500,
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleOnFinish}
            form={form}
            autoComplete="off"
          >
            <p className="font-sans font-bold text-2xl text-center">
              SIGNUP ANAY IKAW HEHE
            </p>
            <Form.Item name="uuid" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
          <a
            className="flex justify-center"
            onClick={() => {
              navigate(`/`);
            }}
          >
            <p>Mayda kana account? Login na!</p>
          </a>
        </Card>
      </div>
    </>
  );
};

export default signUpPage;
