import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Image.css"

const Image = ({dog, subBreeds}) => {
  const [dogImage, setDogImage] = useState('');
  const [isHover, setIsHover] = useState(false);

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

  const listSubBreeds = subBreeds.length !== 0 ? subBreeds.slice(0, 3).map(element => <li class="list">{element}</li>) : <p>no sub-breed</p>;

  return (
    <div className="container-img">

      <img src={dogImage} alt="dog" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} />


        {isHover && (

          <ul className="top-left" onMouseEnter={() => setIsHover(true)}>

              {listSubBreeds}

          </ul>
        )}
    </div>
  )
}

export default Image;
// {
//   subBreeds.map(element => {
//     <div>{element}</div>
//   })
// }
