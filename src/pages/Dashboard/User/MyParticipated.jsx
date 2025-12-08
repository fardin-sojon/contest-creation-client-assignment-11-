import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyParticipated = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [sortByDeadline, setSortByDeadline] = useState(false);

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    const sortedPayments = sortByDeadline 
        ? [...payments].sort((a, b) => new Date(a.contestId?.deadline) - new Date(b.contestId?.deadline)) 
        : payments;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">My Participated Contests</h2>
                <select
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => setSortByDeadline(e.target.value === 'upcoming')}
                    defaultValue="default"
                >
                    <option value="default">Default Order</option>
                    <option value="upcoming">Sort by Upcoming</option>
                </select>
            </div>
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Contest ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPayments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.transactionId}</td>
                                <td>{payment.contestName || payment.contestId?.name || "Unknown"}</td>
                                <td>${payment.price}</td>
                                <td>
                                    {payment.status === 'succeeded' || payment.status === 'service pending' ? <span className="badge badge-success">Paid</span> : <span className="badge badge-warning">Pending</span>}
                                </td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <td>
                                    {payment.contestId?._id && (
                                        <Link to={`/contest/${payment.contestId._id}`}>
                                            <button className="btn btn-xs btn-neutral">View</button>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParticipated;
