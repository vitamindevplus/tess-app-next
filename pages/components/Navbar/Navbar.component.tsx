import Image from "next/image";
import React, { useEffect, useState } from "react";
import { KEY, getCookie } from "../../utils/cookie";
import { useRouter } from "next/navigation";
import { removeCookie } from "../../utils/cookie";
import Style from "./Navbar.module.scss";
import logo from "../../../public/mylogo.svg";
import content from "../../../public/content.png";
import profile from "../../../public/profile.png";
import logout from "../../../public/logout.png";
import avatar from "../../../public/avatar.jpg";
import menu from "../../../public/icon-menu.png";
import login from "../../../public/icon-login.png";

const Navbar = () => {
  const router = useRouter();

  const [token, setToken] = useState<string>();
  const [showMenu, setShowMenu] = useState(false);
  const toggleOpenMenu = () => {
    setShowMenu(!showMenu);
  };

  const logoutFunc = () => {
    removeCookie(KEY.EMAIL);
    removeCookie(KEY.ROLE);
    removeCookie(KEY.TOKEN);
    removeCookie(KEY.USER);
    router.push("/login");
  };

  useEffect(() => {
    const accessToken = getCookie(KEY.TOKEN);
    setToken(accessToken);
  }, []);

  return (
    <>
      <div className={Style["navbar"]}>
        <div className={Style["logo"]}>
          <Image src={logo} alt="logo" />
          <h1>Vitamin Share</h1>
        </div>
        {token ? (
          <div className={Style["menu-desktop"]}>
            <div className={Style["menu-items"]}>
              <Image src={content} alt="content" />
              <div>Content</div>
            </div>
            <div className={Style["menu-items"]}>
              <Image src={profile} alt="profile" />
              <div>Profile</div>
            </div>
            <div className={Style["menu-items"]}>
              <Image className={Style["avatar"]} src={avatar} alt="avatar" />
              <div>Vitamindev</div>
            </div>
            <div className={Style["menu-items"]} onClick={logoutFunc}>
              <Image src={logout} alt="logout" />
              <div>Log out</div>
            </div>
          </div>
        ) : (
          <div
            className={Style["menu-button"]}
            onClick={() => router.push("/login")}
          >
            <Image src={login} alt="login" />
            <div>Đăng nhập / Đăng ký</div>
          </div>
        )}
        {token ? (
          <div className={Style["menu-mobile"]} onClick={toggleOpenMenu}>
            <Image src={menu} alt="menu" />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {showMenu ? (
        <div className={Style["menu-mobile-content"]}>
          <div className={Style["menu-items"]}>
            <Image src={content} alt="content" />
            <div>Content</div>
          </div>
          <div className={Style["menu-items"]}>
            <Image src={profile} alt="profile" />
            <div>Profile</div>
          </div>
          <div className={Style["menu-items"]}>
            <Image src={logout} alt="logout" />
            <div>Log out</div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Navbar;
