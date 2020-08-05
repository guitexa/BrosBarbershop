import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import BackgroundImage from '../../assets/bgdark.png';

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
  background: url(${BackgroundImage}) no-repeat center fixed;
  min-height: 100vh;
`;

export const ContentEffect = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${transitionEffect} 1s;

  img {
    width: 300px;
  }

  form {
    width: 330px;
    display: flex;
    flex-direction: column;

    a {
      color: ${shade(0.6, '#f2f2f2')};
      text-decoration: none;
      text-align: center;
      transition: all 0.2s;
      margin: 10px auto auto auto;

      &:hover {
        color: #f2f2f2;
      }
    }
  }
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    color: ${shade(0.3, '#f2f2f2')};
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      color: #f2f2f2;
      svg {
        transform: translateX(-6px);
      }
    }

    svg {
      transition: all 0.2s;
      margin-right: 10px;
    }
  }
`;
