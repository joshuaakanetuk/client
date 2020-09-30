import React from 'react'

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
            <>
            <div className="msgbox__shell">
                {this.props.msg}
            </div>
            </>
        );
    }
}

export default MsgBox;