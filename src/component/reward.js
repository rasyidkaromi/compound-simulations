/* eslint-disable */
/* eslint-disable-next-line */

import React, { useState, useContext, useEffect } from 'react'
import { ethers } from 'ethers'
import { Container, Row, Col, Button, Form, Card, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { EtherContext } from '../context/etherscontext'
import './Wallet.css'

const Reward = () => {

    const { Comptroller, meBalanceOfComp, defaultAccount, callProvider, ComptrollerProxy } = useContext(EtherContext)

    
    const claimReward = async () => {
        if(defaultAccount){
            let tx = await Comptroller["claimComp(address)"](defaultAccount)
            await tx.wait(1)
            callProvider()
        }else{
            return
        }

    }

    return (
        <>
            <br />
            <Container>
                <Card body>
                    <br />
                    <Row>
                        <Col sm={12}>
                            <Card style={{
                                fontSize: 12,
                            }}>
                                <Card.Body>
                                    Your COMP Balance
                                    <br />
                                    {meBalanceOfComp}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={12}>
                            <Form>
                                <Form.Text className="text-muted">
                                    if you have made a "supply" or "borrow" transaction, you can claim the reward manually. The token is not transferred to your address until you get on this button.
                                </Form.Text>
                                <br /><br />
                                <Button variant="primary" type="submit" onClick={claimReward}>
                                    Get Reward
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Card>
                <br /><br />
            </Container>
        </>
    )
}

export default Reward;



