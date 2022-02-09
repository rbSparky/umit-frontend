import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaGithub, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
			<div className="container max-w-2xl mx-auto pt-16 md:pt-32 text-center break-normal">
			   <p className="text-black font-extrabold text-3xl md:text-5xl">COLINFO
			   </p><br/>
			<p className="text-xl md:text-2xl text-gray-500"> Welcome to Colinfo </p>
			</div><br/><br/>
			
			<main className="flex flex-col items-center justify-center h-full w-full flex-1 px-2 text-center">
				<div className="bg-white rounded-2xl flex shadow-2xl w-full max-w-4xl justify-center">
				<div className="w-4/5 p-5">
					<div className="text-left font-bold"><span className="text-blue-500">COL</span>INFO</div>				
					<div className="py-10">
						<h2 className="text-3xl font-bold text-blue-500 mb-2">Sign in to you account</h2>
						<div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>
						<div className="flex justify-center my-2">
							<a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1"> 
								<FaGithub className="text-sm" />
							</a>
							<a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1"> 
								<FaGoogle className="text-sm" />
							</a>
						</div>
						<p className="text-gray-400 my-3">or use email account</p>
						
						<form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Register
                        </button>
                        <Link href="/account/login" className="btn btn-link">Cancel</Link>
                    </form>


					</div>
			</div>
			</div>
			</main>

        </Layout>
    );
}
