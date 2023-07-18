import { ChangeEvent, FormEvent, useState } from "react";
import { API_URL } from "../other/Constants";
import { useNavigate } from "react-router-dom";

interface AddProduct {
  currentUser: string;
}

function AddProduct(props: AddProduct) {
  const { currentUser } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    fetch(`${API_URL}/products`, {
      method: "POST",
      body: JSON.stringify({
        createdBy: currentUser,
        name: title,
        description: description,
        price: price,
        bought: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    navigate("/user");
  }

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  return (
    <div className="page-align">
      <div className="page ">
        <h1>Add New Product</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="creator">Created by:</label>
            <input
              type="text"
              name="creator"
              value={currentUser}
              style={{ backgroundColor: "#CCCBCB", color: "grey" }}
              readOnly
            />
          </div>

          <div className="form-field">
            <label htmlFor="title">Product:</label>
            <input
              type="text"
              name="title"
              placeholder="T-shirt..."
              onChange={handleTitle}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              placeholder="Blue, size M.."
              rows={3}
              cols={70}
              onChange={handleDescription}
              required
            ></textarea>
          </div>

          <div className="form-field">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              placeholder="5.99"
              onChange={handlePrice}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
