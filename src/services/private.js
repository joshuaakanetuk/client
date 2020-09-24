import React, {useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from './token'
import AppContext from '../contexts/AppContext'


export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  const context = useContext(AppContext)
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken() && !context.error
          ? <Component {...componentProps} />
          : <Redirect
              to={{
                pathname: '/signin',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}
