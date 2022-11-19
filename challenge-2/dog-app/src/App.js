import React, { useState, useEffect } from "react";
import "./App.css";
import Card from './Card'
import Header from './Header'
import Footer from './Footer'

function App() {



  return (
    <div className="App">
      <div className="container">
        <Header />
        <Card />
        <Footer />
      </div>
    </div>
  );
}

export default App;
