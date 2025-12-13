import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const UserProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();
    
    const { data: dbUser = {}, refetch } = useQuery({
        queryKey: ['user-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });
    

    const { data: stats = { participated: 0, won: 0 } } = useQuery({
        queryKey: ['user-stats', user?.email],
        queryFn: async () => {
             const paymentsRes = await axiosSecure.get(`/payments/${user.email}`);
             const wonRes = await axiosSecure.get(`/contests/won/${user.email}`);
             
             const participated = paymentsRes.data.length;
             const won = wonRes.data.length;
             
             return { participated, won }; 
        }
    });


    const totalParticipated = Math.max(stats.participated, stats.won);
    const winPercentage = totalParticipated > 0 ? ((stats.won / totalParticipated) * 100).toFixed(1) : 0;
    

    const data = [
        { name: 'Won', value: stats.won },
        { name: 'Participated', value: totalParticipated - stats.won },
    ];
    
    const COLORS = ['#00C49F', '#FFBB28'];

    const onSubmit = data => {
        const updatedInfo = {
            name: data.name,
            photo: data.photoURL,
            address: data.address
        }
        

        updateUserProfile(data.name, data.photoURL)
            .then(() => {

                 axiosSecure.put(`/users/${user?.email}`, updatedInfo)
                    .then(res => {
                        document.getElementById('edit_profile_modal').close(); 
                        
                        if(res.data.modifiedCount > 0){
                            refetch(); 
                            Swal.fire('Updated!', 'Your profile has been updated.', 'success');
                        } else {
                             refetch();
                             Swal.fire('Updated!', 'Profile synchronized.', 'success');
                        }
                    })
            })
            .catch(error => {
                console.error(error);
                Swal.fire('Error', 'Failed to update profile.', 'error');
            });
    }

    return (
        <div className="max-w-4xl mx-auto pt-10 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">My Profile</h2>
             <div className="card bg-base-100 shadow-xl p-8 flex flex-col items-center">
                 <div className="avatar mb-4">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={dbUser.photo || user.photoURL} alt="Profile" />
                    </div>
                 </div>
                 <h3 className="text-3xl font-bold mb-1">{dbUser.name || user.displayName}</h3>
                 <p className="text-gray-500 text-lg mb-1">{user.email}</p>
                 {dbUser.address && <p className="text-gray-400 text-sm mb-6">{dbUser.address}</p>}
                 
                 <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center mb-8">
                     <div className="stats shadow">
                        <div className="stat place-items-center">
                            <div className="stat-title">Win Percentage</div>
                            <div className="stat-value text-primary">{winPercentage}%</div>
                            <div className="stat-desc">Based on contests won</div>
                        </div>
                     </div>
                     
                     <div className="w-64 h-64">
                        {stats.participated > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : <p>Participate in contests to see chart.</p>}
                     </div>
                 </div>

                 <button className="btn btn-primary btn-wide" onClick={()=>document.getElementById('edit_profile_modal').showModal()}>
                    Edit Profile
                 </button>

                 {/* Modal */}
                 <dialog id="edit_profile_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Update Profile</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-control">
                                <label className="label">Name</label>
                                <input type="text" defaultValue={user.displayName} {...register("name")} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">Email</label>
                                <input type="email" defaultValue={user.email} className="input input-bordered" readOnly disabled />
                            </div>
                            <div className="form-control">
                                <label className="label">Photo URL</label>
                                <input type="text" defaultValue={user.photoURL} {...register("photoURL")} className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">Address</label>
                                <input type="text" defaultValue={dbUser.address || ""} {...register("address")} className="input input-bordered" placeholder="City, Country" />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="button" className="btn" onClick={()=>document.getElementById('edit_profile_modal').close()}>Close</button>
                            </div>
                        </form>
                    </div>
                 </dialog>
             </div>
        </div>
    );
};

export default UserProfile;
