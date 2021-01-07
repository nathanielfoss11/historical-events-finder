import React from 'react';
import axios from 'axios';
import ResultRow from './ResultRow.jsx';

const ResultContainer = (props) => {
  return (
    props.data.map((row) => <ResultRow row={row}/>)
  );
}

export default ResultContainer;