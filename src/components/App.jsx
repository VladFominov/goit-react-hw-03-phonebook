import React, { Component } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';
// import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    ShowForm: false,
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (!contacts) return;
    this.setState({contacts: contacts})
    // const natify = () => toast.info('Form been opened');
    // return (natify);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

  }

  handelFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  formSubmitHandler = data => {
    if (this.state.contacts.some(({ name }) => name === data.name)) {
      return alert(data.name + ' is already in contacts');
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { ...data, id: nanoid() }],
      };
    });
  };

  filteredContact = () => {
    return this.state.contacts.filter(({ name }) => {
      return name.toLowerCase().includes(this.state.filter.toLowerCase());
    });
  };

  onDelete = contactId => {
    this.setState(state => {
      return {
        contacts: state.contacts.filter(contact => contact.id !== contactId),
      };
    });
  };

  render() {
    const filteredContacts = this.filteredContact();
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <Button
          variant="contained"
          onClick={() => this.setState({ ShowForm: !this.state.ShowForm })}
        >
          {this.state.ShowForm
            ? 'Click me to hide Form'
            : 'Click me to open Form'}
        </Button>
        {this.state.ShowForm && <Form onSubmit={this.formSubmitHandler} />}
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          handelFilterChange={this.handelFilterChange}
        />
        <ContactList contacts={filteredContacts} onDelete={this.onDelete} />
      </div>
    );
  }
}
