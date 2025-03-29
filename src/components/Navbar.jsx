import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  @media only screen and (max-width: 768px) {
    padding: 10px;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  @media only screen and (max-width: 768px) {
    gap: 20px;
  }
`;

const Logo = styled.img`
  height: 50px;
  border-radius: 50%;
  
  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const DesktopList = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  padding: 8px 15px;
  transition: all 0.3s ease;
  color: white;
  font-size: 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  @media only screen and (max-width: 768px) {
    padding: 5px 10px;
    font-size: 14px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;

  @media only screen and (min-width: 769px) {
    display: none;
  }
`;

const DropdownButton = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: rgba(5, 151, 56, 0.9);
  border-radius: 8px;
  list-style: none;
  padding: 10px 0;
  display: ${(props) => (props.open ? "block" : "none")};
  min-width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 101;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownListItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Icon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #da4ea2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  return (
    <Section>
      <Container>
        <Links>
          <Logo src="./img/logo.jpg" alt="Logo" />
          <DesktopList>
            <ListItem onClick={() => handleNavigation('/')}>Home</ListItem>
            <ListItem onClick={() => handleNavigation('/dashboard')}>Crop Tool</ListItem>
          </DesktopList>
        </Links>
        <Icons>
          <DropdownContainer ref={dropdownRef}>
            <DropdownButton
              ref={buttonRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              ☰
            </DropdownButton>
            <DropdownList open={dropdownOpen}>
              <DropdownListItem onClick={() => handleNavigation('/')}>Home</DropdownListItem>
              <DropdownListItem onClick={() => handleNavigation('/dashboard')}>Crop Tool</DropdownListItem>
            </DropdownList>
          </DropdownContainer>
        </Icons>
      </Container>
    </Section>
  );
};

export default Navbar;
