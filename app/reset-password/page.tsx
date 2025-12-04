import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div style={{ textAlign: "center", padding: "100px", fontSize: "1.2rem" }}>
          Зареждане на възстановяване на парола...
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}