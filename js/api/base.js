import fetchClient from "./fetchClient.js";
import AppConstants from "../appConstants.js";

class Base {
    getAll() {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
        return fetchClient.get(url);

    }

    getDetail(id) {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}/${id}`;
        return fetchClient.get(url);
    }

    add(post) {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
        return fetchClient.post(url, post);
    }

    update(post) {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}/${post.id}`;
        return fetchClient.patch(url, post); 
    }

    remove(id) {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}/${id}`;
        return fetchClient.delete(url);
    }
}

export default Base;