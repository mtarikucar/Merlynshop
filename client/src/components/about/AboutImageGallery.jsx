import React from 'react'
import { Link } from 'react-router-dom'
function AboutImageGallery({ product }) {
    return (

        <div className="">
            <Link to={`/products/${product.id}`}>
            
                    <img className="h-auto max-w-full rounded-lg" src={product.thumbnail} alt={product.name} />
              
            </Link>
        </div>
    )
}

export default AboutImageGallery