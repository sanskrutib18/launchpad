import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarItems from "../../../components/SidebarItems/SidebarItems";
import styles from "./SideBar.module.scss";
import { logout } from "../../../redux/authSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApprovalQueueClick = () => {
    navigate("approval-queue");
  };

  const handleOnboardHireClick = () => {
    navigate("onboard-new-hire");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <section className={styles.background}>
      <SidebarItems cardTitle="Approval Queue" handleOnClick={handleApprovalQueueClick} />
      <SidebarItems cardTitle="Onboard New Hire" handleOnClick={handleOnboardHireClick} />
      <SidebarItems cardTitle="Logout" handleOnClick={handleLogout} />
    </section>
  );
};

export default SideBar;