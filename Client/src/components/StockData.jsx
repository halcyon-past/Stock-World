import LoadScreen from './LoadScreen';
import './StockData.css'
import propTypes from 'prop-types'

function StockData(props) {

    const data = props.data || null;

    if(!data) return <LoadScreen />;

  return (
    <div className='StockData'>
        <div className="top">
            <div className="left">
                <span style={{fontWeight:500,fontSize:'1.5rem'}}>{data.name}</span>
            </div>
            <div className="right">
                <span>{data.time}</span>
            </div>
        </div>
        <marquee style={{fontSize:'1rem',padding:0}}>Total Sell Quantity: {data.total_sell_qty}, Total Buy Quantity: {data.total_buy_qty}</marquee>
        <div className="bottom">
            <p className="status">Price: {data.price}</p>
            <p className="status">Change: {data.change.toFixed(2)}</p>
        </div>
    </div>
  )
}

StockData.propTypes = {
    data: propTypes.object,
}

export default StockData