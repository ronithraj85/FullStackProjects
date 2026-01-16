import React, { Suspense } from "react";

const OrderApp = React.lazy(() => import("order/App"));

export default function Orders() {
  return (
    <Suspense fallback={<div>Loading Orders...</div>}>
      <OrderApp />
    </Suspense>
  );
}
