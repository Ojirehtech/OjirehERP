import React from "react";
import { 
  Button,
  Card,
  CardBody,
  Form,
  Spinner,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";


const Content = ( {
  amount,
  phone,
  transaction,
  onHandleChange,
  onSubmit,
} ) => {
  return (
    <div className="mt-5">
      <Card className="mt-4">
        <CardBody className="">
          <Form onSubmit={onSubmit}>
            <h3 style={{ color: "#4dbd74"}}>Transfer fund</h3>
            {transaction.error && transaction.error.length > 0 ? <p
              style={{ color: "#ff0000" }}
            >{transaction.error}</p> : null}
            <p className="text-muted">Transfer from your account</p>

            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <b>&#8358;</b>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={( e ) => onHandleChange( e, "amount" )}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <b className="icon-phone"></b>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Reciever's Phone"
                value={phone}
                onChange={( e ) => onHandleChange( e, "phone" )}
              />
            </InputGroup>
            {transaction.loading === true ? <Spinner color="" /> : (
              <Button color="success">Transfer</Button>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}


export default Content;