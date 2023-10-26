import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_BASE_URL + "/comment/";

class CommentService {
	addComment(formComment) {
		return axios.post(API_URL + '/', formComment, { headers: authHeader() });
	}
}

// eslint-disable-next-line
export default new CommentService();