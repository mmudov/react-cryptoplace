import { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async () => {
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

        //fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => /* console.log(res) */setAllCoin(res))
            .catch(err => console.error(err));
        //---------------------------------------------------------------------------------------------
    }

    useEffect(() => {
        fetchAllCoin();
    }, [currency])

    const contextValue = {
        allCoin, currency, setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;
