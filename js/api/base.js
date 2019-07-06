import fetchClient from "./fetchClient.js";
import AppConstants from "../appConstants.js";

class Base {
    // getAll() {
    //     const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
    //     return fetchClient.get(url);
    // }
    getAll (params) {
        const url = `${AppConstants.API_URL}/${this.getResourceName()}`;
        const defaultParams = { _page: AppConstants.DEFAULT_PAGE, _limit: AppConstants.DEFAULT_LIMIT};
        if(params){    
            return fetchClient.get(url,params);
        }
        else {
            return fetchClient.get(url,defaultParams)
        }
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