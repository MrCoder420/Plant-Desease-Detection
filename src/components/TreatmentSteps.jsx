import React from 'react';
import styled from 'styled-components';

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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  text-align: left;
  z-index: 1000;
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  overflow: hidden;
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
    width: 95%;
    max-height: 90vh;
  }
`;

const Title = styled.h2`
  color: #004d04;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
`;

const ContentBox = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 15px 0;
  border: 1px solid #e9ecef;
`;

const SectionTitle = styled.h3`
  color: #2ecc71;
  font-size: 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
  font-weight: 600;
`;

const Text = styled.p`
  color: #2c3e50;
  line-height: 1.6;
  font-size: 15px;
  white-space: pre-line;
  margin: 0;
`;

const ScrollContainer = styled.div`
  max-height: calc(85vh - 100px);
  overflow-y: auto;
  padding-right: 15px;
  margin-right: -15px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #2ecc71;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #27ae60;
  }

  @media only screen and (max-width: 768px) {
    max-height: calc(90vh - 100px);
  }
`;

const DiseaseInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 15px;
  border-left: 3px solid #2ecc71;
`;

const DiseaseLabel = styled.span`
  font-weight: 600;
  color: #004d04;
  font-size: 15px;
`;

const DiseaseValue = styled.span`
  color: #2c3e50;
  font-size: 15px;
`;

const TreatmentSteps = ({ plantName, diseaseName, treatmentData, onClose }) => {
  // Clean the treatment data by removing markdown formatting
  const cleanTreatmentData = treatmentData
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .trim();

  // Split into sections based on numbered lists or clear section breaks
  const sections = cleanTreatmentData
    .split(/(?=\d+\.|(?:\n\n(?=[A-Z])))/)
    .filter(section => section.trim());

  const formatContent = (content) => {
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n\n');
  };

  return (
    <>
      <BlurOverlay onClick={onClose} />
      <Container>
        <Title>Treatment Plan for {plantName}</Title>
        <ScrollContainer>
          <DiseaseInfo>
            <DiseaseLabel>Disease:</DiseaseLabel>
            <DiseaseValue>{diseaseName}</DiseaseValue>
          </DiseaseInfo>

          <ContentBox>
            <SectionTitle>Treatment Instructions</SectionTitle>
            <Text>{formatContent(sections[0])}</Text>
          </ContentBox>

          {sections.slice(1).map((section, index) => {
            const cleanSection = section.trim();
            if (!cleanSection) return null;

            return (
              <ContentBox key={index}>
                <SectionTitle>Additional Information</SectionTitle>
                <Text>{formatContent(cleanSection)}</Text>
              </ContentBox>
            );
          })}
        </ScrollContainer>
      </Container>
    </>
  );
};

export default TreatmentSteps; 