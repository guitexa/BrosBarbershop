import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type?: 'info' | 'error' | 'success';
  hasDescription: boolean;
}

const toastTypesVariations = {
  info: css`
    background-color: #ebf8ff;
    color: #3172b7;
  `,

  success: css`
    background-color: #e6fffa;
    color: #2e656a;
  `,

  error: css`
    background-color: #fddede;
    color: #c53030;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  position: relative;
  min-width: 300px;
  display: inline-flex;
  padding: 16px 45px 16px 16px;
  border-radius: 8px;
  align-items: flex-start;
  box-shadow: 2px 2px 5px #00000050;
  text-align: initial;
  margin-right: 18px;

  ${(props) => toastTypesVariations[props.type || 'info']};

  > svg {
    margin: 3px 12px 0 0;
  }

  & + div {
    margin-top: 12px;
  }

  div {
    flex: 1;
    height: ${(props) => (props.hasDescription ? 'auto' : '25px')};
    p {
      font-size: 18px;
      line-height: 16px;
    }
  }

  button {
    position: absolute;
    height: 20px;
    right: 16px;
    top: ${(props) => (props.hasDescription ? '16px' : '18px')};
    border: 0;
    outline: none;
    background: transparent;
    color: inherit;
    transition: all 0.2s;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;

      > svg {
        margin: 0 12px 0 0;
      }
    `};
`;
