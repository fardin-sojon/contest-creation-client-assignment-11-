import { useForm, Controller } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const AddContest = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        const contestData = {
            ...data,
            price: parseFloat(data.price),
            creator: {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL
            },
            status: 'pending',
            participationCount: 0,
            tags: data.tags.split(',').map(tag => tag.trim())
        }

        axiosSecure.post('/contests', contestData)
            .then(res => {
                if(res.data._id){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Contest Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/myCreatedContests');
                }
            })
    };

    const categories = ["Image Design", "Article Writing", "Marketing Strategy", "Digital Advertisement", "Gaming Review", "Book Review", "Business Idea", "Movie Review"];

    return (
        <div className="w-full max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-4xl font-bold mb-10 text-center">Add New Contest</h2>
            <div className="bg-base-100 p-10 rounded-2xl shadow-2xl border border-base-200">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* Basic Information */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b pb-2 text-primary">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label font-semibold">Contest Name</label>
                                <input type="text" placeholder="Contest Name" {...register("name", { required: true })} className="input input-bordered w-full focus:input-primary" />
                                {errors.name && <span className="text-error text-sm mt-1">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold">Image URL</label>
                                <input type="text" placeholder="https://..." {...register("image", { required: true })} className="input input-bordered w-full focus:input-primary" />
                                {errors.image && <span className="text-error text-sm mt-1">Image URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold">Contest Type</label>
                                <select defaultValue="" {...register("type", { required: true })} className="select select-bordered w-full focus:select-primary">
                                    <option disabled value="">Select a category</option>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                                {errors.type && <span className="text-error text-sm mt-1">Type is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold">Deadline</label>
                                <Controller
                                    control={control}
                                    name="deadline"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <DatePicker
                                            className="input input-bordered w-full focus:input-primary"
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            placeholderText="Select deadline"
                                        />
                                    )}
                                />
                                {errors.deadline && <span className="text-error text-sm mt-1">Deadline is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold">Tags (Comma Separated)</label>
                                <input type="text" placeholder="Exp: Design, Business, Urgent" {...register("tags", { required: true })} className="input input-bordered w-full focus:input-primary" />
                                {errors.tags && <span className="text-error text-sm mt-1">At least one tag is required</span>}
                            </div>
                        </div>
                    </div>

                    {/* Rewards */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b pb-2 text-primary">Rewards & Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="form-control">
                                <label className="label font-semibold">Contest Price ($)</label>
                                <input type="number" step="0.01" placeholder="Entry fee" {...register("price", { required: true })} className="input input-bordered w-full focus:input-primary" />
                                {errors.price && <span className="text-error text-sm mt-1">Price is required</span>}
                            </div>
                             <div className="form-control">
                                <label className="label font-semibold">Prize Money</label>
                                <input type="text" placeholder="Price Money" {...register("prize", { required: true })} className="input input-bordered w-full focus:input-primary" />
                                {errors.prize && <span className="text-error text-sm mt-1">Prize details are required</span>}
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 border-b pb-2 text-primary">Detailed Description</h3>
                        <div className="space-y-6">
                            <div className="form-control">
                                <label className="label font-semibold">Description</label>
                                <textarea placeholder="Describe what the contest is about..." {...register("description", { required: true })} className="textarea textarea-bordered h-24 focus:textarea-primary"></textarea>
                                {errors.description && <span className="text-error text-sm mt-1">Description is required</span>}
                            </div>
                             <div className="form-control">
                                <label className="label font-semibold">Task Instruction</label>
                                <textarea placeholder="Step-by-step instructions for participants..." {...register("taskInstruction", { required: true })} className="textarea textarea-bordered h-32 focus:textarea-primary"></textarea>
                                {errors.taskInstruction && <span className="text-error text-sm mt-1">Instructions are required</span>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                        <button className="btn btn-primary btn-wide text-lg">Add Contest</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContest;
