import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Spinner, CardHeader } from "reactstrap";
import Content from "./Content";
import { approveTransfer, getAllTransfer } from "../../store/actions/action_transfer";


class Transactions extends Component {
  async componentDidMount() {
    document.title = "Transfer";
    const { getAllTransfer } = this.props;
    try {
      await getAllTransfer();
    } catch(err) {}
  }

  onCompleteTransaction = async (data) => {
    const { approveTransfer } = this.props;
    try {
      await approveTransfer(data)
    } catch(err) {}
  }
  render() {
    const { transfer } = this.props;
    const pendingTransfer = transfer.transfer && transfer.transfer;
    let newArr = [];
    for ( let i = 0; i < pendingTransfer.length; i++ ) {
      let trans = pendingTransfer[ i ];
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
              {transfer.loading === true ? <Spinner color="primary" /> :
                newArr.length > 0 ? newArr.map( ( trans, index ) => (
                  <Content
                    key={trans._id}
                    index={index}
                    transact={trans}
                    transaction={transfer}
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
    transfer: state.transfer
  }
}

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    approveTransfer: ( data ) => dispatch( approveTransfer( data ) ),
    getAllTransfer: () => dispatch(getAllTransfer())
  }
  return dispatchProps
}

export default connect(mapStateToProps,mapDispatchToProps)( Transactions );