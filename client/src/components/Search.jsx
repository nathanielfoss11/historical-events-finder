import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
          query: ''
    
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }

    handleChange(event) {
      this.setState({query: event.target.value})
    }

    handleSubmit(event) {
      console.log(this.state.query)
      event.preventDefault()
      axios.get(`http://localhost:3000/events?description_like=${this.state.query}`)
      .then((results) => console.log(results.data.length))
      .catch((err) => console.log(err))
    }

    render() {
        return ( 
            <div>
              <input type='text' onChange={this.handleChange} value={this.state.query} />
              <input type='submit' onClick={this.handleSubmit}/>
            </div>
        );
    }
}

export default Search;