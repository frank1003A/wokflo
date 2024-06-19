import { create } from "zustand";

interface NTS {
  value: string;
  isOpen: boolean;
  setValue: (value: string) => void;
  setOpen: (value: boolean) => void;
}

const useTaskShetStore = create<NTS>((set) => ({
  value: "",
  isOpen: false,
  setValue: (v) => set((state) => ({ value: v })),
  setOpen: (v) => set((state) => ({ isOpen: v })),
}));

export default useTaskShetStore;
