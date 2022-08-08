interface Product{
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  finalPrice: number;
  images: string[];
  thumbnails: string[];
}

const products = {
  1: {
    id: 1,
    title: "Fall Limited Edition Sneakers",
    description:
      "These low-profile sneakers are your perfect casual wear companion. Featuring a durable ruebber outer sole, they'll withstand everything the weather can offer.",
    price: "$250.00",
    discount: "50%",
    finalPrice: "$125.00",
    images: ["../images/image-product-1.jpg","../images/image-product-2.jpg","../images/image-product-3.jpg","../images/image-product-4.jpg"],
    thumbnails: ["../images/image-product-1-thumbnail.jpg","../images/image-product-2-thumbnail.jpg","../images/image-product-3-thumbnail.jpg","../images/image-product-4-thumbnail.jpg"],
  },
};

export default products;
