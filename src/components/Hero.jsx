import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BlurOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
`;

const Container = styled.div`
  width: 1400px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Aligns everything at the top */
  align-items: center;
  text-align: center;
  gap: 20px; /* Reduces space between logo and title */
  height: 100%; /* Ensures it fills the container */
`;

const Logo = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  display: block;
  margin: 0;
  padding: 0;
  line-height: 1;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const Title = styled.h1`
  font-size: 60px;
  color: white;
  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

const Button = styled.button`
  background-color: #004d04;
  color: white;
  font-weight: 500;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #008000;
  }
  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  display: none;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1000;
  width: 300px;
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #004d04;
`;

const ModalContent = styled.p`
  font-size: 18px;
  margin: 10px 0;
`;

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("https://crop.kindwise.com/api/v1/identification", formData, {
        headers: {
          "Api-Key": "MaNEyXC1rr0WpiDtqHu6QgPeJORxq19nkhyL2WYUPf35N1Vtl4",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        setResult(response.data);
        console.log(response.data.result.crop.suggestions[0].name);
        console.log(response.data.result.disease.suggestions[0].name);
      } else {
        alert("No result received. Please try again.");
      }
    } catch (error) {
      alert("Error uploading image. Please try again.");
      console.error("Upload Error:", error);
    }

    setLoading(false);
  };

  return (
    <>
      {result && <BlurOverlay />}
      <Section>
        <Container>
          <Left>
          <Logo src="./img/logo-removebg-preview.png" alt="App Logo" />
            <Title>Plant Disease Detection</Title>
            <Input type="file" accept="image/*" id="upload" onChange={handleFileChange} />
            <label htmlFor="upload">
              <Button as="span">Select Image</Button>
            </label>
            <Button onClick={uploadImage} disabled={loading || !selectedFile}>
              {loading ? "Uploading..." : "Upload & Detect"}
            </Button>
          </Left>
        </Container>

        {result && (
            <Modal>
            <ModalHeader>Detection Result</ModalHeader>
            <ModalContent><strong>Plant Name:</strong> {result.result.crop.suggestions[0].name || "Unknown"}</ModalContent>
            <ModalContent><strong>Disease:</strong> {result.result.disease.suggestions[0].name || "Healthy"}</ModalContent>
            <Button onClick={() => setResult(null)}>Get Solution</Button>
          </Modal>
        )}
      </Section>
    </>
  );
};

export default Hero;