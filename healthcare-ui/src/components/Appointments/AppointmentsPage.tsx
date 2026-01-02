// src/pages/AppointmentsPage.tsx

import AppointmentForm from "./AppointmentsForm";
import AppointmentList from "./AppointmentsList";

export default function AppointmentsPage() {
  return (
    <div className="p-8">
      <AppointmentList />
      <br />
      <AppointmentForm />
    </div>
  );
}
