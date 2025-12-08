import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { VALID_USER } from "../../auth/auth.mocks";
import styles from './LoginPage.module.scss';

type FieldType = {
  username?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { username, password } = values;

    if (username === VALID_USER.username && password === VALID_USER.password) {
      // Set login flag
      localStorage.setItem("loggedIn", "true");

      message.success("Login successful!");

      // Navigate to protected route
      navigate("/character-list");
    } else {
      message.error("Invalid credentials!");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <section className={styles.formSection}>
      <div>
        <img src="/logoRaM.png" alt="Rick & Morty" className={styles.logoImage} />
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}
