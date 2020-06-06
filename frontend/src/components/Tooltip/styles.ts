import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin-right: 16px;

  span {
    position: absolute;
    background-color: #f2f2f2;
    width: 180px;
    display: flex;
    justify-content: center;
    left: 50%;
    transform: translateX(-50%);
    bottom: calc(100% + 12px);
    border-radius: 5px;
    padding: 10px 10px 7px 10px;
    line-height: 20px;
    text-align: center;
    transition: all 0.3s;

    visibility: hidden;
    opacity: 0;

    &::before {
      content: '';
      border-style: solid;
      border-color: #f2f2f2 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.3s;
    }
  }

  &:hover {
    span {
      visibility: visible;
      opacity: 1;
    }
  }
`;
