export interface SidebarItemsProps {
  cardTitle: string;
  handleOnClick: () => void;
}

export interface SideBarProps {
  items: SidebarItemsProps[];
}