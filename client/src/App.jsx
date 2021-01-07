import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import ResultContainer from './components/ResultContainer.jsx';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      currentPage: 1,
      pageCount: 10,
      showPage: false,
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleNewPageData = this.handleNewPageData.bind(this);
  }

  handleSearchChange(event) {
    this.setState({query: event.target.value});
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    ReactDOM.unmountComponentAtNode(document.getElementById('results'));
    this.setState({showPage: true});
    axios.get(`http://localhost:3000/events?description_like=${this.state.query}&_page=${this.state.currentPage}`)
    .then((results) => ReactDOM.render(<ResultContainer data={results.data} />, document.getElementById('results')))
    .catch((err) => console.log(err));
  }

  handlePageClick(event) {
    let newPage = event.selected + 1;
    this.setState({currentPage: newPage});
    this.handleNewPageData(newPage);
  }

  handleNewPageData(newPage) {
    ReactDOM.unmountComponentAtNode(document.getElementById('results'));
    axios.get(`http://localhost:3000/events?description_like=${this.state.query}&_page=${newPage}`)
    .then((results) => ReactDOM.render(<ResultContainer data={results.data} />, document.getElementById('results')))
    .catch((err) => console.log(err));
  }

  render() {
    let paginate, resultHeader, tableHeader;
    if(this.state.showPage === true) {
      paginate = 
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
        />;
      resultHeader = <h2>Results</h2>;
      tableHeader = 
        <Row id='tableHeader'>
          <Col xl={2}>
            <p id='heading'>Date</p>
          </Col>   
          <Col>
            <p id='heading'>Description</p>
          </Col>    
        </Row>
    }
    return ( 
      <div>
        <Container>
          <Col>
            <Row id='header'>
              <Col>
                <Row>
                  <h1>Historical Event Finder</h1>
                </Row>
              </Col>
              <Col>
                <Row>
                  <p id='searchTitle'>Search</p>
                  <input type='text' id='search' onChange={this.handleSearchChange} value={this.state.query} />
                  <input type='submit' id='search' onClick={this.handleSearchSubmit}/>
                </Row>
              </Col>
            </Row>
            <Row>
              {resultHeader}
            </Row>
            {tableHeader}
            <Row>
              <div id='results'></div>
            </Row>
            <Row>
              {paginate}
            </Row>
          </Col>
        </Container>
      </div>
    );
  }
}

export default App;