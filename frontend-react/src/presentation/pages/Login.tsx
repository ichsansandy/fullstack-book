import { Button, Typography, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../data/url';

const { Title } = Typography;


const onFinishFailed = (errorInfo: object) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  name?: string;
  password?: string;
};

export default function Login() {
  const navigate = useNavigate()
  const onFinish = async (values: FieldType) => {
    await axios
      .post(`${baseURL}/authentications`, values)
      .then(function (response) {
        const accessToken = response.data.data.accessToken;
        const refreshToken = JSON.stringify(response.data.data.refreshToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Title className="text-center py-4">Login</Title>

        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
