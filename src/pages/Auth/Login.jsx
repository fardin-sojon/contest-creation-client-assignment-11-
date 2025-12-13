import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion } from "framer-motion";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                })
            })
    };

    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = async () =>{
        try {
            const result = await googleSignIn();
            const user = result.user;

            let email = user.email;
            let displayName = user.displayName;
            let photoURL = user.photoURL;

            if (!email && user.providerData && user.providerData.length > 0) {
                 email = user.providerData[0].email;
                 displayName = displayName || user.providerData[0].displayName;
                 photoURL = photoURL || user.providerData[0].photoURL;
            }

            if(!email) {
                throw new Error("Could not retrieve email from Google Account. Please try another account or check your privacy settings.");
            }

            const userInfo = {
                email: email,
                name: displayName,
                image: photoURL,
                role: 'user'
            }
            
            const res = await axiosPublic.post('/users', userInfo);
            
            Swal.fire({
                title: 'User Login Successful.',
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' }
            });
            
            navigate(from, { replace: true });

        } catch (error) {
            console.error("Google Sign-In Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message,
            });
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col md:flex-row-reverse">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Join ContestHub to participate and win existing prizes.</p>
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
                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered w-full" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    {...register("password", { required: true })} 
                                    placeholder="password" 
                                    className="input input-bordered w-full" 
                                />
                                <span className="absolute top-4 right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && <span className="text-red-600">Password is required</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className="text-center mb-4">
                        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                    </div>
                    <p className="text-center my-4">New here? <Link className="text-orange-600 font-bold" to="/register">Create a New Account</Link> </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
