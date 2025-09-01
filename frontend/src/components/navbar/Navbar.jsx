import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Navbar = () => {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const logout = async (e) => {
    e.preventDefault();
    const logo = await fetch("/logout", { method: "GET" });
    if (logo.status === 200) alert("Successfully logged out");
    if (logo.status === 400) {
      alert("Please login to log out :)");
      history.push("/signin");
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setShowNavbar(currentScroll < lastScroll || currentScroll < 50);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <Container show={showNavbar}>
      <MidCont>
        <Logo src="logo.png" alt="Site Logo" />
      </MidCont>

      <Hamburger onClick={toggleMenu} isOpen={isMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </Hamburger>

      <RightSide isOpen={isMenuOpen}>
        {/* Existing Nav Links */}
        <NavItem>
          <StyledNavLink
            exact
            activeClassName="active"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            <Icon className="fas fa-home"></Icon>
            Home
          </StyledNavLink>
        </NavItem>

        <NavItem>
          <StyledNavLink
            exact
            activeClassName="active"
            to="/vote"
            onClick={() => setIsMenuOpen(false)}
          >
            <Icon className="fas fa-vote-yea"></Icon>
            Vote
          </StyledNavLink>
        </NavItem>

        <NavItem>
          <StyledNavLink
            exact
            activeClassName="active"
            to="/signup"
            onClick={() => setIsMenuOpen(false)}
          >
            <Icon className="fas fa-user-plus"></Icon>
            Register
          </StyledNavLink>
        </NavItem>

        <NavItem>
          <StyledNavLink
            exact
            activeClassName="active"
            to="/signin"
            onClick={() => setIsMenuOpen(false)}
          >
            <Icon className="fas fa-sign-in-alt"></Icon>
            Login
          </StyledNavLink>
        </NavItem>

        {/* 🔹 New Nav Links for Feedback & Dashboard */}
        <NavItem>
          <StyledNavLink
            exact
            activeClassName="active"
            to="/feedback"
            onClick={() => setIsMenuOpen(false)}
          >
            <Icon className="fas fa-comment-dots"></Icon>
            Feedback
          </StyledNavLink>
        </NavItem>

        <NavItem>
          <StyledNavLink
            exact
            activeClassName="active"
            to="/stats"
            onClick={() => setIsMenuOpen(false)}
          >
            <Icon className="fas fa-chart-pie"></Icon>
            Stats
          </StyledNavLink>
        </NavItem>

        <NavItem>
          <StyledNavLink
            exact
            activeClassName="active"
            to="/signout"
            onClick={(e) => {
              logout(e);
              setIsMenuOpen(false);
            }}
          >
            <Icon className="fas fa-sign-out-alt"></Icon>
            Logout
          </StyledNavLink>
        </NavItem>
      </RightSide>

      <Overlay isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
    </Container>
  );
};

export default Navbar;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.nav`
  font-family: "Inter", "Segoe UI", sans-serif;
  height: 60px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: ${({ show }) => (show ? "0" : "-80px")};
  left: 0;
  right: 0;
  z-index: 1000;
  transition: top 0.3s ease;

  @media all and (max-width: 900px) {
    padding: 0 1.5rem;
  }
`;

const MidCont = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const Logo = styled.img`
  height: 36px;
  width: auto;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.9;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  span {
    width: 28px;
    height: 3px;
    background: #4f46e5;
    border-radius: 3px;
    transition: all 0.3s linear;
    transform-origin: center;
    &:nth-child(1) {
      transform: ${({ isOpen }) =>
        isOpen ? "rotate(45deg) translate(5px, 7px)" : "rotate(0)"};
    }
    &:nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
    }
    &:nth-child(3) {
      transform: ${({ isOpen }) =>
        isOpen ? "rotate(-45deg) translate(5px, -7px)" : "rotate(0)"};
    }
  }

  @media all and (max-width: 900px) {
    display: flex;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;

  @media all and (max-width: 900px) {
    position: fixed;
    top: 70px;
    right: 0;
    width: 260px;
    height: calc(100vh - 70px);
    background: #fff;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 1.5rem;
    gap: 0;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.08);
  }
`;

const NavItem = styled.div`
  position: relative;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease forwards;
  opacity: 0;
  animation-delay: ${(props) => props.delay || "0.1s"};

  @media all and (max-width: 900px) {
    width: 100%;
    text-align: center;
    padding: 0.8rem 0;
    &:hover {
      background: #f8fafc;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: #4f46e5;
    background: #f1f5f9;
  }
  &.active {
    color: #4f46e5;
    background: #eef2ff;
  }

  @media all and (max-width: 900px) {
    justify-content: center;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

const Icon = styled.i`
  margin-right: 8px;
  font-size: 0.9rem;

  @media all and (max-width: 900px) {
    font-size: 1rem;
    margin-right: 10px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background: rgba(0, 0, 0, 0.4);
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;
  z-index: 999;

  @media all and (min-width: 901px) {
    display: none;
  }
`;
