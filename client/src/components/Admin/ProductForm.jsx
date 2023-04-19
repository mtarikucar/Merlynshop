import { useState } from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { storage } from "../../firebase"; // Firebase yapılandırmanızı içeren dosyanız
import axios from "axios";
// Firebase sürüm 9.0.0 ve üzeri için güncellenmiş import
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AdminCategoryForm from "./AdminCategoryForm";
import { useSelector } from "react-redux";

const ProductForm = ({ setOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const [openCategory, setOpenCategory] = useState(false);
  const queryClient = useQueryClient();

  const uploadToFirebase = async (image) => {
    const uniqueId = uuidv4();
    const storageRef = ref(storage, `images/${uniqueId}`);
    await uploadBytes(storageRef, image);
    const imageURL = await getDownloadURL(storageRef);
    return imageURL;
  };

  const postProductMutation = useMutation(
    (product) =>
      axios.post("http://localhost:3000/api/product", product, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        setOpen(false);
        toast.success(` product Added`, {
          position: "bottom-left",
        });
      },
      onError: (err) => {
        toast.success(`${err} product error`, {
          position: "bottom-left",
          type: "error"
        });
      },
    }
  );

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:3000/api/category");
    return res.data;
  };

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery("categories", fetchCategories);

  const formik = useFormik({
    initialValues: {
      name: "",
      photos: [],
      thumbnail: "",
      description: "",
      price: "",
      quantity: "",
      categoryId: "",
    },
    onSubmit: async (values) => {
      postProductMutation.mutate(values);
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
      formik.setFieldValue("photos", [...formik.values.photos, { imgpath }]);
      createPreview(file); // Önizlemeyi oluştur
    } else {
      alert("En fazla 4 fotoğraf ekleyebilirsiniz.");
    }
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgpath = await uploadToFirebase(file);
      formik.setFieldValue("thumbnail", imgpath);
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
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Quantity:
            </label>
            <input
              id="quantity"
              name="quantity"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.quantity}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="mb-4">
            <label
              htmlFor="categoryId"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Category:
            </label>
            <div className="flex flex-row">
              {isLoading ? (
                <p>Loading categories...</p>
              ) : isError ? (
                <p>Error loading categories</p>
              ) : (
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  className="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
              <AdminCategoryForm
                openCategory={openCategory}
                setOpenCategory={setOpenCategory}
              />
              <button
                onClick={() => setOpenCategory(true)}
                className="py-2 px-4 text-white bg-green-500 rounded-r hover:bg-white hover:text-black text-xl"
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
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
            <label
              htmlFor="photos"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
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
      <div
        onClick={() => setOpen(false)}
        className="w-full p-2 mt-2 text-red font-semibold rounded hover:bg-red-600 text-center cursor-pointer hover:text-white"
      >
        kapat
      </div>
    </form>
  );
};

export default ProductForm;
