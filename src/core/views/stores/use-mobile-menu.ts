import { create } from "zustand";

type MobileMenuState = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const useMobileMenu = create<MobileMenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));
