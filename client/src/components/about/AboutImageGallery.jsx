import React from 'react'
import { Link } from 'react-router-dom'
function AboutImageGallery({ product }) {
    return (

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-12 px-6 lg:grid-cols-4">
            <div>
                <Link to={`/products/${product.id}`}>

                    <img className="h-auto max-w-full rounded-lg" src={product.thumbnail} alt={product.name} />
                </Link>
            </div>
        </div>
    )
}

export default AboutImageGallery