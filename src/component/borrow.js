/* eslint-disable */
/* eslint-disable-next-line */

import React, { useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
// import { BigNumber } from ethers
import { Container, Row, Col, Modal, Button, Form, Card, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { EtherContext } from '../context/etherscontext'
import './Wallet.css'
// import Rate from './component/rate'

const Borrow = () => {

    const {
        defaultAccount,  CEther, Comptroller, CDai, Dai,
        meBorrowBalanceOfCDai, meBorrowBalanceOfCEther, meBalanceOfDai, meBalanceOfCDai, DAIPrice, 
        callProvider, setmeBorrowBalanceOfCDai,
        isCETHmember, isCDAImember, liquidityInfo, CollateralCETH, CollateralCDAI, 
        CETHBorrowRate, CDAIBorrowRate,
        setisCETHmember, setisCDAImember,
    } = useContext(EtherContext)

    // input button
    const [borrowamountData, setborrowamountData] = useState(0)
    const [repayamountData, setrepayamountData] = useState(0)

    // const [isCETHmember, setisCETHmember] = useState(false)
    // const [isCDAImember, setisCDAImember] = useState(false)
    // const [liquidityInfo, setliquidityInfo] = useState(0)

    // const [CollateralCETH, setCollateralCETH] = useState({})
    // const [CollateralCDAI, setCollateralCDAI] = useState({})

    // const [CETHBorrowRate, setCETHBorrowRate] = useState("empty")
    // const [CDAIBorrowRate, setCDAIBorrowRate] = useState("empty")

    // useEffect(() => {
    //     if (defaultAccount) {
    //         checkMembershipCETH()
    //         checkMembershipCDAI()
    //         checkliquidity()
    //         checkCollateral()
    //         borrowRate()
    //     }
    // }, [defaultAccount])

    // const checkMembershipCETH = async () => {
    //     if (defaultAccount) {
    //         let result = await Comptroller.callStatic.checkMembership(defaultAccount, CETH);
    //         setisCETHmember(result)
    //     }
    // }
    // const checkMembershipCDAI = async () => {
    //     if (defaultAccount) {
    //         let result = await Comptroller.callStatic.checkMembership(defaultAccount, CDAI);
    //         setisCDAImember(result)
    //     }
    // }
    // const checkliquidity = async () => {
    //     if (defaultAccount) {
    //         let [err, liquidity, shortfall] = await Comptroller.callStatic.getAccountLiquidity(defaultAccount);
    //         setliquidityInfo(liquidity.toString())
    //     }
    // }
    // const checkCollateral = async () => {
    //     let [isListedCETH, collateralFactorCETH, isCompedCETH] = await Comptroller.callStatic.markets(CETH)
    //     let [isListedCDAI, collateralFactorCDAI, isCompedCDAI] = await Comptroller.callStatic.markets(CDAI)
    //     setCollateralCETH({
    //         isListed: isListedCETH,
    //         collateralFactor: (collateralFactorCETH / 1e18) * 100,
    //         isComped: isCompedCETH
    //     })
    //     setCollateralCDAI({
    //         isListed: isListedCDAI,
    //         collateralFactor: (collateralFactorCDAI / 1e18) * 100,
    //         isComped: isCompedCDAI
    //     })
    // }

    const registerCETHMember = async () => {
        let markets = [CETH] // This is the CDAI contract(s) for your collateral
        let enterMarkets = await Comptroller.enterMarkets(markets)
        await enterMarkets.wait(1);
        let result = await Comptroller.callStatic.checkMembership(defaultAccount, CETH)
        setisCETHmember(result)
    }
    const registerCDAIMember = async () => {
        let markets = [CDAI] // This is the CDAI contract(s) for your collateral
        let enterMarkets = await Comptroller.enterMarkets(markets)
        await enterMarkets.wait(1);
        let result = await Comptroller.callStatic.checkMembership(defaultAccount, CDAI)
        setisCDAImember(result)
    }

    // const borrowRate = async () => {
    //     const underlyingDecimals = 18
    //     let cdaiRate = await CDai.callStatic.borrowRatePerBlock()
    //     setCETHBorrowRate(cdaiRate / Math.pow(10, underlyingDecimals))
    //     let cethRate = await CEther.callStatic.borrowRatePerBlock()
    //     setCDAIBorrowRate(cethRate / Math.pow(10, underlyingDecimals))
    // }

    const borrowCDai = async () => {
        const underlyingDecimals = 18
        if (isCETHmember) {
            const scaledUpBorrowAmount = (borrowamountData * Math.pow(10, underlyingDecimals)).toString();
            const trx = await CDai.borrow(scaledUpBorrowAmount);
            await trx.wait(1);
            CDai.callStatic.borrowBalanceCurrent(defaultAccount).then(res => {
                setmeBorrowBalanceOfCDai(res.toString())
                setborrowamountData(0)
                callProvider()
            })
        }else{
            return 
        }
    }

    const repayCDai = async () => {
        const underlyingDecimals = 18
        if (isCETHmember) {
            const scaledUpRepayAmount = (repayamountData * Math.pow(10, underlyingDecimals)).toString()
            const approve = await Dai.approve(CDAI, scaledUpRepayAmount);
            await approve.wait(1);
            const repayBorrow = await CDai.repayBorrow(scaledUpRepayAmount);
            await repayBorrow.wait(1)
            CDai.callStatic.borrowBalanceCurrent(defaultAccount).then(res => {
                setmeBorrowBalanceOfCDai(res.toString())
                setrepayamountData(0)
                callProvider()
            })
        }else{
            return
        }
    }

    return (
        <>
            <br />
            <Container>

                <Card body>
                    BORROW INFO
                    <br /><br />
                    <Row>
                        <Col sm={2}>
                            <Card style={{
                                fontSize: 12,
                            }}>
                                <Card.Body>
                                    Borrow Balance CETH
                                    <br />
                                    {meBorrowBalanceOfCEther / (10 ** 8)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={2}>
                            <Card style={{
                                fontSize: 12,
                            }}>
                                <Card.Body>
                                    Borrow Balance CDAI
                                    <br />
                                    {meBorrowBalanceOfCDai / (10 ** 18)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={2}>
                            <Card style={{
                                fontSize: 12,
                            }}>
                                <Card.Body>
                                    Balance of Dai
                                    <br />
                                    {meBalanceOfDai / (10 ** 18)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={2}>
                            <Card style={{
                                fontSize: 12,
                            }}>
                                <Card.Body>
                                    Balance of cDai
                                    <br />
                                    {meBalanceOfCDai / (10 ** 8)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={2}>
                            <Card style={{
                                fontSize: 12,
                            }}>
                                <Card.Body>
                                    Liquidity
                                    <br />
                                    $ {liquidityInfo / (10 ** 18)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={2}>
                            <Card style={{
                                fontSize: 12,
                            }}>
                                <Card.Body>
                                    Borrow Up
                                    <br />
                                    $ {(liquidityInfo / (10 ** 18)) / (DAIPrice  / (10 ** 6))}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row style={{
                        fontSize: 11,
                    }}>
                        <Col sm={2}>
                            <Card.Body>
                                CETH Member is  <br />
                                {isCETHmember.toString()}
                            </Card.Body>
                        </Col>
                        <Col sm={2}>
                            <Card.Body>
                                CDAI Member is  <br />
                                {isCDAImember.toString()}
                            </Card.Body>
                        </Col>
                        <Col sm={2}>
                            <Card.Body>
                                Collateral max CETH  <br />
                                {isObj(CollateralCETH) ? CollateralCETH.collateralFactor.toString() : 'empty'} %
                            </Card.Body>
                        </Col>
                        <Col sm={2}>
                            <Card.Body>
                                Collateral max CDAI  <br />
                                {isObj(CollateralCDAI) ? CollateralCDAI.collateralFactor.toString() : 'empty'} %
                            </Card.Body>
                        </Col>
                        <Col sm={2}>
                            <Card.Body>
                                CDAI Borrow Rate  <br />
                                {CDAIBorrowRate.toString()} %
                            </Card.Body>
                        </Col>
                        <Col sm={2}>
                            <Card.Body>
                                CETH Borrow Rate  <br />
                                {CETHBorrowRate.toString()} %
                            </Card.Body>
                        </Col>

                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Card.Body>
                                <Button size="sm" variant="dark" disabled={isCETHmember} onClick={registerCETHMember}>{"Register CETH Member"}</Button>
                            </Card.Body>
                        </Col>
                        <Col sm={6}>
                            <Card.Body>
                                <Button size="sm" variant="dark" disabled={isCDAImember} onClick={registerCDAIMember}>{"Register CDAI Member"}</Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                <br />
                <Card body>
                    {"CDAI MARKET"}
                    <br />
                    <Row>
                        <Col sm={6}>
                            <Card.Body>
                                <input
                                    name="eth supply"
                                    type="number"
                                    value={borrowamountData}
                                    onChange={(res) => {
                                        if (res.target.value === "" || Number(res.target.value) === 0) {
                                            setborrowamountData(0)
                                        } else {
                                            setborrowamountData(res.target.value)
                                        }
                                    }} />
                                <br />	<br />
                                <Button variant="dark" disabled={!isCDAImember || !borrowamountData} onClick={borrowCDai}>{"Borrow CDAI"}</Button>
                            </Card.Body>
                        </Col>
                        <Col sm={6}>
                            <Card.Body>
                                <input
                                    name="eth reedem"
                                    type="number"
                                    value={repayamountData}
                                    onChange={(res) => {
                                        if (res.target.value === "" || Number(res.target.value) === 0) {
                                            setrepayamountData(0)
                                        } else {
                                            setrepayamountData(res.target.value)
                                        }
                                    }} />
                                <br />	<br />
                                <Button variant="dark" disabled={!isCDAImember || !repayamountData} onClick={repayCDai}>{"Repay  CDAI"}</Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
                <br /><br />
            </Container>
        </>
    )
}

export default Borrow;



