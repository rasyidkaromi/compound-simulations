/* eslint-disable */
/* eslint-disable-next-line */

import React, { useState, createContext, useEffect } from 'react';
import { ethers } from 'ethers'
const EtherContext = createContext();
const EtherProvider = ({ children }) => {

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [userBalance, setUserBalance] = useState(0);

    const [provider, setProvider] = useState(null);
    const [providerSigner, setProviderSigner] = useState(null);
    const [JsonRpcProvider, setJsonRpcProvider] = useState(null)

    const [CEther, setCEther] = useState(null)
    const [Comptroller, setComptroller] = useState(null)
    const [ComptrollerProxy, setComptrollerProxy] = useState(null)
    const [CDai, setCDai] = useState(null)
    const [Dai, setDai] = useState(null)
    const [priceFeed, setPriceFeed] = useState(null)

    const [meBalanceOfCether, setmeBalanceOfCether] = useState(null)
    const [meBalanceOfCDai, setmeBalanceOfCDai] = useState(null)
    const [meBalanceOfDai, setmeBalanceOfDai] = useState(null)
    const [meBalanceOUnderlyingfCether, setmeBalanceOUnderlyingfCether] = useState(null)
    const [meBorrowBalanceOfCDai, setmeBorrowBalanceOfCDai] = useState(null)
    const [meBorrowBalanceOfCEther, setmeBorrowBalanceOfCEther] = useState(null)

    const [CEtherBalance, setCEtherBalance] = useState(null)
    const [CEthertotalSupply, setCEthertotalSupply] = useState(null)

    const [CDaiBalance, setCDaiBalance] = useState(null)
    const [CDaitotalSupply, setCDaitotalSupply] = useState(null)

    const [DAIPrice, setDAIPrice] = useState(null)
    const [CDAIUnderlyingPrice, setCDAIUnderlyingPrice] = useState(null)
    const [CETHUnderlyingPrice, setCETHUnderlyingPrice] = useState(null)

    const [isCETHmember, setisCETHmember] = useState(false)
    const [isCDAImember, setisCDAImember] = useState(false)
    const [liquidityInfo, setliquidityInfo] = useState(0)

    const [CollateralCETH, setCollateralCETH] = useState({})
    const [CollateralCDAI, setCollateralCDAI] = useState({})
    const [CETHBorrowRate, setCETHBorrowRate] = useState("empty")
    const [CDAIBorrowRate, setCDAIBorrowRate] = useState("empty")

    useEffect(() => {
        if (defaultAccount) {
            checkMembershipCETH()
            checkMembershipCDAI()
            checkliquidity()
            checkCollateral()
            borrowRate()
        }
    }, [defaultAccount])

    const checkMembershipCETH = async () => {
        if (defaultAccount) {
            let result = await Comptroller.callStatic.checkMembership(defaultAccount, CETH);
            setisCETHmember(result)
        }
    }
    const checkMembershipCDAI = async () => {
        if (defaultAccount) {
            let result = await Comptroller.callStatic.checkMembership(defaultAccount, CDAI);
            setisCDAImember(result)
        }
    }
    const checkliquidity = async () => {
        if (defaultAccount) {
            let [err, liquidity, shortfall] = await Comptroller.callStatic.getAccountLiquidity(defaultAccount);
            setliquidityInfo(liquidity.toString())
        }
    }
    const checkCollateral = async () => {
        let [isListedCETH, collateralFactorCETH, isCompedCETH] = await Comptroller.callStatic.markets(CETH)
        let [isListedCDAI, collateralFactorCDAI, isCompedCDAI] = await Comptroller.callStatic.markets(CDAI)
        setCollateralCETH({
            isListed: isListedCETH,
            collateralFactor: (collateralFactorCETH / 1e18) * 100,
            isComped: isCompedCETH
        })
        setCollateralCDAI({
            isListed: isListedCDAI,
            collateralFactor: (collateralFactorCDAI / 1e18) * 100,
            isComped: isCompedCDAI
        })
    }
    const borrowRate = async () => {
        const underlyingDecimals = 18
        let cdaiRate = await CDai.callStatic.borrowRatePerBlock()
        setCETHBorrowRate(cdaiRate / Math.pow(10, underlyingDecimals))
        let cethRate = await CEther.callStatic.borrowRatePerBlock()
        setCDAIBorrowRate(cethRate / Math.pow(10, underlyingDecimals))
    }

    const [saveExchangeRate, setsaveExchangeRate] = useState({})
    const [saveInterestRate, setsaveInterestRate] = useState({})

    useEffect(() => {
        if (CEther) {
            CheckInterestRate()
            CheckExchangeRate()
        }
    }, [CEther])

    const CheckExchangeRate = () => {
        CEther.callStatic.exchangeRateCurrent().then(res => {
            const exchangeRateCurrents = res.toString()
            const underlyingDecimals = 18 // decimals like DAI or USDC
            const cTokenDecimals = 8 // decimals like CDAI
            const mantissa = 18 + parseInt(underlyingDecimals) - cTokenDecimals;
            const oneCTokenInUnderlying = exchangeRateCurrents / Math.pow(10, mantissa)
            setsaveExchangeRate({
                result: oneCTokenInUnderlying
            })
        })
    }
    const CheckInterestRate = async () => {
        const ethMantissa = 1e18;
        const blocksPerDay = 6570; // 13.15 seconds per block
        const daysPerYear = 365;

        const supplyRatePerBlock = await CEther.callStatic.supplyRatePerBlock()
        const borrowRatePerBlock = await CEther.callStatic.borrowRatePerBlock()

        const supplyApy = (((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
        const borrowApy = (((Math.pow((borrowRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
        setsaveInterestRate({
            supplyResult: supplyApy,
            borrowResult: borrowApy
        })
    }

    useEffect(() => {
        setJsonRpcProvider(new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/"))
        if (window.ethereum && defaultAccount == null) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
        }
    }, [])

    useEffect(() => {
        if (priceFeed) {
            priceFeed.callStatic.getUnderlyingPrice(CDAI).then(res => {
                setCDAIUnderlyingPrice(res.toString())
            })
            priceFeed.callStatic.getUnderlyingPrice(CETH).then(res => {
                setCETHUnderlyingPrice(res.toString())
            })
            priceFeed.callStatic.price('DAI').then(res => {
                setDAIPrice(res.toString())
            })
        }
    }, [priceFeed])

    useEffect(() => {
        if (provider) {
            callProvider()
        }
    }, [provider])

    const callProvider = () => {
        provider.getBalance(CETH).then(res => {
            setCEtherBalance(ethers.utils.formatEther(res))
        })
        provider.getBalance(CDAI).then(res => {
            setCDaiBalance(ethers.utils.formatEther(res))
        })
        setProviderSigner(provider.getSigner())
    }

    useEffect(() => {
        if (CEther) {
            CEther.totalSupply().then(res => {
                setCEthertotalSupply(res.toString())
            })
        }
        if (CDai) {
            CDai.totalSupply().then(res => {
                setCDaitotalSupply(res.toString())
            })
        }
        if (defaultAccount && Dai) {
            Dai.callStatic.balanceOf(defaultAccount).then(res => {
                setmeBalanceOfDai(res.toString())
            })
        }
        if (defaultAccount) {
            provider.getBalance(defaultAccount)
                .then(balanceResult => {
                    setUserBalance(ethers.utils.formatEther(balanceResult));
                })
        }
        if (defaultAccount && CEther) {
            CEther.callStatic.balanceOfUnderlying(defaultAccount).then(res => {
                setmeBalanceOUnderlyingfCether(ethers.utils.formatEther(res))
            })
            CEther.callStatic.balanceOf(defaultAccount).then(res => {
                setmeBalanceOfCether(res.toString())
            })
            CEther.callStatic.borrowBalanceCurrent(defaultAccount).then(res => {
                setmeBorrowBalanceOfCEther(res.toString())
            })
        }
        if (defaultAccount && CDai) {
            CDai.callStatic.balanceOf(defaultAccount).then(res => {
                setmeBalanceOfCDai(res.toString())
            })
            CDai.callStatic.borrowBalanceCurrent(defaultAccount).then(res => {
                setmeBorrowBalanceOfCDai(res.toString())
            })
        }
    }, [defaultAccount, CEther, CDai, Comptroller, Dai]);

    useEffect(() => {
        if (providerSigner) {
            setCEther(new ethers.Contract(CETH, CETH_abi, providerSigner))
            setComptroller(new ethers.Contract(COMPTROLLER, COMPTROLLERPROXY_abi, providerSigner))
            setComptrollerProxy(new ethers.Contract(COMPTROLLERPROXY, COMPTROLLERPROXY_abi, providerSigner))
            setCDai(new ethers.Contract(CDAI, CDAI_abi, providerSigner))
            setPriceFeed(new ethers.Contract(PRICEFEED, PRICEFEED_abi, providerSigner))
            setDai(new ethers.Contract(DAI, DAI_abi, providerSigner))
        }
    }, [providerSigner])

    const connectWalletHandler = () => {
        if (window.ethereum && defaultAccount == null) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    setDefaultAccount(result[0]);
                })
                .catch(error => {
                    setErrorMessage(error.message);
                });
        } else if (!window.ethereum) {
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }

    return (
        <EtherContext.Provider value={{
            errorMessage, setErrorMessage,
            defaultAccount, setDefaultAccount,
            userBalance, setUserBalance,

            provider, setProvider,
            providerSigner, setProviderSigner,
            JsonRpcProvider, setJsonRpcProvider,

            connectWalletHandler,
            CEther, Comptroller, ComptrollerProxy, CDai, priceFeed,

            CEtherBalance, CEthertotalSupply,
            CDaiBalance, CDaitotalSupply,
            meBalanceOfCether, meBalanceOUnderlyingfCether, meBalanceOfCDai,
            meBorrowBalanceOfCDai, meBorrowBalanceOfCEther, meBalanceOfDai,

            CDAIUnderlyingPrice, CETHUnderlyingPrice, DAIPrice, Dai,

            callProvider,
            setmeBorrowBalanceOfCDai,

            isCETHmember, isCDAImember, liquidityInfo, CollateralCETH, CollateralCDAI,
            CETHBorrowRate, CDAIBorrowRate, setisCETHmember, setisCDAImember,
            saveInterestRate, saveExchangeRate, CheckInterestRate, CheckExchangeRate,
        }}>
            {children}
        </EtherContext.Provider>
    )
}

export { EtherContext, EtherProvider }
