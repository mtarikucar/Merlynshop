import { useMutation, useQuery, useQueryClient } from "react-query";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import axios from "axios";

// Modal component
function UpdateUserModal({ user, setOnClose, onClose }) {
  const queryClient = useQueryClient();

  // Update user mutation using react-query
  const updateStatus = useMutation(
    async (status) => {
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/order/${user.id}`,
          status
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        toast.info(`Order canceled`, {
          position: "bottom-left",
        });
        queryClient.invalidateQueries("orders");
        onClose();
      },
    }
  );

  const handleCancelOrder = () => {
    updateStatus.mutate({ status: "cancelled" });
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
      <div className="absolute top-0 left-0 z-40 w-full h-full bg-gray-900 opacity-50"></div>
      <div className="z-50 w-1/2 px-6 py-4 bg-white rounded shadow-lg">
        <div className="flex justify-end">
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleCancelOrder}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel Order
          </button>
        </div>
        <h2 className="mb-4 text-xl font-bold">
          Are you sure you want to cancel the order?
        </h2>
      </div>
    </div>
  );
}

export default UpdateUserModal;