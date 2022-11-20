import React, { useState, useEffect } from "react";
import "./Header.css"

function Header() {



  return (

    <div className="header">
      <div className="logo-desc">
        <h1>DOG <img src="https://i.postimg.cc/6QmWbNV3/pawprint.png" alt="paw" className="paw-img"></img> LIST</h1>
        <p className="description">Website made to display dog breeds and sub-breeds using Dog API.</p>
      </div>
      <hr />
    </div>

  );
}

export default Header;
