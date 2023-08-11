import { LoginLayoutBody } from 'components/Login';
import { FORMDATA } from 'constants/Data';
import { LoginLayout } from 'layouts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from 'redux/apis';
import { loginAction } from 'redux/slice/loginSlice';
import { toastText } from 'utils/utils';

// Login page
const ForgotPassword = () => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = (values: any) => {
		setIsLoading(true);
		postApi('/auth/forgot-password', values)
			.then((res) => {
				toastText(res?.data?.message, 'success');
				setIsLoading(false);
				navigate('/login');
			})
			.catch((err) => {
				setIsLoading(false);
				toastText(err?.response?.data?.message, 'error');
			});
	};

	// JSX
	return (
		<LoginLayout>
			<LoginLayoutBody
				title="Forgot Password"
				formData={FORMDATA.forgotPassword}
				buttonTitle={'Verify'}
				description="Please Enter your Registered Email Address, we will
send reset password link there."
				redirectUrl="/login"
				redirectText="Back to login "
				action={loginAction}
				onSubmit={onSubmit}
				isLoading={isLoading}
			></LoginLayoutBody>
		</LoginLayout>
	);
};

export default ForgotPassword;
