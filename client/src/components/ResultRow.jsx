import React from 'react';
import { Col, Row } from 'react-bootstrap';

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
    let date;
    if(this.state.date < 0) {
      date = <p>{Math.abs(this.state.date)} BC</p>
    } else if(this.state.date.indexOf('-') > -1){
      date = <p>{this.state.date.slice(1, -1)} BC</p>
    } else {
      date = <p>{this.state.date} AD</p>
    }
    return (
      <Col>
        <Row id='resultRecord'>
          <Col xl={2}>
            {date}
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