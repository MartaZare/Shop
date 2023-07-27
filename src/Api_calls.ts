import { API_URL, CONTENT_TYPE } from "./other/Constants";
import { Product } from "./other/Types";

export function addToDatabase(
  currentUser: string,
  image: string,
  title: string,
  description: string,
  price: number
) {
  fetch(`${API_URL}/products`, {
    method: "POST",
    body: JSON.stringify({
      createdBy: currentUser,
      image: image,
      name: title,
      description: description,
      price: price,
      bought: false,
    }),
    headers: {
      "Content-type": CONTENT_TYPE,
    },
  });
}

export function changeProductBoughtState(product: Product, bought: boolean) {
  fetch(`${API_URL}/products/${product.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      bought: bought,
    }),
    headers: {
      "Content-type": CONTENT_TYPE,
    },
  });
}

export function deleteFromDatabase(index: number) {
  fetch(`${API_URL}/products/${index}`, {
    method: "DELETE",
  });
}

export function getProducts(
  address: string,
  input: string,
  setter: (arg: Product[]) => void
) {
  fetch(`${API_URL}/${address}${input}`)
    .then((response) => response.json())
    .then((json) => {
      setter(json);
    });
}

export async function getOriginalProductsCount(): Promise<number> {
  try {
    const response = await fetch(`${API_URL}/products?createdBy=author`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseJson = await response.json();
    return responseJson.length;
  } catch (error) {
    throw error;
  }
}

export function getImages(setImageDatabase) {
  fetch(`${API_URL}/images`)
    .then((response) => response.json())
    .then((json) => {
      setImageDatabase(json);
    });
}
