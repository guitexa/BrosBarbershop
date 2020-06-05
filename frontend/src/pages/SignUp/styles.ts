import styled from 'styled-components';
import { shade } from 'polished';

import BackgroungImage from '../../assets/bgdark.png';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: url(${BackgroungImage}) no-repeat center;

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
