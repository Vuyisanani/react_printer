import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    printer_name: '',
    printer_ip: '',
    printer_status: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        printer_name: this.state.printer_name,
        printer_ip: this.state.printer_ip,
        printer_status: this.state.printer_status
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        printer_name: this.state.printer_name,
        printer_ip: this.state.printer_ip,
        printer_status: this.state.printer_status
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, printer_name, printer_ip, printer_status } = this.props.item
      this.setState({ id, printer_name, printer_ip, printer_status })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="printer_name">Printer Name</Label>
          <Input type="text" name="printer_name" id="printer_name" onChange={this.onChange} value={this.state.printer_name === null ? '' : this.state.printer_name} />
        </FormGroup>
        
        <FormGroup>
          <Label for="printer_ip">Printer IP Address</Label>
          <Input type="text" name="printer_ip" id="printer_ip" onChange={this.onChange} value={this.state.printer_ip === null ? '' : this.state.printer_ip}  placeholder="ex. 555-555-5555" />
        </FormGroup>
        
        <FormGroup>
          <Label for="printer_status">Printer Status</Label>
          <Input type="text" name="printer_status" id="printer_status" onChange={this.onChange} value={this.state._status}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm