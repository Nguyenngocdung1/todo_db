'use client';

import { Form, Input, Button, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { userApi, User } from '@/api/userApi';
import { toastError, toastSuccess } from '@/utils/toast';

type Props = {
  userId: number;
};

export default function UserForm({ userId }: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const res = await userApi.getDetail(userId);
        form.setFieldsValue(res.data);
      } catch (e) {
        toastError(e);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [userId, form]);

  const onFinish = async (values: Partial<User>) => {
    try {
      await userApi.update(userId, values);
      toastSuccess('Cập nhật user thành công');
    } catch (e) {
      toastError(e);
    }
  };

  if (loading) return <Spin />;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 400 }}
    >
      <Form.Item label="Username" name="username">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="Gender" name={['detail', 'gender']}>
        <Select allowClear>
          <Select.Option value="MALE">Male</Select.Option>
          <Select.Option value="FEMALE">Female</Select.Option>
          <Select.Option value="OTHER">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}
