import React from 'react'

// class to create a box with info
class MsgBox extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
    }
    static defaultProps = {
        msg: "Select a project to see more info or add a project!"
    }
    render() {
        return(
            <figure className="msgbox__shell">
                {this.props.msg}
            </figure>
        );
    }
}

export default MsgBox;