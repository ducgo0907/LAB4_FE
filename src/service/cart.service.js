import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BASE_URL + "/cart/";

class CartService {
	async create(userId) {
		const response = await axios.post(API_URL, { userId }, { headers: authHeader() });
		return response.data;
	}

	getAll() {
		return axios.get(API_URL);
	}

	addProduct({ productId, cartId, quantity }) {
		return axios.put(API_URL, { productId, cartId, quantity }, { headers: authHeader() });
	}

	updateCustomProduct({ productId, cartId, quantity }) {
		return axios.put(API_URL + "custom", { productId, cartId, quantity }, { headers: authHeader() });
	}

	removeProduct({ productId, cartId }) {
		return axios.put(API_URL + "/removeProduct", { productId, cartId }, { headers: authHeader() });
	}
}

// eslint-disable-next-line
export default new CartService();