import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Spinner, CardHeader } from "reactstrap";
import { getTransfer, finalizeTransfer } from "../../store/actions/actions_transaction";
import Content from "./Content";


class Transactions extends Component {
  async componentDidMount() {
    document.title = "Transfer";
    const { getTransfer } = this.props;
    try {
      await getTransfer();
    } catch(err) {}
  }

  onCompleteTransaction = async (data) => {
    const { finalizeTransfer } = this.props;
    try {
      await finalizeTransfer(data)
    } catch(err) {}
  }
  render() {
    const { transaction } = this.props;
    const pendingTransactions = transaction.transaction && transaction.transaction;
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
          <h3>Pending Transfer Requests</h3>
        </CardHeader>
        <div className="card-body">
          <Table className="mt-5">
            <thead>
              <tr style={{ color: '#20a8d8' }}>
                <th>S/N</th>
                <th>Sender</th>
                <th>Amount</th>
                <th>Reciever</th>
                <th>Reciever phone</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction.loading === true ? <Spinner color="primary" /> :
                newArr.length > 0 ? newArr.map( ( transact, index ) => (
                  <Content
                    key={transact._id}
                    index={index}
                    transact={transact}
                    transaction={transaction}
                    onCompleteTransaction={this.onCompleteTransaction}
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
    getTransfer: () => dispatch( getTransfer() ),
    finalizeTransfer: (data) => dispatch(finalizeTransfer(data))
  }
  return dispatchProps
}

export default connect(mapStateToProps,mapDispatchToProps)( Transactions );