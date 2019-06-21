import fetchClient from "./fetchClient.js";
import AppConstants from "../appConstants.js";

class PostApi {
    getResourceName() {
        return 'posts';
    }
    getAll() {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
        fetchClient.get(url);
    }

    getDetail(id) {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}/${id}`;
        fetchClient.get(url);
    }

    add(post) {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
        fetchClient.post(url, post);
    }

    update(post) {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}/${post.id}`;
        fetchClient.patch(url, post); 
    }

    remove(id) {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}/${id}`;
        fetchClient.delete(url);
    }
}
const postApi = new PostApi();
export default postApi;