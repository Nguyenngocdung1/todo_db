'use client';

import { Card, Typography } from 'antd';
import { motion } from 'framer-motion';
import UserTable from '@/components/users/UserTable';

const { Title } = Typography;

export default function UsersPage() {
  return (
    <Card>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Title level={3}>👤 User Management</Title>
        <UserTable />
      </motion.div>
    </Card>

  );
}
