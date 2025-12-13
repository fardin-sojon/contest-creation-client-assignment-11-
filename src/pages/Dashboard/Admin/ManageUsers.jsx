import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrash, FaUserShield } from "react-icons/fa";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: 'admin' })
            .then(res => {
                if(res.data._id){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.error("Make Admin Error:", err);
                Swal.fire('Error', 'Failed to update role.', 'error');
            });
    }
    
    const handleMakeCreator = user => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: 'creator' })
            .then(res => {
                if(res.data._id){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is a Creator Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => Swal.fire('Error', 'Failed to update role.', 'error'));
    }
    
     const handleMakeUser = user => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: 'user' })
            .then(res => {
                if(res.data._id){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is a User Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => Swal.fire('Error', 'Failed to update role.', 'error'));
    }

    return (
        <div>
           <h2 className="text-3xl font-bold mb-8">Manage Users</h2>
           <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className="flex gap-2">
                                     { user.role !== 'admin' && <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs btn-primary">Make Admin</button>}
                                     { user.role !== 'creator' && <button onClick={() => handleMakeCreator(user)} className="btn btn-xs btn-secondary">Make Creator</button>}
                                     { user.role !== 'user' && <button onClick={() => handleMakeUser(user)} className="btn btn-xs btn-accent">Make User</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
        </div>
    );
};

export default ManageUsers;
