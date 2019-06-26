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

const handleChangeImg = () => {
    // random id img
    const randomIdImg = Math.floor(Math.random() * 101);

    // new img url
    const imgURL = `https://picsum.photos/id/${randomIdImg}/1368/400`;

    // update background img
    utils.setBackgroundImageByElementId('postHeroImage', imgURL);
   
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

    // add event click change img post
    const btnChangeImg = document.querySelector('#postChangeImage');
    if(btnChangeImg){
        btnChangeImg.addEventListener('click', handleChangeImg);
    }
    //  console.log(postInfo);
};

init();