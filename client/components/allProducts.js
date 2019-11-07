import React, {Component} from 'react'
import {connect} from 'react-redux'
import {yachtsThunk, categoryThunk} from '../store/allProducts'
import {Link} from 'react-router-dom'

import './allProducts.css'

class YachtsList extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  componentDidMount() {
    if (!this.props.match.params.categoryName) {
      this.props.getYachts()
    } else {
      this.props.getByCategory(this.props.match.params.categoryName)
    }
  }

  render() {
    // if (!this.props.yachts) {
    //   console.log('waiting to be populated')
    //   console.log(this.props)
    //   return <h1>NOTHING YET</h1>
    // } else {
    const {yachts} = this.props
    return (
      <div>
        <h1>THESE ARE ALL OUR YACHTS</h1>
        {yachts.map(yacht => (
          <div key={yacht.id} className="yacht">
            <h2>{yacht.name}</h2>
            <Link to={`/product/${yacht.id}`}>
              <img src={yacht.imageUrl} />
            </Link>
            <h3>{yacht.category}</h3>
          </div>
        ))}
      </div>
    )
    // }
  }
}

const mapStateToProps = state => ({
  yachts: state.yachts
})

const mapDispatchToProps = dispatch => ({
  getYachts: () => dispatch(yachtsThunk()),
  getByCategory: categoryName => dispatch(categoryThunk(categoryName))
})

export default connect(mapStateToProps, mapDispatchToProps)(YachtsList)
