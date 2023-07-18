export type Product = {
  id: number;
  createdBy: string;
  image: string;
  name: string;
  price: number;
  description: string;
  bought: boolean;
};

export type Image = {
  url: string;
  name: string;
  id: number;
};
