import StockData from './StockData'
import propTypes from 'prop-types'

function StockRejected(props) {
  return (
    <div className='StockRejected'>
        {props.data.map((stock,index) => {
            return <StockData key={index} data={stock} />
        })}
        <StockData />
    </div>
  )
}

StockRejected.propTypes = {
    data: propTypes.array.isRequired
}

export default StockRejected