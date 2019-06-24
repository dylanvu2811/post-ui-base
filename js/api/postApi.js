import base from "./base.js";

class PostApi extends base {
    getResourceName() {
        return 'posts';
    }



}
const postApi = new PostApi();
export default postApi;