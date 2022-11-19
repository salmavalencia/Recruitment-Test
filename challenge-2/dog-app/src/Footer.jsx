import React from 'react';

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
