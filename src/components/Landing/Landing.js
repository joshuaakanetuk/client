import React from 'react'
import './landing.css';

class Landing extends React.Component{
    render() {
        return(
            <main>
                <div className="landing__content">
                <p> Click on the dashboard, go to projects and submit a proposal for a new project. 
                The goal of this application in to boilerplate a freelancer/small web agency in a box. Get proposal and track information in app. 
                </p>
                </div>
            </main>
        );
    }
}

export default Landing;