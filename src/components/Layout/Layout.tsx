import React, { ReactNode } from "react";
import NavBar from "../View/UI/Navbar/NavBar";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};
export default Layout;
