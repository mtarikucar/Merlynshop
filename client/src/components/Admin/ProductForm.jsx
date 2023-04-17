import { useState } from 'react';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { storage } from '../../firebase'; // Firebase yapılandırmanızı içeren dosyanız

// Firebase sürüm 9.0.0 ve üzeri için güncellenmiş import
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AdminCategoryForm from './AdminCategoryForm';

const ProductForm = ({ setOpen }) => {

  const [openCategory, setOpenCategory]=useState(false)
  const queryClient = useQueryClient();

  const uploadToFirebase = async (image) => {
    const uniqueId = uuidv4();
    const storageRef = ref(storage, `images/${uniqueId}`);
    await uploadBytes(storageRef, image);
    const imageURL = await getDownloadURL(storageRef);
    return imageURL;
  };

  const postProductMutation = useMutation(
    (product) => axios.post('/api/products', product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
      },
    },
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      photos: [],
      thumbnail: '',
      description: '',
      price: '',
      quantity: '',
      categoryId: '',
    },
    onSubmit: async (values) => {
      /* postProductMutation.mutate(values); */
      console.log(values);
    },
  });

  const [previews, setPreviews] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  // Önizleme oluşturucu fonksiyon
  const createPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
    };
  };


  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file && formik.values.photos.length < 4) {
      const imgpath = await uploadToFirebase(file);
      formik.setFieldValue('photos', [
        ...formik.values.photos,
        { imgpath },
      ]);
      createPreview(file); // Önizlemeyi oluştur
    } else {
      alert("En fazla 4 fotoğraf ekleyebilirsiniz.");
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgpath = await uploadToFirebase(file);
      formik.setFieldValue('thumbnail', imgpath);
      setPreviews([reader.result]); // Küçük resmi önizlemede göster
      createPreview(file); // Önizlemeyi oluştur
    }
  };

  return (

    <form
      onSubmit={formik.handleSubmit}
      className="min-w-md w-full mx-auto my-10 bg-white p-5 rounded shadow-sm"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
              Product Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-600">
              description:
            </label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-600">
              Price:
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              onChange={formik.handleChange}
              value={formik.values.price}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-600">
              Quantity:
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.quantity}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-4" >
            <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-600">
              Category:
            </label>
            <div className=' flex flex-row' >
              <input
                id="categoryId"
                name="categoryId"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.categoryId}
                className="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:border-indigo-500"
              />
              <AdminCategoryForm openCategory={openCategory} setOpenCategory={setOpenCategory} />
              <button onClick={()=> setOpenCategory(true)} className='py-2 px-4 text-white bg-green-500 rounded-r hover:bg-white hover:text-black   text-xl ' >+</button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-600">
              Thumbnail:
            </label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleThumbnailChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-600">
              Photos:
            </label>
            <input
              type="file"
              name="photos"
              onChange={handlePhotoChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mt-4 grid grid-cols-3">
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt="Önizleme"
                className="w-16 h-16 object-cover m-2 border-2 border-gray-300 rounded col-span-1 "
              />
            ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600"
      >
        Gönder
      </button>
      <button
        onClick={() => setOpen(false)}
        type="submit"
        className="w-full p-2 mt-2 text-red font-semibold rounded hover:bg-red-600 hover:text-white"
      >
        kapat
      </button>
    </form>
  );
};

export default ProductForm;    