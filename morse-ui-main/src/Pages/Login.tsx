import { Input, Checkbox, Button, Form, Typography, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../lib/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "../utils/auth";
import Spinner from "../Components/Spinner";

const Login = () => {
  const { token, setAuthState } = useAuthState();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { username, password, remember } = values;
    const data = await login(username, password);
    if (data) {
      setAuthState(data, remember);
      navigate("/app");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/app");
    }
  }, [token]);

  return (
    <div className="login-conatiner">
      <Typography.Title level={4}>Login to Morse</Typography.Title>
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Link to={'/register'}>New to morse?</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
