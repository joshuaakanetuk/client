import React from 'react'
import AppContext from "../../contexts/AppContext";

// class to conditionally render based on user type
class Permission extends React.Component{
    static contextType = AppContext;
    render() {
        if(this.props.override && this.context.typeUser === 'client')
            return this.props.children;
        else if(this.props.override && this.context.typeUser === 'admin')
            return null;
        else {
            if(this.context.typeUser === 'admin') 
                return this.props.children;
            else
                return null;
        }
    }
}

export default Permission;