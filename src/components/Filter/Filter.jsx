import PropTypes from 'prop-types';

import { FilterContainer, Input } from './Filter.styled';
const Filter = ({ filter, handelFilterChange }) => {
  return (
    <FilterContainer>
      <span>Find contacts by name</span>
      <Input
        type="text"
        name="filter"
        value={filter}
        onChange={handelFilterChange}
      />
    </FilterContainer>
  );
};

export default Filter;

Filter.propTypes = {
  handelFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string,
};