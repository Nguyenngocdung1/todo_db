'use client';

import { Modal, Form, Input, Select } from 'antd';
import { toastError, toastSuccess } from '@/utils/toast';
import { userApi } from '@/api/userApi';

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateUserModal({ open, onClose, onSuccess }: Props) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      await userApi.create(values);

      toastSuccess('Tạo user thành công');
      form.resetFields();
      onSuccess();
      onClose();
    } catch (e) {
      toastError(e);
    }
  };

  return (
    <Modal
      title="➕ Create User"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Create"
      cancelText="Cancel"
      getContainer={() => document.body}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Username là bắt buộc' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email là bắt buộc' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select allowClear placeholder="Select gender">
            <Select.Option value="MALE">Male</Select.Option>
            <Select.Option value="FEMALE">Female</Select.Option>
            <Select.Option value="OTHER">Other</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
