import React from "react";

const Content = ( {onCompleteTransaction, transaction, transact, index} ) => {
  return (
    <tr>
      <th scope="row" key={transact._id}>{index + 1}</th>
      <td>{transact.sender && transact.sender.name}</td>
      <td>&#8358;{transact.amount}</td>
      <td>{transact.reciever}</td>
      <td>{transact.recieverPhone}</td>
      <td>{transact.createdAt && transact.createdAt.slice(0,10)}</td>
      <td>{transact.status === false ? "Pending": "Complete"}</td>
      <td
        onClick={() => onCompleteTransaction(transact._id)}
        style={{
          color: "#ff0000",
          cursor: "pointer"
        }}
      >Complete</td> 
    </tr>
  )
}

export default Content;