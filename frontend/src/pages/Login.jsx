import { Eye, EyeOff, Loader2, Mail, MessageSquare, Lock } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { toast } from 'react-toastify';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { login, isLoggingIn } = useAuthStore();

    const validateForm = () => {

        if (!formData.email.trim()) {
            toast.error('Email is required');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Invalid email format');
            return false;
        }
        if (!formData.password) {
            toast.error('Password is required');
            return false;
        }
        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm();
        if (success) {
            login(formData);
        }
    };


    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/* left side */}
            <div className='flex flex-col justify-center items-center p-6 sm:12'>
                <div className='w-full max-w-md space-y-8'>
                    {/* Logo */}
                    <div className='text-center mb-8'>
                        <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto  group-hover:bg-primary/20 transition-colors'>
                            <MessageSquare className='size-6 text-primary' />
                        </div>
                        <h1 className='text-2xl font-bold mt-2'>
                            Welcom Back
                        </h1>
                        <p className='text-base-content/60'>
                            Sign in to your account
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='space-y-6 max-w-[400px] w-full mb-3'>
                    <div className='w-full mb-3'>
                        <label className='label'>
                            <span className='label-text mb-1 font-semibold'>Email</span>
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Mail className='size-5 text-base-content/40 z-10' />
                            </div>
                            <input type="email" className={`input input-bordered w-full pl-10 focus:outline-0`} placeholder='John Doe' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                    </div>
                    <div className='w-full mb-3'>
                        <label className='label'>
                            <span className='label-text mb-1 font-semibold'>Password</span>
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='size-5 text-base-content/40 z-10' />
                            </div>
                            <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ?
                                    <Eye className='size-5 text-base-content/40 z-10' />
                                    :
                                    <EyeOff className='size-5 text-base-content/40 z-10' />
                                }
                            </div>
                            <input type={showPassword ? 'text' : 'password'} className={`input input-bordered w-full pl-10 focus:outline-0`} placeholder='******' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
                        {isLoggingIn ?
                            <>
                                <Loader2 className='size-5 animate-spin' />
                                Loading...
                            </> : 'Login'
                        }
                    </button>
                </form>
                <div className='text-center'>
                    <p className='text-base-content/60'>
                        Don't have an account? {" "}
                        <Link to='/signup' className='link link-primary'>
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side */}

            <AuthImagePattern
                title='Welcom Back!'
                subtitle='Sign in continue your conversations catch up with your messages'
            />

        </div>
    )
}

export default Login