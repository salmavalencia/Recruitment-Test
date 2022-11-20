import React from 'react';
import './Footer.css'

const Footer = () => {

    var today = new Date();

    return (
        <footer>

            <div>
              <h5>Dog App - {today.getFullYear()}</h5>
            </div>

        </footer>
    );
}

export default Footer;
