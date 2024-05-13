import { create } from "zustand";

interface PreviewState {
  previewOpen: boolean;
  open: () => void;
  close: () => void;
}

export const usePreview = create<PreviewState>((set) => ({
  previewOpen: false,
  open: () => set({ previewOpen: true }),
  close: () => set({ previewOpen: false }),
}));
