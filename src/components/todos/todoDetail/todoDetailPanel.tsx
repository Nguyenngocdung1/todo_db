import { Input, DatePicker, Select, Button, Spin } from 'antd';
import dayjs from 'dayjs';
import { TodoDetail } from '@/api/detailTodo/todoDetailApi';
import React from 'react';

type Props = {
  detail: TodoDetail | null;
  loading: boolean;
  onSave: (data: TodoDetail) => void;
};

export default function TodoDetailPanel({ detail, loading, onSave }: Props) {
  const [form, setForm] = React.useState<TodoDetail | null>(null);

    React.useEffect(() => {
    if (detail) {
        setForm(detail);
    }
    }, [detail]);;

  if (loading) return <Spin />;
  if (!form) return null;

  return (
    <div>
      <Input.TextArea
        rows={4}
        value={form.description ?? ''}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <DatePicker
        style={{ marginTop: 8 }}
        value={form.deadline ? dayjs(form.deadline) : null}
        onChange={(d) =>
          setForm({ ...form, deadline: d?.toISOString() })
        }
      />

      <Select
        style={{ width: 120, marginTop: 8 }}
        value={form.priority}
        options={[
          { value: 1, label: 'Thấp' },
          { value: 2, label: 'Trung bình' },
          { value: 3, label: 'Cao' },
        ]}
        onChange={(v) => setForm({ ...form, priority: v })}
      />

      <Button onClick={() => onSave(form)}>Lưu</Button>
    </div>
  );
}

