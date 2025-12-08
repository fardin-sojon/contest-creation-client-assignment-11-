import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const UpdateContest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    

    const { data: contest = {} } = useQuery({
        queryKey: ['contest-update', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/${id}`);
            return res.data;
        }
    });

    const onSubmit = data => {

        const updatedData = {
            ...data
        }


        
        axiosSecure.put(`/contests/${id}`, updatedData)
            .then(res => {
                 if(res.data._id){
                    Swal.fire("Updated!", "Contest updated successfully.", "success");
                    navigate('/dashboard/myCreatedContests');
                }
            })
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Update Contest</h2>
             <div className="bg-base-100 p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="form-control">
                        <label className="label">Contest Name</label>
                        <input type="text" defaultValue={contest.name} {...register("name")} className="input input-bordered" />
                    </div>
                     <div className="form-control">
                        <label className="label">Image URL</label>
                        <input type="text" defaultValue={contest.image} {...register("image")} className="input input-bordered" />
                    </div>
                     <div className="form-control">
                        <label className="label">Price</label>
                        <input type="number" defaultValue={contest.price} {...register("price")} className="input input-bordered" />
                    </div>
                     <div className="form-control">
                        <label className="label">Prize</label>
                        <input type="text" defaultValue={contest.prize} {...register("prize")} className="input input-bordered" />
                    </div>
                     <div className="form-control">
                        <label className="label">Description</label>
                        <textarea defaultValue={contest.description} {...register("description")} className="textarea textarea-bordered"></textarea>
                    </div>
                     <div className="form-control">
                        <label className="label">Task Instruction</label>
                        <textarea defaultValue={contest.taskInstruction} {...register("taskInstruction")} className="textarea textarea-bordered"></textarea>
                    </div>
                    
                    <button className="btn btn-primary w-full">Update</button>
                 </form>
             </div>
        </div>
    );
};

export default UpdateContest;
