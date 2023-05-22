import React from 'react'

function AboutImageGallery({product}) {
    return (

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-12 px-6 lg:grid-cols-4">
            <div>
                <img className="h-auto max-w-full rounded-lg" src={product.thumbnail} alt={product.name}/>
            </div>
        </div>
    )
}

export default AboutImageGallery