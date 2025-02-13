import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'

const Coin = () => {
    const { coinId } = useParams();

    const [coinData, setCoinData] = useState();
    const [historicalData, setHistoricalData] = useState();
    
    const { currency } = useContext(CoinContext)

    const fetchCoinData = async () => {
        //---------------------------------------------------------------------------------------------
        //Google search: "coingecko api"
        //Email: niviv42614@intady.com
        //Password: Nivi1202?
        //Company or Project Name: Cryptoplace
        //Team size (Number): 1
        //Your Role: Developer
        //What are you using CoinGecko API for?: Building a website
        //Click on "Add New Key" -> API Key Label -> "tutorial"
        //
        //https://www.coingecko.com/ -> Click on the user icon (upper right corner) -> "Developer's Dashboard" -> "Edit"/"Stats" API or "API Documentation" -> Click on "Coins" on the left sidebar
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mRuXdJrxCN7cFt5HNKGMA4Lf' }
        };

        //fetch('https://api.coingecko.com/api/v3/coins/id', options)
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(res => res.json())
            .then(res => /*console.log(res)*/setCoinData(res))
            .catch(err => console.error(err));
        //---------------------------------------------------------------------------------------------
    }

    const fetchHistoricalData = async () => {
        //---------------------------------------------------------------------------------------------
        //Google search: "coingecko api"
        //Email: niviv42614@intady.com
        //Password: Nivi1202?
        //Company or Project Name: Cryptoplace
        //Team size (Number): 1
        //Your Role: Developer
        //What are you using CoinGecko API for?: Building a website
        //Click on "Add New Key" -> API Key Label -> "tutorial"
        //
        //https://www.coingecko.com/ -> Click on the user icon (upper right corner) -> "Developer's Dashboard" -> "Edit"/"Stats" API or "API Documentation" -> Click on "Coins" on the left sidebar
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mRuXdJrxCN7cFt5HNKGMA4Lf' }
        };

        //fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=10', options)
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(res => res.json())
            .then(res => /*console.log(res)*/setHistoricalData(res))
            .catch(err => console.error(err));
        //---------------------------------------------------------------------------------------------
    }

    useEffect(() => {
        fetchCoinData();
        fetchHistoricalData();
    }, [currency])

    if (coinData && historicalData) {
        return (
            <div className="coin">
                {/* <h2>Coin : {coinId}</h2> */}
                <div className="coin-name">
                    <img src={coinData.image.large} alt="" />
                    <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
                </div>
                <div className="coin-chart">
                    <LineChart historicalData={historicalData} />
                </div>
                <div className="coin-info">
                    <ul>
                        <li>Crypto Market Rank</li>
                        <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Current Price</li>
                        <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>Market Cap</li>
                        <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24 Hour high</li>
                        <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24 Hour low</li>
                        <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <div className="spinner">
                <div className="spin"></div>
            </div>
        )
    }
}

export default Coin
