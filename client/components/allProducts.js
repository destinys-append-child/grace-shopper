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
    if (!this.props.match.params.categoryName) {
      this.props.getYachts()
    } else {
      this.props.getByCategory(this.props.match.params.categoryName)
    }
  }
  getByCategory(str) {
    console.log('getting by category!')
    console.log(this.state.activeItem)
    this.setState(prevState => ({
      ...prevState,
      activeItem: !prevState.activeItem
    }))
    this.props.getByCategory(str)
    console.log(this.state.activeItem)
  }

  render() {
    const {yachts} = this.props
    const {activeItem} = this.state

    return (
      <div>
        <nav id="allProductsNavBar" className="ui secondary pointing menu">
          <div className={activeItem ? 'active item' : 'item'}>
            <Link
              className="navBarItem"
              to="/categories/Catamaran"
              onClick={() => this.props.getByCategory('Catamaran')}
            >
              Catamaran
            </Link>
          </div>
          <div className="item">
            <Link
              className="navBarItem"
              to="/categories/Super%20Yacht"
              onClick={() => this.props.getByCategory('Super%20Yacht')}
            >
              Super Yacht
            </Link>
          </div>
          <div className="item">
            <Link
              className="navBarItem"
              to="/categories/Motoryacht"
              onClick={() => this.props.getByCategory('Motoryacht')}
            >
              Motoryacht
            </Link>
          </div>
          <div className="item">
            <Link
              className="navBarItem"
              to="/categories/Sailing%20Yacht"
              onClick={() => this.props.getByCategory('Sailing%20Yacht')}
            >
              Sailing Yacht
            </Link>
          </div>
          <div className="item">
            <Link
              className="navBarItem"
              to="/categories"
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
