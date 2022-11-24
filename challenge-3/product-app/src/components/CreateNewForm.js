import Axios from "axios";
import React, {useState, useRef} from "react";

function CreateNewForm(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const CreatePhotoField = useRef();

    async function submitHandler(event){
        //event.preventDefault();
        const data = new FormData();
        data.append("photo", file);
        data.append("name", name);
        data.append("price", price);
        data.append("description", description);

        setName("");
        setPrice("");
        setDescription("");
        CreatePhotoField.current.value = "";
        const newPhoto = await Axios.post("/create-product", data, { headers: { "Content-Type": "multipart/form-data" } })
        props.setProducts(prev => prev.concat([newPhoto.data]))
    }
    return (
        <form className="p-3 bg-opacity-25 mb-5" onSubmit={submitHandler}>
            <div className="mb-2">
                <input ref={CreatePhotoField} onChange={e => setFile(e.target.files[0])} type="file" className="form-control" />
            </div>
            <div className="mb-2">
                <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Product name" />
            </div>
            <div className="mb-2">
                <input onChange={e => setPrice(e.target.value)} value={price} type="text" className="form-control" placeholder="Price" />
            </div>
            <div className="mb-2">
                <input onChange={e => setDescription(e.target.value)} value={description} type="text" className="form-control" placeholder="Description" />
            </div>

            <button className="btn btn-success">Create New Product</button>
        </form>
    )
}

export default CreateNewForm;