import { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined, LogoutOutlined, StarOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

import styles from './Header.module.scss';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  const goToFavorites = () => {
    navigate("/favorites");
    closeDrawer(); // zatvori fioku ako je mobile
  };

  return (
    <header className={styles.appHeader}>
      <div>
        <Link to="/character-list">
          <img src="/logoRaM.png" alt="Rick & Morty" className={styles.logoImage} />
        </Link>
      </div>

      {/* DESKTOP search + favorites + logout */}
      <div className={styles.headerActionsDesktop}>
        <SearchBar />
        <Button type="link" onClick={goToFavorites} icon={<StarOutlined />}>
          Favorites
        </Button>
        <Button danger onClick={handleLogout} icon={<LogoutOutlined />}>
          Logout
        </Button>
      </div>

      {/* MOBILE hamburger */}
      <Button
        className={styles.hamburgerBtn}
        type="text"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />

      {/* MOBILE drawer */}
      <Drawer title="Menu" placement="right" onClose={closeDrawer} open={open}>
        <SearchBar />

        <Button
          type="link"
          block
          onClick={goToFavorites}
          icon={<StarOutlined />}
          className={styles.buttonMobile}
        >
          Favorites
        </Button>

        <Button
          danger
          block
          onClick={handleLogout}
          icon={<LogoutOutlined />}
          className={styles.buttonMobile}
        >
          Logout
        </Button>
      </Drawer>
    </header>
  );
}
