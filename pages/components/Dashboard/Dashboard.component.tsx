import React from "react";
import Image from "next/image";
import Navbar from "../Navbar/Navbar.component";
import Style from "./Dashboard.module.scss";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import background from "../../../public/programming-background.jpg";
import teamwork from "../../../public/teamwork-background.jpg";
import coding from "../../../public/coding-background.png";

const DashBoard = () => {
  const properties = {
    prevArrow: (
      <button className={Style["button-style"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#000"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button className={Style["button-style"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#000"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };
  return (
    <>
      <Navbar />
      <Fade {...properties}>
        <div className={Style["each-slide"]}>
          <Image src={background} alt="background" />
        </div>
        <div className={Style["each-slide"]}>
          <Image src={teamwork} alt="teamwork" />
        </div>
        <div className={Style["each-slide"]}>
          <Image src={coding} alt="coding" />
        </div>
      </Fade>
    </>
  );
};

export default DashBoard;
