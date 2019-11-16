import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Spinner, CardHeader } from "reactstrap";
import { approveRequest, getRequest } from "../../store/actions/actions_transaction";
import WithdrawContent from "./WithdrawContent";


class Withdraw extends Component {
  async componentDidMount() {
    document.title = "Withdraw fund"
    const { getRequest } = this.props;
    try {
      await getRequest();
    } catch ( err ) { }
  }

  onRequestApprove = async ( e, amount, agentId, requestId ) => {
    e.preventDefault();
    const { approveRequest } = this.props;
    const data = {
      amount
    }
    try {
      await approveRequest(data, agentId, requestId )
    } catch ( err ) { }
  }

  render() {
    const { transaction } = this.props;
  
    const pendingTransactions = transaction.requests && transaction.requests;
    let newArr = [];
    for ( let i = 0; i < pendingTransactions.length; i++ ) {
      let trans = pendingTransactions[ i ];
      if ( trans.status === false ) {
        newArr.push( trans );
      }
    }
    return (
      <div className="card">
        <CardHeader>
          {transaction.error && transaction.error.length > 0 ?
            <p
            style={{ color: "#ff0000", paddinLeft: 10 }}
            >{transaction.error}</p> : null}
          <h3>Pending Withdrawal Requests</h3>
        </CardHeader>
        <div className="card-body">
          <Table className="mt-5">
            <thead>
              <tr style={{ color: '#20a8d8' }}>
                <th>S/N</th>
                <th>Account name</th>
                <th>Amount</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction.loading === true ? <Spinner color="primary" /> :
                newArr.length > 0 ? newArr.map( ( transact, index ) => (
                  <WithdrawContent
                    key={transact._id}
                    index={index}
                    transact={transact}
                    transaction={transaction}
                    onRequestApprove={this.onRequestApprove}
                  />
                ) ) : "List is empty"}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    transaction: state.transaction
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    getRequest: () => dispatch( getRequest() ),
    approveRequest: (data, agentId, requestId ) => dispatch( approveRequest(data, agentId, requestId)),
  }
  return dispatchProps;
}

export default connect( mapStateToProps, mapDispatchToProps )( Withdraw );