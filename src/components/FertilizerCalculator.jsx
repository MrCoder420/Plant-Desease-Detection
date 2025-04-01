import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  background: #f5f5f5;
  margin-top: 200px;
  border-radius: 10px;
  overflow-y: auto;
  height: calc(100vh - 200px);
  
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #2ECC71;
    border-radius: 4px;
    
    &:hover {
      background: #27AE60;
    }
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #2ECC71 rgba(255, 255, 255, 0.1);
`;

const BackButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #2C3E50;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  color: #2C3E50;
`;

const UnitSelect = styled(Select)`
  width: 100%;
`;

const PlotSizeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlotSizeButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #2ECC71;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #27AE60;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PlotSizeInput = styled.input`
  width: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
`;

const NutrientGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 10px;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const NutrientCard = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  flex: 1;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media only screen and (max-width: 768px) {
    padding: 12px;
  }
`;

const NutrientLabel = styled.label`
  display: block;
  font-size: 14px;
  color: #2C3E50;
  margin-bottom: 8px;
  font-weight: 500;
`;

const NutrientInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 8px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #2ECC71;
    box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.1);
  }

  &:hover {
    border-color: #2ECC71;
  }

  @media only screen and (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

const UnitLabel = styled.span`
  font-size: 12px;
  color: #666;
  display: block;
  text-align: center;
  background: #f1f1f1;
  padding: 4px 8px;
  border-radius: 4px;
`;

const CalculateButton = styled.button`
  background: #2ECC71;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #27AE60;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CalculationsContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 400px;
  padding: 20px;
  margin-top: 30px;
  overflow-y: auto;
  margin-bottom: 30px;
  
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #2ECC71;
    border-radius: 4px;
    
    &:hover {
      background: #27AE60;
    }
  }

  @media only screen and (max-width: 768px) {
    height: 500px;
    padding: 15px;
    margin-bottom: 20px;
  }
`;

const CalculationBox = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
`;

const CalculationTitle = styled.h3`
  font-size: 16px;
  color: #2C3E50;
  margin-bottom: 10px;
  text-align: center;
  word-break: break-word;
`;

const CalculationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  width: 100%;
`;

const CalculationItem = styled.div`
  text-align: center;
  padding: 6px;
  background: white;
  border-radius: 6px;
  border: 1px solid #eee;
  min-width: 0;
  
`;

const CalculationLabel = styled.div`
  font-size: 10px;
  color: #666;
  margin-bottom: 3px;
  word-break: break-word;
  overflow: visible;
`;

const CalculationValue = styled.div`
  font-size: 16px;
  color: #2C3E50;
  font-weight: 500;
  word-break: break-word;
  overflow: visible;
`;

const FertilizerCalculator = () => {
  const navigate = useNavigate();
  const [fertilizerData, setFertilizerData] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('Acre');
  const [plotSize, setPlotSize] = useState(0.5);
  const [nutrientValues, setNutrientValues] = useState({
    N: '',
    P: '',
    K: ''
  });
  const [loading, setLoading] = useState(true);
  const [calculatedValues, setCalculatedValues] = useState(null);

  useEffect(() => {
    fetch('/fertilizer_data.json')
      .then(response => response.json())
      .then(data => {
        setFertilizerData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading fertilizer data:', error);
        setLoading(false);
      });
  }, []);

  const handlePlantChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPlant(selectedValue);
    
    if (selectedValue && fertilizerData?.plants) {
      const plant = fertilizerData.plants.find(p => p.name === selectedValue);
    if (plant) {
        const baseValues = plant.fertilizer_requirements[selectedUnit];
        setNutrientValues({
          N: (baseValues.N * plotSize).toFixed(2),
          P: (baseValues.P * plotSize).toFixed(2),
          K: (baseValues.K * plotSize).toFixed(2)
        });
      } else {
        setNutrientValues({ N: '', P: '', K: '' });
      }
    } else {
      setNutrientValues({ N: '', P: '', K: '' });
    }
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setSelectedUnit(newUnit);
    
    if (selectedPlant && fertilizerData?.plants) {
      const plant = fertilizerData.plants.find(p => p.name === selectedPlant);
      if (plant) {
        const baseValues = plant.fertilizer_requirements[newUnit];
        setNutrientValues({
          N: (baseValues.N * plotSize).toFixed(2),
          P: (baseValues.P * plotSize).toFixed(2),
          K: (baseValues.K * plotSize).toFixed(2)
        });
      }
    }
  };

  const handlePlotSizeChange = (value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0.5) {
      setPlotSize(numValue);
      if (selectedPlant && fertilizerData?.plants) {
        const plant = fertilizerData.plants.find(p => p.name === selectedPlant);
        if (plant) {
          const baseValues = plant.fertilizer_requirements[selectedUnit];
          setNutrientValues({
            N: (baseValues.N * numValue).toFixed(2),
            P: (baseValues.P * numValue).toFixed(2),
            K: (baseValues.K * numValue).toFixed(2)
          });
        }
      }
    }
  };

  const handleNutrientChange = (nutrient, value) => {
    // Allow empty string for backspace deletion
    if (value === '') {
      setNutrientValues(prev => ({
        ...prev,
        [nutrient]: ''
      }));
      return;
    }

    // Allow decimal point for decimal numbers
    if (value === '.') {
      setNutrientValues(prev => ({
        ...prev,
        [nutrient]: '0.'
      }));
      return;
    }

    // Allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(value)) {
      setNutrientValues(prev => ({
        ...prev,
        [nutrient]: value
      }));
    }
  };

  const calculateFertilizerCombinations = () => {
    const N = parseFloat(nutrientValues.N);
    const P = parseFloat(nutrientValues.P);
    const K = parseFloat(nutrientValues.K);

    // Combination 1: MOP/TSP/UREA
    const combination1 = {
      name: "MOP/TSP/UREA",
      MOP: (K / 0.6).toFixed(2),
      TSP: (P / 0.46).toFixed(2),
      UREA: (N / 0.46).toFixed(2)
    };

    // Combination 2: DAP/MOP/UREA
    const dapN = P * 0.18 / 0.46; // N from DAP
    const combination2 = {
      name: "DAP/MOP/UREA",
      DAP: (P / 0.46).toFixed(2),
      MOP: (K / 0.6).toFixed(2),
      UREA: ((N - dapN) / 0.46).toFixed(2)
    };

    // Combination 3: 10-26-26/TSP/UREA
    const combination3 = {
      name: "10-26-26/TSP/UREA",
      "10-26-26": (P / 0.30).toFixed(2),
      TSP: (P / 2.73).toFixed(2),
      UREA: (N / 0.57).toFixed(2)
    };

    setCalculatedValues({
      combination1,
      combination2,
      combination3
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    calculateFertilizerCombinations();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const selectedPlantData = selectedPlant && fertilizerData?.plants
    ? fertilizerData.plants.find(p => p.name === selectedPlant)
    : null;

  return (
    <Container>
      {/* <BackButton onClick={() => navigate('/')}>
        Back to Dashboard
      </BackButton> */}
      <Title>Fertilizer Calculator</Title>
      
      <Form onSubmit={(e) => e.preventDefault()}>
        <InputGroup>
          <Label>Select Plant</Label>
          <Select 
            value={selectedPlant} 
            onChange={handlePlantChange}
            required
          >
            <option value="">Select a plant</option>
            {fertilizerData?.plants.map(plant => (
              <option key={plant.name} value={plant.name}>
                {plant.name}
              </option>
            ))}
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>Select Unit</Label>
          <UnitSelect 
            value={selectedUnit} 
            onChange={handleUnitChange}
            required
          >
            <option value="Acre">Acre</option>
            <option value="Hectare">Hectare</option>
            <option value="Gunta">Gunta</option>
          </UnitSelect>
        </InputGroup>

        <InputGroup>
          <Label>Plot Size</Label>
          <PlotSizeControl>
            <PlotSizeButton 
              type="button"
              onClick={() => handlePlotSizeChange(plotSize - 0.5)}
              disabled={plotSize <= 0.5}
            >
              -
            </PlotSizeButton>
            <PlotSizeInput
              type="number"
              value={plotSize}
              onChange={(e) => handlePlotSizeChange(e.target.value)}
              min="0.5"
              step="0.5"
            />
            <PlotSizeButton 
              type="button"
              onClick={() => handlePlotSizeChange(plotSize + 0.5)}
            >
              +
            </PlotSizeButton>
          </PlotSizeControl>
        </InputGroup>

        {selectedPlant && (
          <>
            <NutrientGrid>
              <NutrientCard>
                <NutrientLabel>Nitrogen (N)</NutrientLabel>
                <NutrientInput
                  type="text"
                  value={nutrientValues.N}
                  onChange={(e) => handleNutrientChange('N', e.target.value)}
                  placeholder="Enter N value"
                  pattern="[0-9]*\.?[0-9]*"
                />
                <UnitLabel>kg per {plotSize} {selectedUnit}</UnitLabel>
              </NutrientCard>
              <NutrientCard>
                <NutrientLabel>Phosphorus (P)</NutrientLabel>
                <NutrientInput
                  type="text"
                  value={nutrientValues.P}
                  onChange={(e) => handleNutrientChange('P', e.target.value)}
                  placeholder="Enter P value"
                  pattern="[0-9]*\.?[0-9]*"
                />
                <UnitLabel>kg per {plotSize} {selectedUnit}</UnitLabel>
              </NutrientCard>
              <NutrientCard>
                <NutrientLabel>Potassium (K)</NutrientLabel>
                <NutrientInput
                  type="text"
                  value={nutrientValues.K}
                  onChange={(e) => handleNutrientChange('K', e.target.value)}
                  placeholder="Enter K value"
                  pattern="[0-9]*\.?[0-9]*"
                />
                <UnitLabel>kg per {plotSize} {selectedUnit}</UnitLabel>
              </NutrientCard>
            </NutrientGrid>

            <CalculateButton 
              type="button"
              onClick={handleCalculate}
              disabled={!nutrientValues.N || !nutrientValues.P || !nutrientValues.K}
            >
              Calculate Fertilizer Combinations
            </CalculateButton>

      {calculatedValues && (
        <CalculationsContainer>
          <CalculationBox>
            <CalculationTitle>{calculatedValues.combination1.name}</CalculationTitle>
            <CalculationGrid>
              <CalculationItem>
                <CalculationLabel>UREA</CalculationLabel>
                <CalculationValue>{calculatedValues.combination1.UREA} kg</CalculationValue>
              </CalculationItem>
              <CalculationItem>
                <CalculationLabel>TSP</CalculationLabel>
                <CalculationValue>{calculatedValues.combination1.TSP} kg</CalculationValue>
              </CalculationItem>
              <CalculationItem>
                <CalculationLabel>MOP</CalculationLabel>
                <CalculationValue>{calculatedValues.combination1.MOP} kg</CalculationValue>
              </CalculationItem>
            </CalculationGrid>
          </CalculationBox>

          <CalculationBox>
            <CalculationTitle>{calculatedValues.combination2.name}</CalculationTitle>
            <CalculationGrid>
              <CalculationItem>
                <CalculationLabel>DAP</CalculationLabel>
                <CalculationValue>{calculatedValues.combination2.DAP} kg</CalculationValue>
              </CalculationItem>
              <CalculationItem>
                <CalculationLabel>UREA</CalculationLabel>
                <CalculationValue>{calculatedValues.combination2.UREA} kg</CalculationValue>
              </CalculationItem>
              <CalculationItem>
                <CalculationLabel>MOP</CalculationLabel>
                <CalculationValue>{calculatedValues.combination2.MOP} kg</CalculationValue>
              </CalculationItem>
            </CalculationGrid>
          </CalculationBox>

          <CalculationBox>
            <CalculationTitle>{calculatedValues.combination3.name}</CalculationTitle>
            <CalculationGrid>
              <CalculationItem>
                <CalculationLabel>10-26-26</CalculationLabel>
                <CalculationValue>{calculatedValues.combination3["10-26-26"]} kg</CalculationValue>
              </CalculationItem>
              <CalculationItem>
                <CalculationLabel>TSP</CalculationLabel>
                <CalculationValue>{calculatedValues.combination3.TSP} kg</CalculationValue>
              </CalculationItem>
              <CalculationItem>
                <CalculationLabel>UREA</CalculationLabel>
                <CalculationValue>{calculatedValues.combination3.UREA} kg</CalculationValue>
              </CalculationItem>
            </CalculationGrid>
          </CalculationBox>
        </CalculationsContainer>
      )}
          </>
        )}
      </Form>
    </Container>
  );
};

export default FertilizerCalculator;
