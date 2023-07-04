// Necessary imports
import React from "react";
import './Footer.css'

function Footer(){



    return (
        <footer className="relative flex flex-wrap justify-center items-center h-20">
            <div>
                SpotsBnb &copy; 2023
            </div>
            <a href='https://github.com/ghernandez0044' target="_blank">
                <div className="font-mono text-black font-extralight text-xs my-2.5 mx-6 uppercase hover:text-lightgray">GitHub</div>
            </a>
             <a href='https://www.linkedin.com/in/guillermo-hernandez-32a307180/' target="_blank">
                <div className="font-mono text-black font-extralight text-xs my-2.5 mx-6 uppercase hover:text-lightgray">LinkedIn</div>
            </a>
             <a href='https://github.com/ghernandez0044/spotsbnb' target="_blank">
                <div className="font-mono text-black font-extralight text-xs my-2.5 mx-6 uppercase hover:text-lightgray">GitHub Project Repo</div>
            </a>
        </footer>
    )
}

export default Footer