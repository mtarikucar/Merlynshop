import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


function AdminFeature({ openFeature, setOpenFeature }) {

  const { user, token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [newFeatureName, setNewFeatureName] = useState("");
  
  const createFeature = async (newFeature) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/feature`,
      newFeature
      , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return res.data;
  };

  const createFeatureMutation = useMutation(createFeature, {
    onSuccess: () => {
      queryClient.invalidateQueries("features");
      setOpenFeature(false),
        toast.success(` Feature Added`, {
          position: "bottom-left",
        });

    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    createFeatureMutation.mutate({ name: newFeatureName });
    setNewFeatureName("");
    setOpenFeature(false);
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={openFeature} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpenFeature}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 text-center sm:pb-4">
                  <h1 className="text-xl">Add Feature</h1>
                  <div className=" w-full">
                    <form >
                      <div className="mb-6 w-full">
                        <input
                          type="text"
                          id="default-input"
                          value={newFeatureName}
                          placeholder="new feature name"
                          onChange={(e) => setNewFeatureName(e.target.value)}
                          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                        />
                      </div>
                      <div className="px-4 py-3 flex gap-3 sm:flex-row-col w-full justify-between ">
                        <button

                          className="flex mt-2 w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 "
                          onClick={handleSubmit}
                        >
                          add
                        </button>
                      </div>
                    </form>
                    <button

                      className="mt-3 flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
                      onClick={() => setOpenFeature(false)}

                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default AdminFeature;
