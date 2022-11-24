import React , {useState, useEffect} from "react";
import {createRoot} from "react-dom/client";
import Axios from "axios";
import ProductCard from "./components/ProductCard";
import CreateNewForm from "./components/CreateNewForm";


function App(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function go() {
            const response = await Axios.get("/api/products");
            setProducts(response.data);
            console.log(response.data);
        }
        go()
    }, [])
    

    
    return (
        
        <div className="container">
            <CreateNewForm setProducts={setProducts} />
                <div class="product-grid">
                    {products.map((product, n) => {
                            return <ProductCard key={product._id} name={product.name} price={product.price} description={product.description} photo={product.photo} id={product._id} setProducts={setProducts} />
            
                        })}  
                </div>
        </div>
    )
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);