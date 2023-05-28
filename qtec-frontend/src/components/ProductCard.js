import React from 'react'

function ProductCard(props){
    return (
       
        <div className=" col-md-4 col-sm-10 offset-md-0 offset-sm-1 pt-lg-4 pt-4"> 
            <div className="card"> 
            <img className="card-img-top" src={ "http://127.0.0.1:8000" + props.product.photo} />
            <div className="card-body">
                <h6 className="font-weight-bold pt-1">{ props.product.title } </h6>
                <div className="text-muted">{ props.product.seller.name }</div>

                <div className="d-flex align-items-center justify-content-between pt-3">
                    <div className="d-flex flex-column">
                        <div className="h6 font-weight-bold">{ props.product.price } BDT</div>
                        
                        
                    </div>
                    <div className="btn btn-primary">Buy now</div>

                </div>
            </div>
        </div>
    </div> 
        
    )
}

export default ProductCard