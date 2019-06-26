'use strict';
import postApi from './api/postApi.js';
import utils from "./utils.js";


const setValuesPost = (postInfo) => {
    // set title
    utils.setValueByElementId('postTitle', postInfo.title);

    // set author
    utils.setValueByElementId('postAuthor', postInfo.author);

    // set desc
    utils.setValueByElementId('postDescription', postInfo.description);

    // set img
    utils.setBackgroundImageByElementId('postHeroImage', postInfo.imageUrl);
} 
// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
    // Write your logic here ....
    // console.log('edit');

    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId');
    const postInfo = await postApi.getDetail(postId);
    setValuesPost(postInfo);
    //  console.log(postInfo);
};

init();