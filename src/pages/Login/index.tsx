import { LoginLayoutBody } from 'components/Login';
import { LoginLayout } from 'layouts';
import { FORMDATA } from 'constants/Data';
import { loginAction } from 'redux/slice/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCompanies } from 'redux/slice/companySlice';
import { useState } from 'react';
import { fetchProfileAction } from 'redux/action/profileAction';

// Login page
const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (values: any) => {
		setIsLoading(true);
		dispatch(loginAction(values) as any)
			.unwrap()
			.then((res: any) => {
				dispatch(fetchProfileAction() as any).then(() => {
					setIsLoading(false);
					dispatch(getCompanies(res));
					navigate('/');
				});
			})
			.catch(() => {
				setIsLoading(false);
				navigate('/login');
			});
	};
	// JSX
	return (
		<LoginLayout>
			<LoginLayoutBody
				title="Log in"
				description="<p>
							Welcome to <strong> Animal Planet! </strong>Please Enter your
							Details.
						</p>"
				formData={FORMDATA.loginFields}
				buttonTitle={'Sign in'}
				action={loginAction}
				redirectUrl="/forgot-password"
				redirectText="Forgot password?"
				btnIntuit={'Sign in with Intuit'}
				btnXero={'Sign in with Xero'}
				rememberMe={'Remember me'}
				onSubmit={onSubmit}
				isLoading={isLoading}
				accountText={" Don't have an account yet?"}
				accountUrl={'Sign up Today!'}
			></LoginLayoutBody>
		</LoginLayout>
	);
};

export default Login;
