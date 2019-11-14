import React from "react";
import { Spinner } from "reactstrap";

const WithdrawContent = ( { onRequestApprove, transaction, transact, index } ) => {
  return (
    <tr>
      <th scope="row" key={transact._id}>{index + 1}</th>
      <td>{transact.userId && transact.userId.name}</td>
      <td>&#8358;{transact.amount}</td>
      <td>{transact.createdAt && transact.createdAt.slice( 0, 10 )}</td>
      <td>{transact.status === false ? "Pending" : "Approved"}</td>
      <td
        onClick={(e) => onRequestApprove(e, transact.amount, transact.userId._id, transact._id )}
        style={{
          color: "#ff0000",
          cursor: "pointer"
        }}
      >{transaction.requestLoading === true ? <Spinner className="primary" /> : "Approve"}</td>
    </tr>
  )
}

export default WithdrawContent;