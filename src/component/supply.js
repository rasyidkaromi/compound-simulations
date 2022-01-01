/* eslint-disable */
/* eslint-disable-next-line */

import React, { useState, useContext } from 'react'
import { ethers } from 'ethers'
import { Container, Row, Col, Button, Form, Card, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { EtherContext } from '../context/etherscontext'
import './Wallet.css'

const Supply = () => {

    const {
        CEther, callProvider,
    } = useContext(EtherContext)

    const [supplyamountData, setsupplyamountData] = useState(0)
    const [reedemamountData, setreedemamountData] = useState(0)
    const [disablebuttonsupply, setdisablebuttonsupply] = useState(false)
    const [disablebuttonreedem, setdisablebuttonreedem] = useState(false)

    const supplyEth = async () => {
        let overrides = {
            value: ethers.utils.parseEther(supplyamountData),
        };
        let tx = await CEther.mint(overrides)
        await tx.wait(1)
        setsupplyamountData(0)
        callProvider()
    }
    const reedemEth = async () => {
        let tx = await CEther.redeem(reedemamountData * (10 ** 8))
        await tx.wait(1)
        setreedemamountData(0)
        callProvider()
    }

    return (
        <>
            <br />
            <Container>
                <Card body>
                    {"ETHER MARKET"}
                    <br />
                    <Row>
                        <Col sm={6}>
                            <Card.Body>
                                <input
                                    name="eth supply"
                                    type="number"
                                    value={supplyamountData}
                                    onChange={(res) => {
                                        if (res.target.value === "" || Number(res.target.value) === 0) {
                                            setsupplyamountData(0)
                                        } else {
                                            setsupplyamountData(res.target.value)
                                        }
                                    }} />
                                <br />	<br />
                                <Button variant="dark" disabled={disablebuttonsupply} onClick={supplyEth}>{"Supply with ETH"}</Button>
                            </Card.Body>
                        </Col>
                        <Col sm={6}>
                            <Card.Body>
                                <input
                                    name="eth reedem"
                                    type="number"
                                    value={reedemamountData}
                                    onChange={(res) => {
                                        if (res.target.value === "" || Number(res.target.value) === 0) {
                                            setreedemamountData(0)
                                        } else {
                                            setreedemamountData(res.target.value)
                                        }
                                    }} />
                                <br />	<br />
                                <Button variant="dark" disabled={disablebuttonreedem} onClick={reedemEth}>{"Reedem with CETH"}</Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                <br /><br />
            </Container>
        </>
    )
}

export default Supply;



