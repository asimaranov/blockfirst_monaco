import { create } from 'zustand';

type ConnectionInfoStoreState = {
  totalClients: number;
  setTotalClients: (totalClients: number) => void;
};

export const useConnectionInfoStore = create<ConnectionInfoStoreState>((set) => ({
  totalClients: 0,

  setTotalClients: (totalClients: number) =>
    set({
      totalClients,
    }),
}));
