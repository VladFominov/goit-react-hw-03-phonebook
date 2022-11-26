import PropTypes from 'prop-types';

import { Li, BtnOnDelete, } from './ContactList.styled';
 import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul>
      {' '}
      {contacts.map(({ id, name, number }) => {
        return (
          <Li key={id}>
            {' '}
            {name}: {number}
            <BtnOnDelete type="button" onClick={() => onDelete(id)}>
              <DeleteForeverIcon  /> 
            </BtnOnDelete>
          </Li>
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};