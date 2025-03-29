import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full screen height */
  overflow: hidden; /* Prevent overflow issues */
  background: url("https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
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
    <Router>
      <AppContainer>
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ContentWrapper>
      </AppContainer>
    </Router>
  );
}

export default App;
