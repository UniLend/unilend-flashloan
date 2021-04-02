import React, { ReactNode } from "react";
import NavBar from "../View/UI/Navbar/NavBar";
import FooterNavBar from '../View/UI/Navbar/FooterNavBar';

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <NavBar />
      <FooterNavBar />
      {props.children}
    </>
  );
};
export default Layout;
