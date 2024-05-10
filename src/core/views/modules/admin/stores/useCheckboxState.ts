import { create } from "zustand";

interface CheckboxState {
  previewOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCheckboxState = create<CheckboxState>((set) => ({
  previewOpen: false,
  open: () => set({ previewOpen: true }),
  close: () => set({ previewOpen: false }),
}));
