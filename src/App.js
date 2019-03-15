import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


class App extends Component {
  state = {
    ph_number: [],
    newBookData: {
      name: '',
      phone_number: ''
    },
    editBookData: {
      id: '',
      name: '',
      phone_number: ''
    },
    newBookModal: false,
    editBookModal: false
  }
  componentWillMount() {
    this._refreshph_number();
  }
  toggleNewBookModal() {
    this.setState({
      newBookModal: ! this.state.newBookModal
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: ! this.state.editBookModal
    });
  }
  addBook() {
    axios.post('http://localhost:3000/ph_number', this.state.newBookData).then((response) => {
      let { ph_number } = this.state;

      ph_number.push(response.data);

      this.setState({ ph_number, newBookModal: false, newBookData: {
        name: '',
        phone_number: ''
      }});
    });
  }
  updateBook() {
    let { name, phone_number } = this.state.editBookData;

    axios.put('http://localhost:3000/ph_number/' + this.state.editBookData.id, {
      name, phone_number
    }).then((response) => {
      this._refreshph_number();

      this.setState({
        editBookModal: false, editBookData: { id: '', name: '', phone_number: '' }
      })
    });
  }
  editBook(id, name, phone_number) {
    this.setState({
      editBookData: { id, name, phone_number }, editBookModal: ! this.state.editBookModal
    });
  }
  deleteBook(id) {
    axios.delete('http://localhost:3000/ph_number/' + id).then((response) => {
      this._refreshph_number();
    });
  }
  _refreshph_number() {
    axios.get('http://localhost:3000/ph_number').then((response) => {
      this.setState({
        ph_number: response.data
      })
    });
  }
  render() {
    let ph_number = this.state.ph_number.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.name}</td>
          <td>{book.phone_number}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id, book.name, book.phone_number)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Phone_Number Directory</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Phone_number</Button>

      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">name</Label>
            <Input id="name" value={this.state.newBookData.name} onChange={(e) => {
              let { newBookData } = this.state;

              newBookData.name = e.target.value;

              this.setState({ newBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">phone_number</Label>
            <Input id="phone_number" value={this.state.newBookData.phone_number} onChange={(e) => {
              let { newBookData } = this.state;

              newBookData.phone_number = e.target.value;

              this.setState({ newBookData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addBook.bind(this)}>Add phone_number</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a new book</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">name</Label>
            <Input id="name" value={this.state.editBookData.name} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.name = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">phone_number</Label>
            <Input id="phone_number" value={this.state.editBookData.phone_number} onChange={(e) => {
              let { editBookData } = this.state;

              editBookData.phone_number = e.target.value;

              this.setState({ editBookData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>


        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>phone_number</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {ph_number}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
