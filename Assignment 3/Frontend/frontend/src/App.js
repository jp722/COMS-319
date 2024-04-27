import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.css';
import Views from "./Views.js"

let productsData;

const App = () => {
  console.log("Step 1 : load Products in a useState.");
  useEffect(() => {
    loadProducts();
  }, []); // This will call loadProducts only once when the component mounts
  const [ProductsCategory, setProductsCategory] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  //Views
  const [viewer, setViewer] = useState(0);

  function loadProducts() {
    fetch("http://localhost:8081/products")
      .then(response => response.json())
      .then(data => {
        setProductsCategory(data); // Set the state directly with the fetched data
      })
      .catch(error => console.error("Error fetching products:", error));
  }

  function handleClick(tag) {
    console.log("Step 4 : in handleClick", tag);
    //Filters product where the category is the same as the tag
    //let filtered = Products.filter(cat => cat.category === tag);
    //modify useState
    //setProductsCategory(filtered);
    // ProductsCategory = filtered;

    //Change View
    if (tag === "View All Products") {
      setViewer(0);
      loadProducts();
    } else if (tag === "Add New Product") {
      setViewer(1);
    } else if (tag == "Update Product Price") {
      setViewer(2);
    } else if (tag == "Delete Product") {
      setViewer(3);
    } else if (tag == "Student Information") {
      setViewer(4);
    }

    console.log("Step 5 : ", viewer);
  }

  return (
    <div className="flex fixed flex-row">
      <div className="h-screen bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
        <div className="px-6 py-4">
          <h1 className="text-3xl mb-2 font-bold text-white"> Assignment 03: MERN Application Development </h1>
          <p className="text-gray-700 text-white">
            Developed by - <b style={{ color: 'orange' }}> Justin Templeton, Juan Figueroa</b>
          </p>
          <div className="py-10">
            {(Views) ? <p className='text-white'>Views : </p> : ''}
            {
              Views.map(tag => <button key={tag} className="inline-block bg-amber-600 rounded-full px-3 py-1
    text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={() => { handleClick(tag) }}>{tag}</button>)
            }
          </div>
        </div>
      </div>
      <div className="ml-5 p-10 xl:basis-4/5">
        {console.log("Before render :", viewer)}
        {/*{render_products(ProductsCategory)}*/}
        <div>
          {viewer === 0 && <ViewAllProducts productsCategory={ProductsCategory} />}
          {viewer === 1 && <AddNewProduct />}
          {viewer === 2 && <UpdateProductPrice productsCategory={ProductsCategory} />}
          {viewer === 3 && <DeleteProduct productsCategory={ProductsCategory} />}
          {viewer === 4 && <StudentInformation />}
        </div>
      </div>
    </div>
  );

  function AddNewProduct() {
    const onSubmit = (data) => {
      console.log(data);

      fetch('http://localhost:8081/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
      alert("New Product!");
      window.location.reload();
      setViewer(1);
    }

    return <div className='category-section bg-gray-50 p-4'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 mb-4">Add New Product</h2>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <input {...register("id", { required: true })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Id" />
          {errors.id && <p className='text-red-500 text-xs italic'>Id is required</p>}
          <input {...register("title", { required: true })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' placeholder="Title" />
          {errors.title && <p className='text-red-500 text-xs italic'>Title is required.</p>}
          <input {...register("price", { required: true })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' placeholder="Price" />
          {errors.price && <p className='text-red-500 text-xs italic'>Price is required.</p>}
          <input {...register("description", { required: true })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' placeholder="Description" />
          {errors.description && <p className='text-red-500 text-xs italic'>Description is required.</p>}
          <input {...register("category")} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' placeholder="Category" />
          <input {...register("image", { required: true })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' placeholder="Image" />
          {errors.image && <p className='text-red-500 text-xs italic'>Image is required.</p>}
          <input {...register("rate", { required: true })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' placeholder="Rate" />
          {errors.rate && <p className='text-red-500 text-xs italic'>Rate is required.</p>}
          <input {...register("count", { required: true })} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' placeholder="Count" />
          {errors.count && <p className='text-red-500 text-xs italic'>Count is required.</p>}
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
        </form>
      </div>
    </div>

  }

  function UpdateProductPrice({ productsCategory }) {
    const [filterId, setFilterId] = useState('');
    const [filteredProduct, setFilteredProduct] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    const handleFilterChange = (e) => {
      setFilterId(e.target.value);
    };

    const handleFilterSubmit = () => {
      const product = productsCategory.find(p => p.id.toString() === filterId);
      setFilteredProduct(product);
    };

    const handlePriceSubmit = () => {
      console.log(filterId);
      fetch(`http://localhost:8081/updateProduct/${filterId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(
          {
            "price": newPrice
          }
        )
      })
        .then(response => response.json())
        .then(data => {
          alert("Price Changed");
          loadProducts();
          handleFilterSubmit();
        })
        .catch(error => {
          console.log("Error");
          alert("Failed to change price");
        });
    }

    const handlePriceChange = (e) => {
      setNewPrice(e.target.value);
    }

    return (
      <div className='category-section fixed'>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
          Update Product Price
        </h2>
        <div class="flex justify-center items-center space-x-2">
          <input
            type="text"
            value={filterId}
            onChange={handleFilterChange}
            placeholder="Enter product ID"
            class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          />
          <button onClick={handleFilterSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Show Product</button>
        </div>
        {filteredProduct && (
          <div>
            <div key={filteredProduct.id} className="group relative shadow-lg">
              {/* Render the single product details here */}
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none mt-4">
                <img
                  alt="Product Image"
                  src={filteredProduct.image}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={filteredProduct.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {filteredProduct.title}
                    </a>
                    <p>Tag - {filteredProduct.category}</p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Rating: {filteredProduct.rating.rate}</p>
                </div>
                <p className="text-sm font-medium text-green-600">${filteredProduct.price}</p>
              </div>
            </div>
            <div class="flex justify-center items-center space-x-2">
              <input
                type="number"
                value={newPrice}
                onChange={handlePriceChange}
                placeholder="Enter New Price"
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mt-4"
              />
              <button onClick={handlePriceSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Change Price</button>
            </div>
          </div>
        )}
      </div>
    );
  };
}

const ViewAllProducts = ({ productsCategory }) => {

  const [filterId, setFilterId] = useState('');
  const [filteredProduct, setFilteredProduct] = useState(null);

  const handleFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleFilterSubmit = () => {
    if (filterId && productsCategory) {
      const product = productsCategory.find(p => p.id.toString() === filterId);
      setFilteredProduct(product);
    }
    else {
      setFilteredProduct(null);
    }
  };

  return (
    <div className='category-section fixed'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
        Products ({productsCategory.length})
      </h2>
      <div class="flex justify-center items-center space-x-2">
        <input
          type="text"
          value={filterId}
          onChange={handleFilterChange}
          placeholder="Enter product ID"
          class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <button onClick={handleFilterSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Show Product</button>
      </div>
      {filteredProduct ? (
        // Render the filtered product
        <div key={filteredProduct.id} className="group relative shadow-lg">
          {/* Render the single product details here */}
          <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none mt-4">
            <img
              alt="Product Image"
              src={filteredProduct.image}
              className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
          </div>
          <div className="flex justify-between p-3">
            <div>
              <h3 className="text-sm text-gray-700">
                <a href={filteredProduct.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {filteredProduct.title}
                </a>
                <p>Tag - {filteredProduct.category}</p>
              </h3>
              <p className="mt-1 text-sm text-gray-500">Rating: {filteredProduct.rating.rate}</p>
            </div>
            <p className="text-sm font-medium text-green-600">${filteredProduct.price}</p>
          </div>
        </div>
      ) : (
        // Render all products if no filter is applied
        <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10" style={{
          maxHeight: '800px', overflowY: 'scroll'
        }}>
          {/* Loop Products */}
          {productsCategory.map((product, index) => (
            <div key={index} className="group relative shadow-lg" >
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                <img
                  alt="Product Image"
                  src={product.image}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                    </a>
                    <p>Tag - {product.category}</p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
                </div>
                <p className="text-sm font-medium text-green-600">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );


}

const DeleteProduct = ({ productsCategory }) => {
  const [filterId, setFilterId] = useState('');
  const [filteredProduct, setFilteredProduct] = useState(null);

  const handleFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleFilterSubmit = () => {
    if (filterId && productsCategory) {
      const product = productsCategory.find(p => p.id.toString() === filterId);
      setFilteredProduct(product);
    }
    else {
      setFilteredProduct(null);
    }
  };

  const handleDeleteSubmit = () => {
    // Fetch the value from the input field
    console.log(filterId);
    fetch(`http://localhost:8081/deleteProduct/${filterId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(
        { "id": filterId }
      )
    })
      .then(response => response.json())
    alert("Product Deleted");
    setFilterId(null);
    handleFilterSubmit();
  }

  return (
    <div className='category-section fixed'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
        Delete Product
      </h2>
      <div class="flex justify-center items-center space-x-2">
        <input
          type="text"
          value={filterId}
          onChange={handleFilterChange}
          placeholder="Enter product ID"
          class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        />
        <button onClick={handleFilterSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Show Product</button>
      </div>
      {filteredProduct && (
        <div>
          <div key={filteredProduct.id} className="group relative shadow-lg">
            {/* Render the single product details here */}
            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none mt-4">
              <img
                alt="Product Image"
                src={filteredProduct.image}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="flex justify-between p-3">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={filteredProduct.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {filteredProduct.title}
                  </a>
                  <p>Tag - {filteredProduct.category}</p>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Rating: {filteredProduct.rating.rate}</p>
              </div>
              <p className="text-sm font-medium text-green-600">${filteredProduct.price}</p>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button onClick={handleDeleteSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Confirm Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

const StudentInformation = () => {
  return (
    <div className='category-section fixed p-4'>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Student Information</h2>

      {/*Student Information */}
      <div className="mt-4">
        <div className="font-semibold">Student 1 Name: <span className="font-normal">Justin Templeton</span></div>
        <div className="font-semibold">Student 1 Email: <span className="font-normal">jstemps@iastate.edu</span></div>
        <div className="font-semibold">Student 2 Name: <span className="font-normal">Juan Figueroa</span></div>
        <div className="font-semibold">Student 2 Email: <span className="font-normal">jupiter1@iastate.edu</span></div>
      </div>

      {/*Course Information */}
      <div className="mt-6">
        <h3 className="text-2xl font-bold">Course Information</h3>
        <div className="mt-4">
          <div className="font-semibold">Course Number: <span className="font-normal">CS319</span></div>
          <div className="font-semibold">Course Name: <span className="font-normal">Construction of User Interfaces</span></div>
          <div className="font-semibold">Date: <span className="font-normal">27-04-2024</span></div>
          <div className="font-semibold">Professor Name: <span className="font-normal">Dr. Abraham Aldaco</span></div>
          <div className="font-semibold">Project Description: <span className="font-normal">This project Develops a MERN (MongoDB, Express, React, Nodejs) application for managing a catalog of items using the
            "https://fakestoreapi.com/products" dataset. Implements key CRUD functionalities and ensure a well-organized,
            user-friendly interface.</span></div>
        </div>
      </div>
    </div>
  );
}

export default App;