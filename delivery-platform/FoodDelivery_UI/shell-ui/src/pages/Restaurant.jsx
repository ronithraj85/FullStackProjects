import React, { Suspense } from "react";

const RestaurantApp = React.lazy(() => import("restaurant/App"));

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading Restaurants...</div>}>
      <RestaurantApp />
    </Suspense>
  );
}
