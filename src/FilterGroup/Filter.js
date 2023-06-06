import styled from "@emotion/styled";
import { useContext } from "react";
import { FilterContext } from "../App";

const FilterItem = styled.div`
  padding: 0.5rem 1rem;
  border: ${(props) =>
    props.$active ? "1px solid salmon" : "1px solid white"};
  color: black;
  margin-left: 10px;
  &:hover {
    color: red;
  }
`;

const Filter = ({ filter_name }) => {
  const { filter, setFilter } = useContext(FilterContext);
  return (
    <FilterItem
      $active={filter_name === filter}
      onClick={() => {
        setFilter(filter_name);
      }}
    >
      {filter_name}
    </FilterItem>
  );
};
export default Filter;
