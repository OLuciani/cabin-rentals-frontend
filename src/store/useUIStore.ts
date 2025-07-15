import { create } from "zustand";
import type { UIState } from "../types/ui";

export const useUIStore = create<UIState>((set) => ({
  isGeneralSidebarOpen: false,
  openGeneralSidebar: () => set({ isGeneralSidebarOpen: true }),
  closeGeneralSidebar: () => set({ isGeneralSidebarOpen: false }),
  toggleGeneralSidebar: () =>
    set((state) => ({ isGeneralSidebarOpen: !state.isGeneralSidebarOpen })),
}));
