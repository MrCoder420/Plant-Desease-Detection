import { MeshDistortMaterial, OrbitControls, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import styled from "styled-components";

// Section container
const Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
    height: 100%;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const AnimatedCharacter = styled.span`
  display: inline-block;
  cursor: pointer;
  animation: none;
  animation-fill-mode: forwards;
  transition: color 0.2s;

  &:hover {
    animation: bounce 0.5s ease-in-out;
    color: #da4ea2;
  }

  @keyframes bounce {
    0% {
      opacity: 0;
      transform: scale3d(0.1, 0.1, 0.1);
    }
    20% {
      transform: scale3d(1.2, 1.2, 1.2);
    }
    40% {
      transform: scale3d(0.9, 0.9, 0.9);
    }
    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
      transform: scale3d(0.97, 0.97, 0.97);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
`;

// Wrap the Subtitle text in the same way as `AnimatedCharacter`
const SubtitleText = styled.h2`
  display: inline-block;
  color: #da4ea2;

  @media only screen and (max-width: 768px) {
    font-size: 18px;
  }
  

  animation: slideInFromLeft 1.5s ease-out;


  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;


const AnimatedSubtitle = ({ text }) => {
  return (
    <SubtitleText>
      {text.split("").map((char, index) => (
        <AnimatedCharacter key={index}>{char}</AnimatedCharacter>
      ))}
    </SubtitleText>
  );
};

const Title = styled.h1`
  font-size: 70px;
  color: white;

  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
  animation: slideInFromLeft 2s ease-out;


  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: white;
  font-weight: 500;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border: 1.5px solid gold;
  color: gold;
  font-size: 13px;
  letter-spacing: 4px;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    animation: bounce 0.5s ease-in-out;
  }

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Right = styled.div`
  flex: 3;
  position: relative;

  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 600px;
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Hero = () => {
  const titleText1 = "Hi, I'm";
  const titleText2 = "Mr. Coder, Nikhil.";
  const subtitleText = "Technophile";

  const splitTextWithSpaces = (text) => {
    return text.split("").map((char, index) => {
      if (char === " ") {
        return <span key={index}>&nbsp;</span>;
      }
      return (
        <AnimatedCharacter key={index}>
          {char}
        </AnimatedCharacter>
      );
    });
  };

  return (
    <Section>
      <Container>
        <Left>
          <Title>
            {splitTextWithSpaces(titleText1)}
            <br />
            {splitTextWithSpaces(titleText2)}
          </Title>
          <AnimatedSubtitle text={subtitleText} />
          <Button>Contact Me</Button>
        </Left>
        <Right>
          <Canvas>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[3, 2, 1]} />
              <Sphere args={[1, 100, 200]} scale={2.7}>
                <MeshDistortMaterial
                  color="#3d1c56"
                  attach="material"
                  distort={0.5}
                  speed={2}
                />
              </Sphere>
            </Suspense>
          </Canvas>
          <Img src="./img/moon.png" />
        </Right>
      </Container>
    </Section>
  );
};

export default Hero;
