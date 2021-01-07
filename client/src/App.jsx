import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Search from './components/Search.jsx';
import ResultContainer from './components/ResultContainer.jsx';

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        query: '',
        currentPage: 1,
        pageCount: 10,
      }
      this.handlePageClick = this.handlePageClick.bind(this)
      this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
      this.handleSearchChange = this.handleSearchChange.bind(this)
      this.handleNewPageData = this.handleNewPageData.bind(this)
      }

    handleSearchChange(event) {
    this.setState({query: event.target.value})
    }

    handleSearchSubmit(event) {
    event.preventDefault()
    axios.get(`http://localhost:3000/events?description_like=${this.state.query}&_page=${this.state.currentPage}`)
    .then((results) => ReactDOM.render(<ResultContainer data={results.data} />, document.getElementById('results')))
    .catch((err) => console.log(err))
    }

    handlePageClick(event) {
      let newPage = event.selected + 1
      console.log(newPage)
      this.setState({currentPage: newPage})
      this.handleNewPageData(newPage)
    }

    handleNewPageData(newPage) {
        ReactDOM.unmountComponentAtNode(document.getElementById('results'))
    axios.get(`http://localhost:3000/events?description_like=${this.state.query}&_page=${newPage}`)
    .then((results) => ReactDOM.render(<ResultContainer data={results.data} />, document.getElementById('results')))
    .catch((err) => console.log(err))
    }

    render() {
        return ( 
            <div>
                <Container>
                    <Col>
                        <Row>
                            <p>Search</p>
                            <input type='text' onChange={this.handleSearchChange} value={this.state.query} />
                            <input type='submit' onClick={this.handleSearchSubmit}/>
                        </Row>
                        <Row>
                            Results
                        </Row>
                        <Row>
                          <Col xl={1}>
                          <p>Date</p>
                          </Col>   
                          <Col>
                            <p>Description</p>
                          </Col>    
                        </Row>
                        <Row>
                            <div id='results'></div>
                        </Row>
                        <Row>
                            <a onClick={this.handlePageClick}>Next</a>
                        </Row>
                        <Row>
                            <ReactPaginate
                              previousLabel={'previous'}
                              nextLabel={'next'}
                              breakLabel={'...'}
                              breakClassName={'break-me'}
                              pageCount={this.state.pageCount}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={this.handlePageClick}
                              containerClassName={'pagination'}
                              subContainerClassName={'pages pagination'}
                              activeClassName={'active'}
                              />
                        </Row>
                    </Col>
                </Container>
            </div>
        );
    }
}

export default App;