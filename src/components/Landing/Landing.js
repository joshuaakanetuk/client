import React from 'react'
import './landing.css';

class Landing extends React.Component{
    render() {
        return(
            <main>
                <div>
                <h1>Welcome to Unknown Labs, a digital agency.</h1>
                <div> Click on the dashboard, go to projects and submit a proposal for a new project. Feel free to swap between client and admin view.<br></br>
                The goal of this application in to boilerplate a freelancer/small web agency in a box. Get proposal and track information in app. </div>
                </div>
            </main>
        );
    }
}

export default Landing;