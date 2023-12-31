import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUserProducts } from "../reducers/userProductsSlice";
import { API_URL, CONTENT_TYPE } from "../other/Constants";
import { Product, Image } from "../other/Types";
import { getImages } from "../Api_calls";

export default function EditProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const productToEditId = location.state;
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const [productToEdit, setProductToEdit] = useState<Product>();
  const [imageDatabase, setImageDatabase] = useState<Image[]>([]);

  const [title, setTitle] = useState(productToEdit?.name);
  const [description, setDescription] = useState(productToEdit?.description);
  const [price, setPrice] = useState(productToEdit?.price);
  const [image, setImage] = useState(productToEdit?.image);

  useEffect(() => {
    fetch(`${API_URL}/products/${productToEditId}`)
      .then((response) => response.json())
      .then((json) => {
        setProductToEdit(json);
      });
  }, []);

  useEffect(() => {
    getImages(setImageDatabase);
  }, []);

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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await fetch(`${API_URL}/products/${productToEditId}`, {
      method: "PATCH",
      body: JSON.stringify({
        image: image,
        name: title,
        description: description,
        price: price,
      }),
      headers: {
        "Content-type": CONTENT_TYPE,
      },
    });

    await fetch(`${API_URL}/products?createdBy=${currentUser}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(setUserProducts(json));
      });

    navigate("/user");
  }

  return (
    <div className="page-align">
      <div className="page">
        <div className="page-content">
          <h1>Edit Product</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="title">Product:</label>
              <input
                type="text"
                name="title"
                placeholder={productToEdit?.name}
                onChange={handleTitle}
              />
            </div>

            <div className="form-field">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                placeholder={productToEdit?.description}
                maxLength={100}
                rows={3}
                cols={70}
                onChange={handleDescription}
              ></textarea>
            </div>

            <div className="form-field">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                step="0.01"
                placeholder={productToEdit?.price?.toString()}
                onChange={handlePrice}
              />
            </div>

            <div className="form-field">
              <label htmlFor="image">Image:</label>
              <select
                name="image"
                onChange={handleImage}
                placeholder={productToEdit?.image}
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
