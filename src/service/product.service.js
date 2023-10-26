import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BASE_URL + "/products/";

class ProductService {
	detail(id) {
		return axios.get(API_URL + 'detail/' + id);
	}

	getComments(id) {
		return axios.get(`${API_URL}${id}/comments`);
	}
}

// eslint-disable-next-line
export default new ProductService();