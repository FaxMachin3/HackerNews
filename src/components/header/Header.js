import React, { useRef, useEffect } from "react";

function Header() {
    const hamburger = useRef(null);
    const linkContainer = useRef(null);

    const toggleClass = () => {
        hamburger.current.classList.toggle("is-active");
        linkContainer.current.classList.toggle("is-active");
    }

    useEffect(() => {
        let timer;
        const handleResize = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                hamburger.current.classList.remove("is-active");
                linkContainer.current.classList.remove("is-active");
            }, 300);
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <header>
            <div className="logo">Hacker News</div>
            <div onClick={toggleClass} ref={hamburger} className="hamburger" id="hamburger-6">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
            <ul ref={linkContainer}>
                <li onClick={toggleClass}>New</li>
                <li onClick={toggleClass}>Past</li>
                <li onClick={toggleClass}>Comments</li>
                <li onClick={toggleClass}>Ask</li>
                <li onClick={toggleClass}>Show</li>
                <li onClick={toggleClass}>Jobs</li>
                <li onClick={toggleClass}>Submit</li>
            </ul>
        </header>
    );
}

export default Header;
