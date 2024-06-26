import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <div>
            <h1>Welcome!</h1>
            <p>Let's pretend you're logged in...</p>
            <ul>
                <li>
                    <Link to="/recipes">All recipes</Link>
                </li>
                <li>
                    <Link to="/events">All events</Link>
                </li>
                <li>
                    <Link to="/ingredients">All ingredients</Link>
                </li>
            </ul>
        </div>
    );
}

export default Homepage;
