import React from "react";
/* import { useHistory } from "react-router-dom"; */

const Unauthorized = () => {
/*   const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };
 */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Unauthorized</h1>
      <p className="text-gray-600 mb-8">You are not authorized to view this page.</p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded shadow"
       /*  onClick={handleGoBack} */
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;