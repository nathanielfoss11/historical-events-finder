import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Col, Row } from 'react-bootstrap';
import Search from './components/Search.jsx'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
          isLoggedIn: false,
    
        }
      }

    render() {
        return ( 
            <div>
                <Container>
                    <Col>
                        <Row>
                            <p>Search</p>
                            <Search />
                        </Row>
                        <Row>
                            Results
                        </Row>
                        <Row>
                            <div id='results'></div>
                        </Row>
                    </Col>
                </Container>
            </div>
        );
    }
}

export default App;