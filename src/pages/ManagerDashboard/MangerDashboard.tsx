import Container from "../../layouts/ManagerDashboard/Container/Container";
import SideBar from "../../layouts/ManagerDashboard/SideBar/SideBar";
import styles from "./MangerDashboard.module.scss";

const MangerDashboard = () => {
  return (
    <section className={styles.background}>
      <SideBar />
      <Container />
    </section>
  );
};

export default MangerDashboard;



// const MangerDashboard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const sidebarItems = [
//     { cardTitle: "Approval Queue", handleOnClick: () => navigate("approval-queue") },
//     { cardTitle: "Onboard New Hire", handleOnClick: () => navigate("onboard-new-hire") },
//     { cardTitle: "Logout", handleOnClick: () => { dispatch(logout()); navigate("/"); } },
//   ];

//   return (
//     <section className={styles.background}>
//       <SideBar items={sidebarItems} />
//       <Container />
//     </section>
//   );
// };

// export default MangerDashboard;