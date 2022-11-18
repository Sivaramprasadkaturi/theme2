import React, { useState } from "react";
import styled from "styled-components";
import RightNav from "./MobileNavMenu";

const StyledBurger = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  /* position: fixed; */
  /* top: 15px;
  right: 20px; */
  display: none;
  // margin-left: 15px;

  @media (max-width: 1023px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  
  @media (max-width: 430px) {
  .middleHamBtns{
    width: 1rem !important;
    height: 1.5rem !important;
    }
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: #ccc;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      /* transform: ${({ open }) =>
        open ? "translateX(100%)" : "translateX(0)"}; */
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const HamburgerMenu = ({ menu }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)} className="middleHambMenu middleHamBtns">
        <div />
        <div className="middleHamBtn"/>
        <div />
      </StyledBurger>
      <RightNav
        open={open}
        close={() => setOpen(false)}
        toggle={() => setOpen(!open)}
        menu={menu}
      />
    </>
  );
};

export default HamburgerMenu;
