import styled from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ isFocused, isErrored }) =>
      isFocused ? '#f2f2f2' : isErrored ? '#880000' : '#606060'};
  border-radius: 6px;
  margin-top: 40px;
  background-color: #00000040;
  color: #606060;
  transition: all 0.2s;
  box-shadow: 0 0 15px
    ${({ isFocused }) => (isFocused ? '#f2f2f250' : 'transparent')};

  svg {
    color: ${({ isFocused, isFilled }) =>
      isFocused ? '#f2f2f2' : isFilled ? '#f2f2f2' : '#606060'};
    margin: 16px;
  }

  & + div {
    margin-top: 14px;
  }

  input[placeholder='E-mail'] {
    text-transform: lowercase;
  }

  input {
    flex: 1;
    padding: 10px 0;
    background-color: transparent;
    text-transform: none;
    border: none;
    color: #f2f2f2;
    transition: all 0.2s;

    &::placeholder {
      text-transform: uppercase;
      color: #606060;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  transition: all 0.2s;

  svg {
    color: #880000;
    margin: 0;
  }

  span {
    color: #f2f2f2;
    background-color: #880000;

    &::before {
      border-color: #880000 transparent;
    }
  }
`;
