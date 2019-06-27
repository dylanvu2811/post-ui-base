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
const handleFormEditSubmit = (postId) => {
    console.log('submit');
}

const editViewDetail = (postId) => {
    const viewDetail = document.querySelector('#goToDetailPageLink');
    if(viewDetail) {
        viewDetail.href = `post-detail.html?postId=${postId}`;
        viewDetail.innerHTML = '<i class="fas fa-eye"></i> View Post';
    }
}
// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
    // Write your logic here ....
    // console.log('edit');

    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId');
    const thisIsPage = !!postId;
    if(thisIsPage) {
        const postInfo = await postApi.getDetail(postId);
        setValuesPost(postInfo);

        // add event click change img post
        const btnChangeImg = document.querySelector('#postChangeImage');
        if(btnChangeImg){
            btnChangeImg.addEventListener('click', handleChangeImg);
        }
        // add event submit form edit
        const formEditSubmit = document.querySelector('#postForm');
        if(formEditSubmit){
            formEditSubmit.addEventListener('submit', (e) => {
                handleFormEditSubmit(postId);
            });
        }

        // handle view detail post
        editViewDetail(postId);

    }else{
        console.log('page add');
    }
};

init();