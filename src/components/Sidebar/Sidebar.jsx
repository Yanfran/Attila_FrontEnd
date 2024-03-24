import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHome, FaUserAlt, FaBars } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./sidebar.css";
const routes = [
  {
    path: "/home",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/buscar",
    name: "Buscar",
    icon: <FaUserAlt />,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: isOpen ? "310px" : "75px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className="sidebar"
      >
        <div className="top-section">
          {isOpen && (
            <motion.h1
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="logo"
            >
              Mineria
            </motion.h1>
          )}
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        <section className="routes">
          {routes.map((route) => (
            <NavLink to={route.path} key={route.name} className="link">
              <div className="icon">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>
      <div className="content">
        <Header />
        <Outlet />{" "}
      </div>
      {/* <div className='container-fluid content'><Header /><Outlet /> </div> */}
      {/* <div className='container-fluid content'>{children}</div> */}
    </div>
  );
};

export default Sidebar;
