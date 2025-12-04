'use client';
import dynamic from "next/dynamic";

const LoginClient = dynamic(() => import("./LoginClient"), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <p>Зареждане...</p>
    </div>
  ),
});

export default function LoginPage() {
  return <LoginClient />;
}