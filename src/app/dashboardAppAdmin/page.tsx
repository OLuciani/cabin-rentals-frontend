"use client";

import React, { Suspense, useEffect, useState } from "react";
import CreateCabin from "../../features/cabins/dashboardAppAdmin/CreateCabin";
import SidebarDashboardAppAdmin from "../../components/dashboardAppAdmin/SidebarDashboardAppAdmin";
import CabinsDashboardPage from "../../features/cabins/dashboardAppAdmin/CabinsPageDashboardClient";
import CabinDetailDashboardPage from "../../features/cabins/dashboardAppAdmin/CabinDetailForDashboard";
//import EditCabinDashboardPage from "../../features/cabins/dashboardAppAdmin/EditCabinDashboardPage";
import EditCabinDashboardPage from "../../features/cabins/dashboardAppAdmin/editCabin/components/EditCabinDashboardPage";
import CabinCalendar from "../../features/cabins/dashboardAppAdmin/cabinCalendar/components/CabinCalendar";
import AdminCreateBookingForm from "../../features/reservations/adminCreateBooking/components/AdminCreateBookingForm";
import AllBookings from "@/features/reservations/allBookings/components/AllBookings";
import BookingDetailDashboardPage from "@/features/reservations/bookingDetail/components/BookingDetailDashboardPage";
import EditBookingForm from "@/features/reservations/editBooking/components/EditBookingForm";

const DashboardAppAdmin: React.FC = () => {
  const [reduceheight, setReduceHeight] = useState<boolean>(true);
  const [section, setSection] = useState<string>("cabinManagement");
  const [selectedCabinId, setSelectedCabinId] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const renderSection = () => {
    switch (section) {
      case "createCabin":
        return <CreateCabin />;
      case "cabinManagement":
        return (
          <CabinsDashboardPage
            onCabinClick={(id: string) => {
              setSelectedCabinId(id);
              setSection("cabinDetail");
            }}
          />
        );
      case "cabinDetail":
        return selectedCabinId ? (
          <CabinDetailDashboardPage
            cabinId={selectedCabinId}
            onEditClick={() => setSection("editCabin")}
            onShowCalendar={() => setSection("cabinCalendar")}
            setSection={setSection}
          />
        ) : (
          <div>Seleccioná una cabaña</div>
        );
      case "editCabin":
        return selectedCabinId ? (
          <EditCabinDashboardPage
            cabinId={selectedCabinId}
            onBack={() => setSection("cabinDetail")}
            setSection={setSection}
          />
        ) : (
          <div>Seleccioná una cabaña</div>
        );
      case "cabinCalendar":
        return selectedCabinId ? (
          <CabinCalendar cabinId={selectedCabinId} setSection={setSection} />
        ) : (
          <div>Seleccioná una cabaña</div>
        );
      case "createAdminBooking":
        return selectedCabinId ? (
          <AdminCreateBookingForm cabinId={selectedCabinId} setSection={setSection} />
        ) : (
          <div>Seleccioná una cabaña</div>
        );
      case "allBookings":
        return (
          <AllBookings
            onSelectBooking={(id) => setSelectedBookingId(id)}
            setSection={setSection}
          />
        );
      case "bookingDetail":
        return selectedBookingId ? (
          <BookingDetailDashboardPage
            bookingId={selectedBookingId}
            onBack={() => setSection("allBookings")}
          />
        ) : (
          <div>Seleccioná una reserva</div>
        );
      case "editBooking":
        return selectedBookingId ? (
          <EditBookingForm
            bookingId={selectedBookingId}
            onBack={() => setSection("allBookings")}
          />
        ) : (
          <div>Seleccioná una reserva</div>
        );

      default:
        return <CreateCabin />;
    }
  };

  useEffect(() => {
    console.log("Valor de reduceheight: ", reduceheight);
  }, [reduceheight]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="shrink-0 bg-secondary dark:bg-darkSecondary">
        {" "}
        {/* Agregué bg-secondary para que en pantallas > a lg se complete todo el alto del sidebar con color (no lo hacía sin eso). */}
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <SidebarDashboardAppAdmin
            setSection={setSection}
            section={section}
            setReduceHeight={setReduceHeight}
          />
        </Suspense>
      </div>

      {/* Main content */}
      <main
        className="flex-grow overflow-y-auto px-4 bg-background dark:bg-darkBackground text-textPrimary dark:text-darkText"
        id="dashboard-scroll-container"
      >
        <Suspense fallback={<div>Loading Content...</div>}>
          <div className="pb-5 mt-[72px] lg:mt-5">{renderSection()}</div>
        </Suspense>
      </main>
    </div>
  );
};

export default DashboardAppAdmin;
