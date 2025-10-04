import styled, { keyframes } from 'styled-components';

// Keyframe for rotating elements
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Keyframe for shifting lines
const shift = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 56px 56px;
  }
`;

// Main container for all blueprint layers
export const BlueprintContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  // Parallax effect on mouse move
  perspective: 1000px; 
`;

// A general layer style
const BlueprintLayer = styled.div`
  position: absolute;
  top: -10%;
  left: -10%;
  width: 120%;
  height: 120%;
  transition: transform 0.5s ease-out;
`;

// The static base grid
export const GridLayer = styled(BlueprintLayer)`
  background-image: 
    repeating-linear-gradient(0deg, transparent, transparent 27px, ${({ theme }) => theme.text_primary + '11'} 28px),
    repeating-linear-gradient(90deg, transparent, transparent 27px, ${({ theme }) => theme.text_primary + '11'} 28px);
  background-size: 28px 28px;
`;

// Layer with animated, shifting diagonal lines
export const ShiftingLinesLayer = styled(BlueprintLayer)`
  background-image: repeating-linear-gradient(
    45deg, 
    ${({ theme }) => theme.text_primary + '09'} 0, 
    ${({ theme }) => theme.text_primary + '09'} 1px, 
    transparent 1px, 
    transparent 28px
  );
  background-size: 56px 56px;
  animation: ${shift} 20s linear infinite;
  opacity: 0.5;
`;

// Layer with large, rotating circles
export const RotatingCirclesLayer = styled(BlueprintLayer)`
  background-image: 
    radial-gradient(circle at center, transparent 60%, ${({ theme }) => theme.primary + '1a'} 60.5%, transparent 61%),
    radial-gradient(circle at center, transparent 40%, ${({ theme }) => theme.primary + '1a'} 40.5%, transparent 41%),
    radial-gradient(circle at center, transparent 20%, ${({ theme }) => theme.primary + '1a'} 20.5%, transparent 21%);
  animation: ${rotate} 60s linear infinite;
  opacity: 0.6;
`;

