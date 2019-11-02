import React from 'react';
import { MDBDataTable } from 'mdbreact';


class Table extends React.Component {
	constructor(props) {
    super(props)
    
  }


  render() {
  return (
    <MDBDataTable data={this.props.sendData}/>
  )
}
}

export default Table;