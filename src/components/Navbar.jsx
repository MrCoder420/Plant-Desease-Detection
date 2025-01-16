import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0);
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
`;

const Logo = styled.img`
  height: 70px;
  border-radius:50%;
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
  padding: 5px 10px;
  transition: all 0.3s ease;
  color:white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const DropdownButton = styled.div`
  width: 35px;
  height: 35px;
  background-color: rgba(0, 0, 0, 0);
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: rgba(124, 62, 224, 0.9);
  border-radius: 8px;
  list-style: none;
  padding: 10px 0;
  display: ${(props) => (props.open ? "block" : "none")};
  min-width: 200px;
  box-shadow: 0 4px 6px rgba(186, 9, 251, 0.3);
  z-index: 101;
`;

const DropdownListItem = styled.li`
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;

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
  const dropdownRef = useRef(null); // Reference to the dropdown container
  const buttonRef = useRef(null); // Reference to the dropdown button

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Section>
      <Container>
        <Links>
          <Logo src="./img/logo.png" />
          <DesktopList>
            <ListItem>Home</ListItem>
            <ListItem>Studio</ListItem>
            <ListItem>Works</ListItem>
            <ListItem>Contact</ListItem>
          </DesktopList>
        </Links>
        <Icons>
          <Icon src="./img/search.png" />
          <Button>Hire Now</Button>
          <DropdownContainer ref={dropdownRef}>
            <DropdownButton
              ref={buttonRef}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              ☰
            </DropdownButton>
            <DropdownList open={dropdownOpen}>
              <DropdownListItem>Home</DropdownListItem>
              <DropdownListItem>Studio</DropdownListItem>
              <DropdownListItem>Works</DropdownListItem>
              <DropdownListItem>Contact</DropdownListItem>
            </DropdownList>
          </DropdownContainer>
        </Icons>
      </Container>
    </Section>
  );
};

export default Navbar;
