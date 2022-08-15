import { combineReducers } from 'redux'

import Menu from './Menu'
import Cart from './Cart'
import Identity from './Identity'
import User from './User'
import Order from './Order'

export default combineReducers({
    Menu,
    Cart,
    Identity,
    User,
    Order,
})