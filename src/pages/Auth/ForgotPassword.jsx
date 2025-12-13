import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ForgotPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { resetPassword } = useAuth();
    const preFilledEmail = location.state?.email || "";

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: preFilledEmail
        }
    });

    const onSubmit = (data) => {
        resetPassword(data.email)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Email Sent',
                    text: 'Password reset link sent to your email.',
                    confirmButtonText: 'Go to Login'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Open Gmail in a new tab
                        window.open("https://mail.google.com", "_blank");
                        navigate("/login");
                    }
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                });
            });
    };

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col md:flex-row-reverse">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl font-bold">Reset Password</h1>
                    <p className="py-6">Enter your email address to receive a password reset link.</p>
                </div>
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                {...register("email", { required: true })} 
                                placeholder="email" 
                                className="input input-bordered w-full" 
                            />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Reset Password" />
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPassword;
