import Axios from "axios"
import React, {useState} from "react"

function ProductCard(props) {
    return (
            <div className="card product-card">
                <img src={ props.photo ? `/uploaded-photos/${props.photo}` : "/fallback.png"} className="card-img-top" alt="product image" /> 
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">${props.price}</p>
                    <p className="card-text">{props.description}</p>
                    
                    <button
                        onClick={async () => {
                            const test = Axios.delete(`/product/${props.id}`)
                            props.setProducts(prev => {
                            return prev.filter(product => {
                                return product._id != props.id
                            })
                            })
                        }}
                        className="btn btn-sm btn-outline-danger mt-auto"
                        >
                        Delete
                        </button>
    
                    
                </div>
            </div>

        
      
    )
}

export default ProductCard;