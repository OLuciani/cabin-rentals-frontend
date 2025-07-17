"use client";

import React, { Suspense, useEffect, useState } from "react";
import CreateCabin from "@/features/cabins/dashboardAppAdmin/CreateCabin";
import SidebarDashboardAppAdmin from "@/components/dashboardAppAdmin/SidebarDashboardAppAdmin";
import CabinsDashboardPage from "../../features/cabins/dashboardAppAdmin/CabinsPageDashboardClient";
import CabinDetailDashboardPage from "../../features/cabins/dashboardAppAdmin/CabinDetailForDashboard";
import EditCabinDashboardPage from "@/features/cabins/dashboardAppAdmin/EditCabinDashboardPage";

const DashboardAppAdmin: React.FC = () => {
  const [reduceheight, setReduceHeight] = useState<boolean>(true);
  const [section, setSection] = useState<string>("createCabin");
  const [selectedCabinId, setSelectedCabinId] = useState<string | null>(null);

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
          />
        ) : (
          <div>Seleccioná una cabaña</div>
        );
      case "editCabin":
        return selectedCabinId ? (
          <EditCabinDashboardPage
            cabinId={selectedCabinId}
            onBack={() => setSection("cabinDetail")}
          />
        ) : (
          <div>Seleccioná una cabaña</div>
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
      <div className="shrink-0 bg-secondary"> {/* Agregué bg-secondary para que en pantallas > a lg se complete todo el alto del sidebar con color (no lo hacía sin eso). */}
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
        className="flex-grow overflow-y-auto px-4 bg-gray-100"
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
