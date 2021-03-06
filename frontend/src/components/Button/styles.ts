import styled from 'styled-components';

interface ContainerProps {
  loading: number;
}

export const Container = styled.button<ContainerProps>`
  color: #000;
  font-size: 26px;
  margin-top: 20px;
  background-color: ${(props) => (props.loading ? '#f2f2f250' : '#f2f2f2')};
  border: none;
  padding: 6px 0 3px 0;
  border-radius: 6px;
  transition: all 0.2s;
  cursor: ${(props) => (props.loading ? 'wait' : 'pointer')};

  &:hover {
    box-shadow: ${(props) => (props.loading ? 'none' : '0 0 15px #f2f2f250')};
  }
`;
