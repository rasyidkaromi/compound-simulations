/* eslint-disable */
/* eslint-disable-next-line */

import React, { useState, useContext} from 'react'
import { Container, Row, Col, Button, Card, Navbar, Nav} from 'react-bootstrap'
import { EtherContext } from '../context/etherscontext'
import '../style.css'


const Header = () => {
    const {
        defaultAccount,
        userBalance,
        connectWalletHandler,

        CEtherBalance, CEthertotalSupply, meBalanceOfCDai,
        meBalanceOfCether, meBalanceOUnderlyingfCether, CDaitotalSupply
    } = useContext(EtherContext)
    
    const [connButtonText, setConnButtonText] = useState('Connect Wallet')


    return (
        <>
            <Navbar bg="light" expand="lg" className="sticky-nav">
                <Container>
                    <Navbar.Brand href="#">{"RATE"}</Navbar.Brand>
                    <Navbar.Brand href="#/supply">{"SUPPLY"}</Navbar.Brand>
                    <Navbar.Brand href="#/borrow">{"BORROW"}</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {defaultAccount ? <Navbar.Collapse className="justify-content-end">
                        {/* <Nav className="me-auto"> */}
                        <Nav.Link href="#address"> {defaultAccount}</Nav.Link> |
                        <Nav.Link href="#balance"> balance : {userBalance}</Nav.Link>
                        {/* </Nav> */}
                    </Navbar.Collapse> : []}
                    {!defaultAccount ? (
                        <Navbar.Collapse className="justify-content-end">
                            <Button className="justify-content-end" onClick={connectWalletHandler}>{connButtonText}</Button>
                        </Navbar.Collapse>) : []}

                </Container>
            </Navbar>
            <Navbar bg="light" expand="lg" className="sticky-nav">
                <Container style={{ display: "block" }}>
                    <Card body >
                        <Row>
                            <Col md={2}>
                                <Card style={{
                                    fontSize: 10,
                                }}>
                                    <Card.Body>
                                        Total Eth CETH
                                        <br />
                                        {CEtherBalance}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={2}>
                                <Card style={{
                                    fontSize: 10,
                                }}>
                                    <Card.Body>
                                        Total Supply CETH
                                        <br />
                                        {CEthertotalSupply / (10 ** 8)}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={2}>
                                <Card style={{
                                    fontSize: 10,
                                }}>
                                    <Card.Body>
                                        Total Supply CDAI
                                        <br />
                                        {CDaitotalSupply / (10 ** 8)}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={2}>
                                <Card style={{
                                    fontSize: 10,
                                }}>
                                    <Card.Body>
                                        Your Eth CETH Underlying
                                        <br />
                                        {meBalanceOUnderlyingfCether}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={2}>
                                <Card style={{
                                    fontSize: 10,
                                }}>
                                    <Card.Body>
                                        Your CETH Supply
                                        <br />
                                        {meBalanceOfCether / (10 ** 8)}
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={2}>
                                <Card style={{
                                    fontSize: 10,
                                }}>
                                    <Card.Body>
                                        Your CDAI Supply
                                        <br />
                                        {meBalanceOfCDai / (10 ** 8)}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </Navbar>

        </>
    )
}

export default Header

