import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL + "/users/";

class AuthService {
	async login(loginData) {
		const response = await axios
			.post(API_URL + "login", loginData, {
				headers: {
					'Content-Type': 'application/json',
				}
			});
		if (response.data.accessToken) {
			localStorage.setItem("user", JSON.stringify(response.data));
		}
		return response.data;
	}

	logout() {
		localStorage.removeItem("user");
	}

	register(registerForm) {
		return axios.post(API_URL, registerForm);
	}

	getCurrentUser() {
		return JSON.parse(localStorage.getItem('user'), {
			headers: {
				'Content-Type': 'application/json',
			}
		});
	}
}

// eslint-disable-next-line
export default new AuthService();