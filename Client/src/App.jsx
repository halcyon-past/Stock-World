import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import './App.css'
import LoadScreen from './components/LoadScreen'
import StockApproved from './components/StockApproved'
import StockRejected from './components/StockRejected'

function App() {
  const [stockData, setStockData] = useState([])
  const [stockApproved, setStockApproved] = useState([])
  const [stockRejected, setStockRejected] = useState([])
  const [isLoading, setLoading] = useState(false)

  const getStockData = useCallback(async () => {
    try {
      setLoading(false);
      const res = await axios.get('https://stock-world.onrender.com/stocks');
      setStockData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const loadData = useCallback(async () => {
    try{
      await axios.get('https://stock-world.onrender.com/refresh');
    }catch (error){
      console.error('Error fetching data:', error);
    }
  },[]);

  const sortData = useCallback(() => {
    const fetchData = async () => {
      await getStockData();
      const approved = stockData.filter(stock => stock.state === 'Accepted');
      const rejected = stockData.filter(stock => stock.state === 'Rejected');
      setStockApproved(approved.sort((a, b) => b.change - a.change));
      setStockRejected(rejected.sort((a, b) => b.change - a.change));
    };

    fetchData();
  }, [getStockData, stockData]);

  useEffect(() => {
    sortData();
  }, [sortData]);



  /*useEffect(() => {
    getStockData().then(() => {
      setStockApproved(stockData.filter(stock => stock.state === 'Accepted'));
      setStockRejected(stockData.filter(stock => stock.state === 'Rejected'));
    });
  });*/

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      loadData();
      console.log('Data refreshed');
    }, 100000)
    return () => clearInterval(interval)
  }
  , [])


  /*useEffect(() => {
    console.log(stockData)
    console.log(stockApproved)
    console.log(stockRejected)
  }
  , [stockData])*/



  return (
    <div className="App">
      <h1>Stock World</h1>
      <button onClick={sortData}>Refresh</button>
      {isLoading&&<LoadScreen />}
      {!isLoading&&<h2>Accepted Stocks</h2>}
      {isLoading?null:<StockApproved data={stockApproved} />}
      {!isLoading&&<h2>Rejected Stocks</h2>}
      {isLoading?null:<StockRejected data={stockRejected}/>}
    </div>
  )
}

export default App
