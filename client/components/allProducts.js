import React, {Component} from 'react'
import {connect} from 'react-redux'
import {yachtsThunk, categoryThunk} from '../store/allProducts'
import {Link, Route} from 'react-router-dom'

import './allProducts.css'

class YachtsList extends Component {
  constructor(props) {
    super(props)
    this.getByCategory = this.getByCategory.bind(this)
  }

  componentDidMount() {
    if (!this.props.match.params.categoryName) {
      this.props.getYachts()
    } else {
      this.props.getByCategory(this.props.match.params.categoryName)
    }
  }
  getByCategory(str) {
    this.props.getByCategory(str)
  }

  render() {
    const {yachts} = this.props
    return (
      <div>
        <nav id="allProductsNavBar">
          <br />
          <br />
          <Link
            className="navBarItem"
            to="/categories/Catamaran"
            onClick={() => this.props.getByCategory('Catamaran')}
          >
            Catamaran
          </Link>
          <Link
            className="navBarItem"
            to="/categories/Super%20Yacht"
            onClick={() => this.props.getByCategory('Super%20Yacht')}
          >
            Super Yacht
          </Link>
          <Link
            className="navBarItem"
            to="/categories/Motoryacht"
            onClick={() => this.props.getByCategory('Motoryacht')}
          >
            Motoryacht
          </Link>
          <Link
            className="navBarItem"
            to="/categories/Sailing%20Yacht"
            onClick={() => this.props.getByCategory('Sailing%20Yacht')}
          >
            Sailing Yacht
          </Link>
          <Link
            className="navBarItem"
            to="/categories"
            onClick={() => this.props.getYachts()}
          >
            All Yachts
          </Link>
          <br />
          <br />
        </nav>
        <h1>THESE ARE ALL OUR YACHTS</h1>
        <div id="yachtsContainer">
          {yachts.map(yacht => (
            <div key={yacht.id} className="yachtContainer">
              <h2>{yacht.name}</h2>
              <Link to={`/products/${yacht.id}`}>
                <div className="overlay">
                  <img src={yacht.imageUrl} />
                  <h5>TEXT!</h5>
                </div>
              </Link>

              <h3>{yacht.category}</h3>
            </div>
          ))}
        </div>
      </div>
    )
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
