import React, {Component} from 'react'
import {connect} from 'react-redux'
import {yachtsThunk} from '../store/allProducts'
import {Link} from 'react-router-dom'

class YachtsList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getYachts()
  }

  render() {
    const {yachts} = this.props
    return (
      <div>
        <h1>THESE ARE ALL OUR YACHTS</h1>
        {yachts.map(yacht => (
          <div key={yacht.id}>
            <h2>{yacht.name}</h2>
            <Link to={`/product/${yacht.id}`}>
              <img src={yacht.imgUrl} />
            </Link>
            <h3>{yacht.category}</h3>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  yachts: state.yachts
})

const mapDispatchToProps = dispatch => ({
  getYachts: () => dispatch(yachtsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(YachtsList)
