import { Fragment, useRef, useState,useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "@mui/icons-material/Close";
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

function AdminAddProduct({ open, setOpen }) {
  const cancelButtonRef = useRef(null);

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
      axios.post("http://localhost:8080/api/product", product, {
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
          type: "error",
        });
      },
    }
  );

  useEffect(() => {
    formik.setFieldValue('name', '');
    formik.setFieldValue('photos', '');
    formik.setFieldValue('thumbnail', '');
    formik.setFieldValue('description', '');
    formik.setFieldValue('price','');
    formik.setFieldValue('quantity', '');
    formik.setFieldValue('categoryId', '');
    setPreviews([]);
    setThumbnailPreview('');
  }, [open]);
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8080/api/category");
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

    },
  });

  const [previews, setPreviews] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
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
      setThumbnailPreview(imgpath);
      setPreviews([reader.result]); // Küçük resmi önizlemede göster
      createPreview(file); // Önizlemeyi oluştur
    }
  };

  const handleRemovePhoto = (index) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    formik.setFieldValue(
      "photos",
      formik.values.photos.filter((_, i) => i !== index)
    );
  };


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg  bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4  pb-4 pt-5 sm:p-6 sm:pb-4 ">
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
                        {thumbnailPreview && (
                          <div className="relative">
                            <div className="absolute w-16 h-16 mb-2 ml-2 rounded hover:backdrop-blur-sm ">
                              <span className=" rounded drop-shadow-2xl">
                                <CloseIcon
                                  className="text-white hover:text-red-700"
                                  onClick={() => {
                                    setThumbnailPreview(null);
                                    formik.setFieldValue("thumbnail", null);
                                  }}
                                />
                              </span>
                            </div>
                            <img
                              src={thumbnailPreview}
                              alt="Önizleme"
                              className="w-16 h-16 object-cover m-2 border-2 border-gray-300 rounded col-span-1"
                            />
                          </div>
                        )}
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
                            <div key={index} className="relative">
                              <div className="absolute w-16 h-16 m-2 rounded hover:backdrop-blur-sm">
                                <span className="hover:bg-opacity-80 rounded drop-shadow-2xl">
                                  <CloseIcon
                                    className="text-white hover:text-red-700"
                                    onClick={() => handleRemovePhoto(index)}
                                  />
                                </span>
                              </div>
                              <img
                                src={preview}
                                alt="Önizleme"
                                className="w-16 h-16 object-cover m-2 border-2 border-gray-300 rounded col-span-1"
                              />
                            </div>
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
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AdminAddProduct;
