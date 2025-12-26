'use client';

import { Card, Spin, Typography } from 'antd';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import UserForm from '@/components/users/UserForm';

const { Title } = Typography;

export default function UserDetailPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <Card>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <Title level={3}>📝 User Detail</Title>
                <UserForm userId={Number(id)} />
            </motion.div>
        </Card>

    );
}
