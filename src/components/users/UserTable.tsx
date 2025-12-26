'use client';

import { Table, Button, Popconfirm, Input, Space } from 'antd';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { User } from '@/api/userApi';
import { useUsers } from '@/hooks/useUsers';
import { useUserActions } from '@/hooks/useUserActions';
import CreateUserModal from './CreateUserModal';

export default function UserTable() {
  const router = useRouter();
  const { users, loading, fetchUsers } = useUsers();
  const { deleteUser } = useUserActions(fetchUsers);

  const [keyword, setKeyword] = useState('');
  const [openCreate, setOpenCreate] = useState(false);

  const filteredUsers = users?.filter(u =>
    u.username.toLowerCase().includes(keyword.toLowerCase()) ||
    u.email.toLowerCase().includes(keyword.toLowerCase())
  );

  const columns: ColumnsType<User> = [
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Gender',
      render: (_, u) => u.detail?.gender ?? '-',
    },
    {
      title: 'Action',
      width: 120,
      render: (_, user) => (
        <Popconfirm
          title="Xóa user này?"
          description="Hành động này không thể hoàn tác"
          okText="Xóa"
          cancelText="Hủy"
          onConfirm={() => deleteUser(user.id)}
        >
          <Button danger size="small" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      {/* SEARCH */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search username / email"
          prefix={<SearchOutlined />}
          allowClear
          onChange={e => setKeyword(e.target.value)}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenCreate(true)}
        >
          Create User
        </Button>
      </Space>

      {/* TABLE */}
      <motion.div layout>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={filteredUsers}
          pagination={{ pageSize: 5 }}
          onRow={record => ({
            onClick: () => router.push(`/users/${record.id}`),
          })}
          rowClassName={() => 'user-row'}
        />
      </motion.div>

      <style jsx global>{`
        .user-row {
          cursor: pointer;
          transition: background 0.2s;
        }
        .user-row:hover {
          background: #fafafa;
        }
      `}</style>

      <CreateUserModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={() => fetchUsers()}
      />
    </>
  );
}
