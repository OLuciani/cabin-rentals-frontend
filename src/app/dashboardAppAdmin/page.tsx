"use client";

import React, { Suspense, useState, useEffect } from "react";
import CreateCabin from "@/features/cabins/components/CreateCabin";
import SidebarDashboardAppAdmin from "@/components/dashboardAppAdmin/SidebarDashboardAppAdmin";
import CabinsDashboardPage from "../../features/cabins/components/CabinsPageDashboardClient";
import CabinDetailDashboardPage from "../../features/cabins/components/CabinDetailForDashboard";
import EditCabinDashboardPage from "@/features/cabins/components/EditCabinDashboardPage";

const DashboardAppAdmin: React.FC = () => {
  const [reduceheight, setReduceHeight] = useState<boolean>(true);
  const [section, setSection] = useState<string>("createCabin");
  const [selectedCabinId, setSelectedCabinId] = useState<string | null>(null);

  useEffect(() => {
    
    // Evita scroll global cuando se muestra el dashboard
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Lo libera cuando salís del dashboard
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    console.log("Valor de reduceheight: ", reduceheight);
  }, [reduceheight])
  

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

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <div className="shrink-0">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <SidebarDashboardAppAdmin
            setSection={setSection}
            section={section}
            setReduceHeight={setReduceHeight}
          />
        </Suspense>
      </div>

      {/* Main content con scroll interno */}
      <main
        className={`flex-grow overflow-y-auto p-2 lg:p-6 bg-gray-100 lg:pt-0`}
        style={{ maxHeight: "100vh" }} // 👈 evita que el main crezca más que la pantalla
      >
        <Suspense fallback={<div>Loading Content...</div>}>
          <div className="pb-32 mt-2 xxs:mt-4 lg:mt-5">{renderSection()}</div>
        </Suspense>
      </main>
    </div>
  );
};

export default DashboardAppAdmin;

