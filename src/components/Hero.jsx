import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
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
  width: 100%;
  max-width: 1400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media only screen and (max-width: 768px) {
    padding: 10px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 30px;
  max-width: 600px;
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media only screen and (max-width: 768px) {
    padding: 15px;
    gap: 20px;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: block;
  margin: 0;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media only screen and (max-width: 768px) {
    width: 150px;
    height: 150px;
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 15px;
  }
`;

const Button = styled.button`
  background-color: #004d04;
  color: white;
  font-weight: 500;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  width: 200px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: #008000;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media only screen and (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
    width: 180px;
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
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1000;
  width: 90%;
  max-width: 400px;
  animation: modalSlideIn 0.3s ease;

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 20px;
    width: 85%;
  }
`;

const ModalHeader = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #004d04;

  @media only screen and (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const ModalContent = styled.p`
  font-size: 16px;
  margin: 10px 0;
  color: #333;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
    margin: 8px 0;
  }
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