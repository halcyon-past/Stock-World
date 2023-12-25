import StockData from './StockData'
import propTypes from 'prop-types'

function StockApproved(props) {
  return (
    <div className='StockApproved'>
        {props.data.map((stock,index) => {
            return <StockData key={index} data={stock} />
        })}
        <StockData />
    </div>
  )
}

StockApproved.propTypes = {
    data: propTypes.array.isRequired,
};



export default StockApproved