// src/utils/toast.ts
export function toastError(error: unknown) {
  const message =
    typeof error === 'string'
      ? error
      : error instanceof Error
      ? error.message
      : 'Có lỗi xảy ra';

  alert(`❌ ${message}`);
}

export function toastSuccess(message: string) {
  alert(`✅ ${message}`);
}
