import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import MangerDashboard from "../pages/MangerDashboard/MangerDashboard";
import OnboardHire from "../layouts/ManagerDashboard/OnboardHire/OnboardHire";
import { isUserLoggedIn, hasGrantedAccess } from "../guards/guards";

export type Predicate = () => boolean;

const canAccess = (
  Component: React.ComponentType,
  guards: Predicate[],
  to: string = "/"
): React.ComponentType => {
  return () => {
    if (!guards.every((guard) => guard())) {
      return <Navigate to={to} />;
    }
    return <Component />;
  };
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: canAccess(MangerDashboard, [isUserLoggedIn, hasGrantedAccess("MANAGER")]),
    children: [
      {
        path: "onboard-new-hire",
        Component: canAccess(OnboardHire, [isUserLoggedIn, hasGrantedAccess("MANAGER")]),
      },
      {
        path: "approval-queue",
        // Component: canAccess(ApprovalQueue, [isUserLoggedIn, hasGrantedAccess("MANAGER")]),
      },
    ],
  },
]);



// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Login,
//   },
//   {
//     path: "/dashboard",
//     Component: canAccess(MangerDashboard, [isUserLoggedIn, hasGrantedAccess("MANAGER")]),
//     children: [
//       { path: "onboard-new-hire", Component: canAccess(OnboardHire, [isUserLoggedIn, hasGrantedAccess("MANAGER")]) },
//       { path: "approval-queue" },
//     ],
//   },
//   {
//     path: "/hr-dashboard",
//     Component: canAccess(HrDashboard, [isUserLoggedIn, hasGrantedAccess("HR-COORDINATOR")]),
//     children: [
//       // hr child routes go here
//     ],
//   },
//   {
//     path: "/hire-dashboard",
//     Component: canAccess(HireDashboard, [isUserLoggedIn, hasGrantedAccess("HIRE")]),
//     children: [
//       // hire child routes go here
//     ],
//   },
// ]);