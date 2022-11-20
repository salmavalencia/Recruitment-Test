import React, { useState, useEffect } from "react";
import Axios from "axios";
import Image from "./Image"
import "./Card.css"

function Card() {
  const [dog, setDog] = useState([]);
  useEffect(() => {
    Axios({
      url: "https://dog.ceo/api/breeds/list/all",
    })
      .then((response) => {
        setDog(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setDog]);

  return (
    <div className="container-card">
      <div class="card-collection">
        {Object.entries(dog).map(([key, value]) => (

            <div className="card">
              <Image dog={key} subBreeds={value} />
              <p class="breed">{key}</p>
            </div>

        ))}
      </div>


    </div>


  )
}

export default Card;

// function getDogPicture(dog){
//   const [dogPicture, setDogPicture] = useState([]);
//   useEffect(() => {
//     Axios({
//       url: "https://dog.ceo/api/breed/" + dog + "/images/random",
//     })
//       .then((response) => {
//         setDogPicture(response.data.message);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [setDogPicture]);
//   return dogPicture;
// }
// {
//   value.map(item => (
//     <div>
//     <p>{item}</p>
//     </div>
//   ))
// }
