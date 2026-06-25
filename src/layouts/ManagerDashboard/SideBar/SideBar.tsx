import { useNavigate } from "react-router-dom";
import SidebarItems from "../SidebarItems/SidebarItems";
import styles from "./SideBar.module.scss";
import type { SideBarProps } from "./Sidebar.types";

const SideBar = ({ items }: SideBarProps) => {
  return (
    <section className={styles.background}>
      {items.map((item) => (
        <SidebarItems
          key={item.cardTitle}
          cardTitle={item.cardTitle}
          handleOnClick={item.handleOnClick}
        />
      ))}
    </section>
  );
};

export default SideBar;