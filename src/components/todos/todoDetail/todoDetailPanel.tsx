import { Input, DatePicker, Select, Button, Spin, Switch, message } from 'antd';
import dayjs from 'dayjs';
import { TodoDetail } from '@/api/detailTodo/todoDetailApi';
import { Todo } from '@/api/todoApi';
import { todoApi } from '@/api/todoApi';
import { toastError } from '@/utils/toast';
import React from 'react';

type Props = {
  todo: Todo | null;
  detail: TodoDetail | null;
  loading: boolean;
  onSave: (data: TodoDetail) => void;
  onUpdateSuccess?: () => void;
};

export default function TodoDetailPanel({ 
  todo, 
  detail, 
  loading, 
  onSave,
  onUpdateSuccess 
}: Props) {
  const [form, setForm] = React.useState<TodoDetail | null>(null);
  const [title, setTitle] = React.useState('');
  const [completed, setCompleted] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (detail) {
      setForm(detail);
    } else {
      // Khởi tạo form với giá trị mặc định nếu detail chưa có
      setForm({
        description: '',
        deadline: undefined,
        priority: undefined,
      });
    }
  }, [detail]);

  React.useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSave = async () => {
    if (!todo) return;

    try {
      setSaving(true);

      // Update todo (title và completed)
      const updateData: { title?: string; completed?: boolean } = {};
      
      if (title.trim() !== todo.title) {
        updateData.title = title.trim();
      }
      
      if (completed !== todo.completed) {
        updateData.completed = completed;
      }

      // Chỉ gọi API update nếu có thay đổi
      if (Object.keys(updateData).length > 0) {
        await todoApi.update(todo.id, updateData);
      }

      // Update detail (luôn gọi để đảm bảo sync)
      await onSave(form || {
        description: '',
        deadline: undefined,
        priority: undefined,
      });

      message.success('Cập nhật thành công!');
      onUpdateSuccess?.();
    } catch (error) {
      toastError(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spin />;
  if (!todo) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Title */}
      <div>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#1e293b' }}>
          Tiêu đề
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập tiêu đề..."
          style={{ width: '100%' }}
        />
      </div>

      {/* Completed Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontWeight: 500, color: '#1e293b' }}>Trạng thái hoàn thành</label>
        <Switch checked={completed} onChange={setCompleted} />
      </div>

      {/* Description */}
      <div>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#1e293b' }}>
          Mô tả
        </label>
        <Input.TextArea
          rows={4}
          placeholder="Mô tả..."
          value={form?.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* Deadline */}
      <div>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#1e293b' }}>
          Hạn chót
        </label>
        <DatePicker
          showTime
          format="DD/MM/YYYY HH:mm"
          style={{ width: '100%' }}
          value={form?.deadline ? dayjs(form.deadline) : null}
          onChange={(date) =>
            setForm({ 
              ...form, 
              deadline: date ? date.format('YYYY-MM-DD HH:mm:ss') : undefined 
            })
          }
        />
      </div>

      {/* Priority */}
      <div>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#1e293b' }}>
          Độ ưu tiên
        </label>
        <Select
          style={{ width: '100%' }}
          value={form?.priority}
          onChange={(value) => setForm({ ...form, priority: value })}
          options={[
            { value: 1, label: '🟢 Thấp' },
            { value: 2, label: '🟡 Trung bình' },
            { value: 3, label: '🔴 Cao' },
          ]}
        />
      </div>

      <Button 
        type="primary" 
        block 
        onClick={handleSave}
        loading={saving}
        style={{ marginTop: 8 }}
      >
        💾 Lưu
      </Button>
    </div>
  );
}

