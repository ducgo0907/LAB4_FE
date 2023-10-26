// src/routes.js
import { Outlet } from 'react-router-dom';
import Home from './page/Home';
import AddProduct from './page/AddProduct';
import LoginForm from './page/Login';
import ShoppingCart from './page/Cart';
import ProductDetail from './page/ProductDetail';
import ListComment from './page/ListComment';

const routes = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: 'add',
		element: <AddProduct />,
	},
	{
		path: 'login',
		element: <LoginForm />
	},
	{
		path: 'carts',
		element: <ShoppingCart />
	},
	{
		path: 'detail/:id',
		element: <ProductDetail />
	},
	{
		path: ':id/comments',
		element: <ListComment />
	}
];

export { routes, Outlet };
