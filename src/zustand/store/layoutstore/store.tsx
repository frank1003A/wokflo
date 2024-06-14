import { create } from "zustand";

interface LayoutStoreProps {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  expand: () => void;
  collapse: () => void
}
const useLayoutStore = create<LayoutStoreProps>((set) => ({
  isCollapsed: false,
  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  expand: () => set(state => ({isCollapsed: false})),
  collapse: () => set(state => ({isCollapsed: true}))
}));

export default useLayoutStore;
