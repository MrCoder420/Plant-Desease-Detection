import styled from "styled-components";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Who from "./components/Who";
import Works from "./components/Works";
import Contact from "./components/Contact";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full screen height */
  overflow: hidden; /* Prevent overflow issues */
  background: url("./img/bg.jpeg");
`;

const NavbarWrapper = styled.div`
  height: 60px; /* Fixed height for navbar */
  flex-shrink: 0; /* Prevent navbar from shrinking */
`;

const ContentWrapper = styled.div`
  flex: 1; /* Take up the remaining space */
  overflow-y: auto; /* Allow scrolling for the content sections */
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Ensure all sections are aligned for snapping */
  & > div {
    height: 100vh; /* Each section occupies the full viewport */
    scroll-snap-align: start;
  }
`;

function App() {
  return (
    <AppContainer>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <ContentWrapper>
        <Hero />
        <Who />
        <Works />
        <Contact />
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
