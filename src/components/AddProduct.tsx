import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../other/Constants";
import { Image } from "../other/Types";
import { RootState } from "../store";
import { setUserProducts } from "../reducers/userProductsSlice";
import { addToDatabase, getImages } from "../Api_calls";

export default function AddProduct() {
  const [imageDatabase, setImageDatabase] = useState<Image[]>([]);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    getImages(setImageDatabase);
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await addToDatabase(currentUser, image, title, description, price);

    await fetch(`${API_URL}/products?createdBy=${currentUser}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setUserProducts(json));
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

  const handleImage = (event: ChangeEvent<HTMLSelectElement>) => {
    setImage(event.target.value);
  };

  return (
    <div className="page-align">
      <div className="page ">
        <div className="page-content">
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
                maxLength={100}
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
                step="0.01"
                placeholder="5.99"
                onChange={handlePrice}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="image">Image:</label>
              <select
                name="image"
                onChange={handleImage}
                value={image}
                required
              >
                <option value="" disabled>
                  --select image--
                </option>
                {imageDatabase.map((image) => {
                  return (
                    <option key={image.id} value={image.url}>
                      {image.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
