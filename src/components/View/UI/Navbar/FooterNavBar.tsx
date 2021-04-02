import React from "react";
import { Button } from "react-bootstrap";
import { useActions } from "hooks/useActions";
import sun from "assets/sun.svg";
import moon from "assets/moon.svg";
import { useTypedSelector } from "hooks/useTypedSelector";

const FooterNavBar = () => {
  const { theme } = useTypedSelector((state) => state.settings);
  const { themeChange } = useActions();

  const handleUpdate = () => {
    themeChange(theme);
  };

  return (
    <nav
      className={`navbar navbar-expand-sm navbar-${theme} bg-${theme} footer-nav-bar`}
    >
      <div className="app-wallet-details-footer"></div>
      <div className="app-settings-group">
        <Button
          onClick={() => handleUpdate()}
          className={`d-flex  ${
            theme === "dark" && "btn-dark"
          } btn-theme-icon-footer`}
          variant="secondary"
        >
          {<img width="20" src={theme === "light" ? sun : moon} alt="theme" />}
        </Button>
        {/* <Button
          className={`d-flex ${
            theme === "dark" && "btn-dark"
          } btn-theme-icon-footer`}
          variant="secondary"
        >
          {
            <i
              className="fa fa-ellipsis-h"
              aria-hidden="true"
              style={{ ...(theme !== "dark" && { color: "black" }) }}
            />
          }
        </Button> */}
      </div>
    </nav>
  );
};

export default FooterNavBar;
