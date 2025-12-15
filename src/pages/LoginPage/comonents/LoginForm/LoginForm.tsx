import { VALID_USER } from "@/auth/auth.mocks";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";


type FieldType = {
  username: string;
  password: string;
};

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { username, password } = values;

    if (
      username === VALID_USER.username &&
      password === VALID_USER.password
    ) {
      localStorage.setItem("loggedIn", "true");
      message.success("Login successful!");
      onSuccess();
    } else {
      message.error("Invalid credentials!");
    }
  };

  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          LOGIN
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
