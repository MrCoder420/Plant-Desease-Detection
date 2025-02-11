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
  background-color:#008000;
`;

const NavbarWrapper = styled.div`
  height: 60px; /* Fixed height for navbar */
  flex-shrink: 0; /* Prevent navbar from shrinking */
`;

const ContentWrapper = styled.div`
  flex: 1; /* Take up the remaining space */
  /* Removed overflow-y: auto; to prevent scrolling */
  
  & > div {
    height: 100vh; /* Each section occupies the full viewport */
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
        {/* <Who />
        <Works />
        <Contact /> */}
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;
