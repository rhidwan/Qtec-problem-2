
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Form from 'react-bootstrap/Form';

function ViewProduct(){
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        brand: new Array(),
        seller: new Array(),
        warranty: new Array(),
        max_price: 500000,
        min_price: 0
    })
    const [availableFilter, setAvailableFilter] = useState({
        brands: new Array(),
        sellers: new Array(),
        warranty: new Array()
    })
    
    const BrandfilterHandler = (event) => {
        if (event.target.checked) {
          setFilter({...filter, brand: [...filter.brand, event.target.value]})
        } else {
          setFilter(
            {
                ...filter, brand: filter.brand.filter((obj) => obj !== event.target.value)
            }
          )
        }
      }
    const sellerfilterHandler = (event) => {
        if (event.target.checked) {
            setFilter({...filter, seller: [...filter.seller, event.target.value]})
          } else {
            setFilter(
              {
                  ...filter, seller: filter.seller.filter((obj) => obj !== event.target.value)
              }
            )
          }
    }
    const warrantyfilterHandler = (event) => {
        if (event.target.checked) {
            setFilter({...filter, warranty: [...filter.warranty, event.target.value]})
          } else {
            setFilter(
              {
                  ...filter, warranty: filter.warranty.filter((obj) => obj !== event.target.value)
              }
            )
          }
    }

    const minChange = (event) => {
        setFilter({...filter, min_price: event.target.value && event.target.value>= 0 ? event.target.value: 0 })
    }
    const maxChange = (event) => {
        setFilter({...filter, max_price: 0 < event.target.value && event.target.value < 500000 ? event.target.value: 500000 })
    }

    const filtered_data = data.filter((node) => {
        console.log(filter.brand, node.brand.name)
            if (node.price > filter.max_price || node.price < filter.min_price) return false 
            if (filter.brand.length > 0 && !filter.brand.includes(node.brand.name)) return false
            if (filter.seller.length > 0 && !filter.seller.includes(node.seller.name)) return false
            if (filter.warranty.length > 0 && !filter.warranty.includes(node.warranty)) return false
            return true
    }); 
    
    

    useEffect(() => {
        loadData()
    }, []);


const loadData = async () => {
  const response =  await fetch('http://127.0.0.1:8000/product/api/list/');
  const data = await response.json();
  const products = data.products;
  setAvailableFilter({
    brands: data.filters.brands,
    sellers: data.filters.sellers,
    warranty: data.filters.warranty
  });

  console.log(products)
  setData(await products);
}

    return (
    <div className="wrapper">
        <div className="d-md-flex align-items-md-center">
            <div className="h3">Earphones</div>
        </div>
      
      
        <div className="filters"> 
        
            <section id="sidebar">
                <div className='py-3'>
                <h5 className="font-weight-bold">Price</h5>
                    <div className="form-group">

                        <input type="number" placeholder='min' onChange={minChange} />
                        <input type="number" placeholder='max' onChange={maxChange} />
                            
                    </div>
                </div>
                <div className="py-3">
                    <h5 className="font-weight-bold">Brand</h5>
                    <ul className="list-group">
                        {availableFilter.brands.map(brand => 
                            <label htmlFor="brand" key={brand}>
                                <input type="checkbox" onChange={BrandfilterHandler} value={brand} id={brand}/>
                                <span> {brand}</span>
                            </label>
                        )}
                    </ul>
                </div>
                <div className="py-3">
                    <h5 className="font-weight-bold">Sellers</h5>
                    <ul className="list-group">
                        {availableFilter.sellers.map(seller => 
                            <label htmlFor="seller" key={seller}>
                                <input type="checkbox" onChange={sellerfilterHandler} value={seller} id={seller}/>
                                <span> {seller}</span>
                            </label>
                        )}
                    </ul>
                </div>
                
                <div className="py-3">
                    <h5 className="font-weight-bold">Warranty</h5>
                    <ul className="list-group">
                        {availableFilter.warranty.map(war => 
                            <label htmlFor="war" key={war}>
                                <input type="checkbox" onChange={warrantyfilterHandler} value={war} id={war}/>
                                <span> {war}</span>
                            </label>
                        )}
                    </ul>
                </div>
                
            </section> 
            </div>
            <section id="products">
                <div className="container py-3">
                    <div className="row">
                    {
                        filtered_data.map((product) =>  
                        <ProductCard product={product} key={product.id} />
                    )}
                    </div>
                </div>
            </section>
        </div>

)};
            



export default ViewProduct;