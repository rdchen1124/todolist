import styled from "@emotion/styled";

const CompleteButton = styled.button`
  background-color: ${({ theme, isDone }) =>
    isDone ? `${theme.colors.secondary}` : `${theme.colors.primary}`};
  padding: 0.3rem 0.6rem;
  display: inline-block;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
`;

const DeleteButton = styled(CompleteButton)`
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.danger};
`;

const OutlineAddButton = styled(CompleteButton)`
  background-color: white;
  color: black;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const OutlineDeleteButton = styled(OutlineAddButton)`
  margin-left: 10px;
  border: 1px solid ${({ theme }) => theme.colors.danger};
  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
  }
`;

export { CompleteButton, DeleteButton, OutlineAddButton, OutlineDeleteButton };
