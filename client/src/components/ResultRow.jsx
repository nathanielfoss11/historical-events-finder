import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

class ResultRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          date: props.row.date,
          description: props.row.description,
          granularity: props.row.granularity,
          lang: props.row.lang,
          category1: props.row.category1,
          category2: props.row.category2,
        }
      }

    render() {
      let date, description
        return (
          <Col>
            <Row>
                <Col xl={1}>
                  {this.state.date}
                </Col>   
                <Col>
                  {this.state.description}
                </Col>                   

              </Row>
          </Col>
        );
    }
}

export default ResultRow;