import postApi from "./api/postApi.js";
import utils from "./utils.js";

const renderPost = (post) => {
    //set banner
    utils.setBackgroundImageByElementId('postHeroImage', post.imageUrl);
    // set title
    utils.setTextByElementId('postDetailTitle', post.title);
    // set author
    utils.setTextByElementId('postDetailAuthor', post.author);
    // set date time
    const dateString = ` - ${utils.formatDate(post.updatedAt)}`;
    utils.setTextByElementId('postDetailTimeSpan', dateString);
    //  set desc
    utils.setTextByElementId('postDetailDescription', post.description);
}
const renderEditLink = (post) => {
    const editLink = document.querySelector('#goToEditPageLink');
    if(editLink) {
        editLink.href = `add-edit-post.html?postId=${post.id}`;
        editLink.innerHTML = '<i class="fas fa-edit"></i> Edit post';
    }
}
// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
    // Write your logic here ....
    try {
        // Retrieve postId form query params
        const params = new URLSearchParams(window.location.search);
        const postId = params.get('postId');
        if (!postId) return;
        // Fetch post detail by id
        const post = await postApi.getDetail(postId);
        // render post
        renderPost(post);
        // update edit link
        renderEditLink(post);



    } catch (error) {
        console.log(error);
    }
  
  };
  
  init();