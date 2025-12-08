import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageContests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: contests = [], refetch } = useQuery({
        queryKey: ['admin-contests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/contests');
            return res.data;
        }
    });

    const handleConfirm = (id) => {
         axiosSecure.patch(`/admin/contests/${id}`)
            .then(res => {
                 if(res.data._id){
                    refetch();
                    Swal.fire("Confirmed!", "Contest has been confirmed.", "success");
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire("Error", "Failed to confirm contest.", "error");
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/admin/contests/${id}`)
                    .then(res => {
                        if (res.data._id) {
                            refetch();
                            Swal.fire("Deleted!", "Contest has been deleted.", "success");
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire("Error", "Failed to delete contest.", "error");
                    })
            }
        });
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Manage Contests</h2>
             <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Creator</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                         {contests.map((contest, index) => (
                            <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td>{contest.name}</td>
                                <td>{contest.creator?.email}</td>
                                <td>{contest.status}</td>
                                <td>
                                    {contest.status === 'pending' && <button onClick={() => handleConfirm(contest._id)} className="btn btn-xs btn-success mr-2">Confirm</button>}
                                    <button onClick={() => handleDelete(contest._id)} className="btn btn-xs btn-error">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
    );
};

export default ManageContests;
