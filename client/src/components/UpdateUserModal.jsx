import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useFormik } from 'formik';


// Modal component
function UpdateUserModal({ user, setOnClose, onClose }) {
    const queryClient = useQueryClient();

    // Fetch user data using react-query
    /*     const { data: user, isLoading } = useQuery(['user', userId], async () => {
            const response = await fetch(`/users/${userId}`);
            return response.json();
        }); */

    // Update user mutation using react-query
    const updateUserMutation = useMutation(async (values) => {
        const response = await fetch(`https://squid-app-wtk8l.ondigitalocean.app/api/user/${user.id}`, {
            method: 'PUT',
           
            body: JSON.stringify(values),
        });
        return response.json();
    }, {
        onSuccess: () => {
            
            setOnClose(false)
        },
    });

    // Formik form with Yup validation schema
    const formik = useFormik({
        initialValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
        },

        onSubmit: (values) => {
            updateUserMutation.mutate(values);
            console.log(values);
        },
    });

    return (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
            <div className="absolute top-0 left-0 z-40 w-full h-full bg-gray-900 opacity-50"></div>
            <div className="z-50 w-1/2 px-6 py-4 bg-white rounded shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Update User</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="w-full px-3 py-2 border rounded-md"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && <div className="text-red-500">{formik.errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full px-3 py-2 border rounded-md"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="mr-4" onClick={() => setOnClose(false)}>Cancel</button>
                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Save</button>
                    </div>
                </form>

            </div>
        </div>

    );
}


export default UpdateUserModal