import styled from "@emotion/styled";
const theme = {
  color_blue: "#008cba",
  color_red: "#f44336",
  color_gray: "rgba(0, 0, 0, 0.3)",
  color_orange: "#ffc20052",
};

const CompleteButton = styled.button`
  background-color: ${(props) =>
    props.isDone ? `${theme.color_gray}` : `${theme.color_blue}`};
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
  background-color: ${theme.color_red};
`;

const OutlineAddButton = styled(CompleteButton)`
  background-color: white;
  color: black;
  border: 1px solid ${theme.color_blue};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${theme.color_blue};
    color: white;
  }
`;

const OutlineDeleteButton = styled(OutlineAddButton)`
  margin-left: 10px;
  border: 1px solid ${theme.color_red};
  &:hover {
    background-color: ${theme.color_red};
  }
`;

export { CompleteButton, DeleteButton, OutlineAddButton, OutlineDeleteButton };
