import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaGithub, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Login;

function Login() {
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                const returnUrl = router.query.returnUrl || '/Search';
                router.push(returnUrl);
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
				<div className="bg-white rounded-2xl flex shadow-2xl w-4/5 max-w-4xl">
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
						<div className="flex flex-col items-center mb-3">
							<div className="bg-white w-64 p-2 flex items-center">
								<FaRegEnvelope className="text-gray-400 m-2" />
								<input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
							</div>
						</div>
						<div className="flex flex-col items-center mb-3">
							<div className="bg-white w-64 p-2 flex items-center">
								<MdLockOutline className="text-gray-400 m-2" />
								<input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
							</div>
							<div className="flex justify-between w-64 mb-5">
								<label className="flex items-center text-xs"><input type="checkbox" name="remember" className="mr-1"/>
									Remember me
								</label>
								<a href="https://www.google.com" className="text-l">GO TO MAIN PAGE</a>
							</div>

							<button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Log In (Not fully functional yet, click on 'GO TO MAIN PAGE')
              </button>
						</div>			
						</form>

					</div>
				</div>
				<div className="w-3/5 bg-blue-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
					<h2 className="text-3xl font-bold mb-2">Sign up today!</h2>
					<div className="border-2 w-10 border-white inline-block mb-2"></div>
					<p className="mb-10">Find your dream college with us</p>
					<Link href="/account/register" className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-600">Sign Up</Link>
				</div>
			</div>

			</main>
      </Layout>
    );
}
