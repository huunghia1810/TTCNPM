//import react & relations
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

//import actions
import ActionUser from '../../actions/User'

const Logout = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(ActionUser.signOut())

    setTimeout(() => {
      history.push('/admin')
    }, 500)
  },[])

  return (
    <div>&nbsp;</div>
  )
};

export default Logout
