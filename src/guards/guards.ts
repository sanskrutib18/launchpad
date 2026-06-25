import { store } from "../redux/store";
import type { Predicate } from "../routes/routes";

export const isUserLoggedIn: Predicate = () => {
  const state = store.getState();
  return state.auth.isAuthenticated;
};

type Roles = "HIRE" | "MANAGER" | "HR-COORDINATOR";

export const hasGrantedAccess = (role: Roles) => {
  return (): boolean => {
    const userRole = JSON.parse(localStorage.getItem("role") ?? '""');
    return role.includes(userRole);
  };
};