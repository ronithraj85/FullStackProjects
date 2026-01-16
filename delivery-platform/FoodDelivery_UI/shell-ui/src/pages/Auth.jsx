import React, { Suspense } from "react";

const AuthApp = React.lazy(() => import("auth/App"));

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading Auth...</div>}>
      <AuthApp />
    </Suspense>
  );
}
