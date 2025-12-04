import { Suspense } from "react";
import ConfirmRegistrationClient from "./ConfirmRegistrationClient";

export default function UserConfirmationPage() {
  return (
    <Suspense fallback={<div style={{padding: "100px", textAlign: "center"}}>Зареждане...</div>}>
      <ConfirmRegistrationClient />
    </Suspense>
  );
}