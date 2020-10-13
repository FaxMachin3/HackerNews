import React from "react";

function Header() {
    return (
        <header>
            <div className="logo">Hacker News</div>
            <ul>
                <li>New</li>
                <li> Past</li>
                <li>Comments</li>
                <li>Ask</li>
                <li>Show</li>
                <li>Jobs</li>
                <li>Submit</li>
            </ul>
        </header>
    );
}

export default Header;
