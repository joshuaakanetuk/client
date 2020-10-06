import React from 'react'
import '../../App.css';

// home page
class Landing extends React.Component{
    render() {
        return(
            <main>
                <div className="landing__content">
                <p> Sign in with existing accounts or sign up with your email. New sign in's are automatically client type.</p>
                <p> Click on the dashboard, go to projects and submit a proposal for a new project (as client) or approve projects (as admin). 
                The goal of this application in to boilerplate a freelancer/small web agency in a box. Get proposal and track information in app. 
                </p>
                </div>
            </main>
        );
    }
}

export default Landing;