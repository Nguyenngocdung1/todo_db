'use client';

import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { toastSuccess } from '@/utils/toast';

type Props = {
  onSuccess: (username: string) => void;
};

export default function AddUserForm({ onSuccess }: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { username: string }) => {
    try {
      setLoading(true);
      // Simulate a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      onSuccess(values.username);
      toastSuccess('Thêm người dùng thành công!');
      form.resetFields();
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 24, fontSize: 20, fontWeight: 600, color: '#1e293b' }}>
        ➕ Thêm Người Dùng
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Tên người dùng"
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
        >
          <Input placeholder="Nhập tên người dùng..." size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              border: 'none',
              fontWeight: 500,
            }}
          >
            ➕ Thêm Người Dùng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
