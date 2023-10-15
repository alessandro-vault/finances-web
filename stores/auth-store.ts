import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AuthState {
  authenticated: boolean;
  token: string;
  login: (token: string) => void;
  logout: () => void;
}

const initialState = {
  authenticated: false,
  token: "",
};

const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      ...initialState,
      login: (token: string) => set({ authenticated: true, token }),
      logout: () => set(initialState),
    }),
    {
      name: "auth-storage",
    },
  ),
);
export default useAuthStore;
