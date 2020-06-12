import styled, { keyframes } from 'styled-components';

import BackgroungImage from '../../assets/bgdark.png';

const transitionEffect = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${transitionEffect} 1s;

  background: url(${BackgroungImage}) no-repeat center;

  img {
    width: 300px;
  }

  h1 {
    margin-top: 40px;
    font-size: 80px;
  }
`;
