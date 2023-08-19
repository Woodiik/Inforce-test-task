import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const AddBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  margin-bottom: 40px;

  width: 129px;
  height: 40px;
  padding: 9px 0;
  border-radius: 40px;
  border: none;
  background-color: lightblue;

  color: black;
  font-family: Manrope;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.64px;

  cursor: pointer;

  &:hover {
    background: linear-gradient(315deg, #419ef1 0%, #9bd0ff 100%);
  }
`;
