import { AuthLayout } from 'components/Global/AuthLayout';
import GlobalLayout from 'layouts/Global';
import { ForgotPassword,Home, Login, ResetPassword } from 'pages';
import Roles from 'pages/settings/roles';
import Settings from 'pages/settings/settings';
import Users from 'pages/settings/users';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{
				path: '/',
				element: <GlobalLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
				],
			},
			{
				path: '/settings',
				element: <Settings />,
				children: [
					{
						index:true,
						path: '/settings/users',
						element: <Users />
					},{
						
						path: '/settings/roles',
						element: <Roles />
					}
				]
			},
			
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/reset-password',
				element: <ResetPassword />,
			},
			{
				path: '/forgot-password',
				element: <ForgotPassword />,
			},
		],
	},
]);

export default router;
