
/* eslint-disable */
/* eslint-disable-next-line */

import React, { useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
// import { BigNumber } from ethers
import { Container, Row, Col, Modal, Button, Form, Card, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { EtherContext } from '../context/etherscontext'
import '../style.css'

const Rate = () => {
    const { CEther, 
        saveInterestRate, saveExchangeRate, 
        CheckInterestRate, CheckExchangeRate,
     } = useContext(EtherContext)

    // const [saveExchangeRate, setsaveExchangeRate] = useState({})
    // const [saveInterestRate, setsaveInterestRate] = useState({})

    // useEffect(() => {
    //     if (CEther) {
    //         CheckInterestRate()
    //         CheckExchangeRate()
    //     }
    // }, [CEther])

    // const CheckExchangeRate = () => {
    //     CEther.callStatic.exchangeRateCurrent().then(res => {
    //         const exchangeRateCurrents = res.toString()
    //         const underlyingDecimals = 18 // decimals like DAI or USDC
    //         const cTokenDecimals = 8 // decimals like CDAI
    //         const mantissa = 18 + parseInt(underlyingDecimals) - cTokenDecimals;
    //         const oneCTokenInUnderlying = exchangeRateCurrents / Math.pow(10, mantissa)
    //         setsaveExchangeRate({
    //             result: oneCTokenInUnderlying
    //         })
    //     })
    // }
    // const CheckInterestRate = async () => {
    //     const ethMantissa = 1e18;
    //     const blocksPerDay = 6570; // 13.15 seconds per block
    //     const daysPerYear = 365;

    //     const supplyRatePerBlock = await CEther.callStatic.supplyRatePerBlock()
    //     const borrowRatePerBlock = await CEther.callStatic.borrowRatePerBlock()

    //     const supplyApy = (((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
    //     const borrowApy = (((Math.pow((borrowRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
    //     setsaveInterestRate({
    //         supplyResult: supplyApy,
    //         borrowResult: borrowApy
    //     })
    // }


    return (
        <Container>
            <br /><br />
            <Card body style={{ textAlign: "left" }} >
                EXCHANGE COMPOUND RATE <br />
                <br />
                <Row>
                    <Col sm={12}>
                        <div style={{ textAlign: "left", fontSize: 14 }}>
                            - Underlying Decimals = Mainnet decimals of underlying token, this use ETH decimals<br />
                            - CToken Decimals = Mainnet decimals for a cToken | CETH decimals <br /><br />

                            - totalCash = CEth Balance<br />
                            - totalBorrows = total from borrowAmount<br />
                            - totalReserves = from exponential Calculation, ex : {`Exp({mantissa: 5100000000000000000}) `} 18 decimal | 5.1e18 <br />
                            - totalSupply = from totalSupply Calculation | (totalSupply + mintTokens) | (totalSupply - redeemTokens)
                            <br /><br />
                            - Exchange Rate Current =  (totalCash + totalBorrows - totalReserves) / totalSupply <br />
                            - Result Rate = (Exchange Rate Current) / (1 * 10 ^ (18 + (Underlying Decimals) - (CToken Decimals)))
                        </div>
                    </Col>
                    <Col sm={7}></Col>
                </Row>
                <br />
                <Row>
                    <Col sm={4}>
                        <Card>
                            <Button variant="info" onClick={CheckExchangeRate}>Result Exchange Rate</Button>{' '}
                        </Card>
                    </Col>
                    {/* <Col sm={7}> {isObj(saveExchangeRate) ? saveExchangeRate.result : []}</Col> */}
                </Row>
                <Row>
                    <Col sm={12}>
                        <br />
                        Exchange Rate : {isObj(saveExchangeRate) ? saveExchangeRate.result : []} | 18 decimals
                    </Col>
                </Row>
                <br />

            </Card>
            <br />
            <Card body style={{ textAlign: "left" }}>
                INTEREST RATE | Annual Percentage Yield (APY) <br />
                <br />
                <Row>
                    <Col sm={12}>
                        <div style={{ textAlign: "left", fontSize: 14 }}>
                            - ethMantissa = 1e18 | 1000000000000000000 <br />
                            - blocksPerDay = 6570 | 13.15 seconds per block <br />
                            - daysPerYear = 365 <br /> <br />
                            {/* - reserveFactor = CEther.reserveFactorMantissa() <br />
                        - supplyRatePerBlock  = (totalBorrows ÷ (totalSupply × exchangeRate)) × (1-reserveFactor) × (totalBorrows ÷ underlying)<br />
                        - borrowRatePerBlock = <br /> <br /> */}
                            - supplyRatePerBlock = from CEther.callStatic.supplyRatePerBlock()<br />
                            - borrowRatePerBlock = from CEther.callStatic.borrowRatePerBlock()<br /><br />
                            - Supply APY = (((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100<br />
                            - Borrow APY = (((Math.pow((borrowRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100 <br />

                        </div>
                    </Col>
                    <Col sm={7}></Col>
                </Row>
                <br />
                <Row>
                    <Col sm={4}>
                        <Card>
                            <Button variant="info" onClick={CheckInterestRate}>Result Interest Rate APY</Button>{' '}
                        </Card>
                    </Col>
                    {/* <Col sm={7}>
                        {isObj(saveInterestRate) ? saveInterestRate.supplyResult : []}<br />
                        {isObj(saveInterestRate) ? saveInterestRate.borrowResult : []}
                    </Col> */}
                </Row>
                <Row>
                    <Col sm={12}>
                        <br />
                        Supply Result : {isObj(saveInterestRate) ? saveInterestRate.supplyResult : []} % APY for ETH<br />
                        Borrow Result : {isObj(saveInterestRate) ? saveInterestRate.borrowResult : []} % APY for ETH
                    </Col>
                </Row>
                <br />
                <br />
            </Card>
            <br /><br />
        </Container>
    )
}

export default Rate
