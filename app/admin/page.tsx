// app/admin/page.tsx
import { Suspense } from 'react';
import AdminContent from './AdminContent';

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Зареждане на админ панела...</div>}>
      <AdminContent />
    </Suspense>
  );
}