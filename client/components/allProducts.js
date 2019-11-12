import React, {Component} from 'react'
import {connect} from 'react-redux'
import {yachtsThunk, categoryThunk} from '../store/allProducts'
import {Link} from 'react-router-dom'

import './allProducts.css'

class YachtsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: false
    }
    this.getByCategory = this.getByCategory.bind(this)
  }

  componentDidMount() {
    console.log('SEARC', this.props.location.search)
    if (!this.props.location.search) {
      this.props.getYachts()
    } else {
      const categoryName = this.props.location.search.slice(10)
      console.log('CATEGORYNAME', categoryName)
      this.props.getByCategory(categoryName)
    }
  }

  getByCategory(str) {
    this.props.getByCategory(str)
  }

  render() {
    const {yachts} = this.props

    return (
      <div>
        <nav id="allProductsNavBar" className="ui secondary pointing menu">
          <div className="item">
            <Link
              className="navBarItem"
              to="/products?category=Catamaran"
              onClick={() => this.props.getByCategory('Catamaran')}
            >
              Catamaran
            </Link>
          </div>
          <div className="item">
            <Link
              className="navBarItem"
              to="/products?category=Super%20Yacht"
              onClick={() => this.props.getByCategory('Super%20Yacht')}
            >
              Super Yacht
            </Link>
          </div>
          <div className="item">
            <Link
              className="navBarItem"
              to="/products?category=Motoryacht"
              onClick={() => this.props.getByCategory('Motoryacht')}
            >
              Motoryacht
            </Link>
          </div>
          <div className="item">
            <Link
              className="navBarItem"
              to="/products?category=Sailing%20Yacht"
              onClick={() => this.props.getByCategory('Sailing%20Yacht')}
            >
              Sailing Yacht
            </Link>
          </div>
          <div className="item">
            <Link
              className="navBarItem"
              to="/products"
              onClick={() => this.props.getYachts()}
            >
              All Yachts
            </Link>
          </div>
        </nav>
        <div id="yachtsContainer" className="ui grid">
          {yachts.map(yacht => (
            <div key={yacht.id} className="yachtContainer">
              <Link to={`/products/${yacht.id}`}>
                <img src={yacht.imageUrl} className="yacht image" />
                <div className="hover layer top">
                  <div className="hover text">{yacht.name}</div>
                </div>
              </Link>
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
