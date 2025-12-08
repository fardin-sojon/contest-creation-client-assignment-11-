import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyCreatedContests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: contests = [], refetch } = useQuery({
        queryKey: ['my-created-contests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/creator/${user.email}`);
            return res.data;
        }
    });

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
                axiosSecure.delete(`/contests/${id}`)
                    .then(res => {
                        if (res.data._id) {
                            refetch();
                            Swal.fire("Deleted!", "Your contest has been deleted.", "success");
                        }
                    })
            }
        });
    }

    return (
        <div>
             <h2 className="text-3xl font-bold mb-8">My Created Contests</h2>
             <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Submissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest, index) => (
                            <tr key={contest._id}>
                                <th>{index + 1}</th>
                                <td>{contest.name}</td>
                                <td>{contest.status}</td>
                                <td>
                                    {contest.status === 'pending' && (
                                        <>
                                            <Link to={`/dashboard/updateContest/${contest._id}`} className="btn btn-xs btn-info mr-2">Edit</Link>
                                            <button onClick={() => handleDelete(contest._id)} className="btn btn-xs btn-error">Delete</button>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/dashboard/contestSubmissions/${contest._id}`} className="btn btn-xs btn-accent">See Submissions</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCreatedContests;
