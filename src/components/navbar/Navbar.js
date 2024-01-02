import { React, useMemo } from "react";
import NavbarLink from "../navbar-link/NavbarLink";
import TestLegend from "../test-legend/TestLegend";
import BtnLogout from "../btn-logout/BtnLogout";
import { useLocation } from "react-router-dom";

function Navbar(props) {

  const location = useLocation();
  const currentLocation = location.state?.location===undefined?"websites":location.state?.location;


  const legend = useMemo(() => {
    switch (location.pathname) {
      case "/accessibility-dev/a11y/tests":
        return <TestLegend />;
      default:
        return <></>;
    }
  }, [location]);

  return (
    <div id="navbar" className="shadow-sm">
      <a className="default-anchor visually-hidden" href="#container" id="skipnavbar">
        salta il menù
      </a>

      <nav aria-label="menù principale del sito">
        <ul className="navbar-sx">
          <NavbarLink
            icon="websites"
            url="/accessibility-dev/websites"
            text="I miei siti"
            isActive={currentLocation === "websites"}
            location="websites"
          />
          <NavbarLink
            icon="a11y"
            url="/accessibility-dev/a11y "
            text="Accessibilità"
            isActive={currentLocation === "a11y"}
            location="a11y"
          />
          <NavbarLink
            icon="profile"
            url="/accessibility-dev/profile"
            text="Profilo"
            isActive={currentLocation === "profile"}
            location="profile"
          />

          <NavbarLink
            icon="tools"
            url="/accessibility-dev/tools"
            text="Strumenti e risorse"
            isActive={currentLocation === "tools"}
            location="tools"
            border="border-top"
          />
          <NavbarLink
            icon="ranking"
            url="/accessibility-dev/ranking"
            text="Classifica"
            isActive={currentLocation === "ranking"}
            location="ranking"
            border="border-bottom"
          />
        </ul>
      </nav>

      {legend}

      <BtnLogout />

      <hr  aria-hidden="true" alt=""/>

    </div>
  );
}

export default Navbar;
