import styled from "@emotion/styled";
import Filter from "./Filter";

const FilterWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function FilterGroup() {
  return (
    <FilterWrapper>
      <Filter filter_name="all" />
      <Filter filter_name="completed" />
      <Filter filter_name="uncompleted" />
    </FilterWrapper>
  );
}
export default FilterGroup;
