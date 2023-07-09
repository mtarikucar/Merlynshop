import {useState} from "react";

function ImageExhibiton({thumbnail, photos}) {

    const [activeImage, setActiveImage] = useState();

  return (
    <div className="lg:flex lg:items-center gap-4">
      <div className="lg:order-2 lg:ml-5">
        <div className="max-w-xl overflow-hidden rounded-lg">
          <img
            className="h-full w-full max-w-full object-cover"
            src={activeImage ? activeImage : thumbnail}
            alt=""
          />
        </div>
      </div>

      <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
        <div className="flex flex-row items-start lg:flex-col">
          <button
            onClick={() => setActiveImage(thumbnail)}
            type="button"
            className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
          >
            <img
              className="h-full w-full object-cover"
              src={thumbnail}
              alt=""
            />
          </button>
          {photos?.map((image, i) => (
            <button
              onClick={() => setActiveImage(image.imgpath)}
              key={i}
              type="button"
              className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
            >
              <img
                className="h-full w-full object-cover"
                src={image.imgpath}
                alt=""
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageExhibiton;
