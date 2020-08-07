import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import BackgroundImage from '../../assets/bgdark.png';

const transitionEffect = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  width: 100%;
  background: url(${BackgroundImage}) no-repeat center fixed;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
`;

export const Header = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  top: 0;
  position: fixed;
`;

export const HeaderContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
  height: 120px;
  display: flex;
  align-items: center;

  a {
    padding: 2px;
    color: #666;
    transition: all 0.2s;

    &:hover {
      color: #f2f2f2;
    }
  }
`;

export const ContentEffect = styled.div`
  position: relative;
  width: 330px;
  margin: 50px auto 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${transitionEffect} 1s;

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

export const ProfilePicture = styled.div`
  position: relative;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  label {
    width: 47px;
    height: 47px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f2f2f2;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    box-shadow: 0 0 10px #000;
    transition: all 0.2s;

    &:hover {
      background: #000;
      box-shadow: 0 0 10px #f2f2f2;

      svg {
        color: #f2f2f2;
      }
    }

    svg {
      width: 22px;
      height: 22px;
      color: #333;
    }
  }

  input {
    display: none;
  }
`;
