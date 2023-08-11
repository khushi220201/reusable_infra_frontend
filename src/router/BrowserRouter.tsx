import { AuthLayout } from 'components/Global/AuthLayout';
import GlobalLayout from 'layouts/Global';
import { ForgotPassword,Home, Login, ResetPassword } from 'pages';
import Roles from 'pages/settings/roles';
import Settings from 'pages/settings/settings';
import Users from 'pages/settings/users';
import Register from 'pages/Register';
import { createBrowserRouter } from 'react-router-dom';
import Integrations from 'pages/settings/integrations';
import Subcription from 'pages/settings/subscription';
import SelectConnection from 'pages/settings/SelectConnection';
import Connection from 'pages/settings/Connection';

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
					}
					,
					{
						
						path: '/settings/roles',
						element: <Roles />
					},
					{
						
						path: '/settings/integrations',
						element: <Integrations />
					},
					{
						
						path: '/settings/selectconnection',
						element: <SelectConnection />
					},
					{
						
						path: '/settings/connections',
						element: <Connection />
					},
					{
						
						path: '/settings/subscription',
						element: <Subcription />
					}
				]
			},
			
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
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
