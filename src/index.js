/* eslint-disable */
/* eslint-disable-next-line */
global.DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
global.DAI_abi = require('./abi/DAI.json')
global.CDAI = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"
global.CETH = "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5"
global.COMPTROLLER = '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b'
global.COMPTROLLERPROXY = '0xbafe01ff935c7305907c33bf824352ee5979b526'
global.INTERESTRATEMODEL = '0xc64c4cba055efa614ce01f4bad8a9f519c4f8fab'
global.PRICEFEED = '0x6d2299c48a8dd07a872fdd0f8233924872ad1071'
global.CDAI_abi = require('./abi/CDAI.json')
global.CETH_abi = require('./abi/CETH.json')
global.COMPTROLLER_abi = require('./abi/COMPTROLLER.json')
global.COMPTROLLERPROXY_abi = require('./abi/COMPTROLLERPROXY.json')
global.INTERESTRATEMODEL_abi = require('./abi/INTERESTRATEMODEL.json')
global.PRICEFEED_abi = require('./abi/PRICEFEED.json')
global.isObj = (obj) => { for (var key in obj) {if (obj.hasOwnProperty(key))return true;}return false;}

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { EtherProvider } from './context/etherscontext'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <EtherProvider>
        <App />
      </EtherProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

