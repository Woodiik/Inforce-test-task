import styled from 'styled-components';
export const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  padding: 16px;

  background-color: #e9e9e9;
`;

export const DeleteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  padding: 9px 0;
  margin-bottom: 8px;
  border-radius: 40px;
  border: 2px solid var(--dark-blue);
  background-color: lightblue;

  color: var(--dark-blue);
  font-family: Manrope;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.64px;
  cursor: pointer;

  &:hover {
    color: white;
    background: linear-gradient(315deg, #419ef1 0%, #9bd0ff 100%);
    border: none;
  }
`;
