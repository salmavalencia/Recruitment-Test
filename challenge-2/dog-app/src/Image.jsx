import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Image.css"

const Image = ({dog}) => {
  const [dogImage, setDogImage] = useState('');

  const urlImage = "https://dog.ceo/api/breed/" + dog + "/images/random";
  useEffect(() => {
    Axios({
      url: urlImage,
    })
      .then((response) => {
        setDogImage(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, setDogImage);


  return (
    <div>

      <img src={dogImage} alt="dog"/>
    </div>
  )
}

export default Image;
