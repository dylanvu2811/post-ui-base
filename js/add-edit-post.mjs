'use strict';
import postApi from './api/postApi.js';
import utils from "./utils.js";
import AppConstants from './appConstants.js';

// form validation
const validateForm = () => {

    const title = document.querySelector('#postTitle');
    const author = document.querySelector('#postAuthor');
    let isValid = true;

    // title & author is required
    if (!title.value) {
        title.classList.add('is-invalid');
        isValid = false;
    } else if (!author.value) {
        author.classList.add('is-invalid');
        isValid = false;
    }

    return isValid;
}
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
    const imgURL = `https://picsum.photos/id/${randomIdImg}/${AppConstants.DEFAULT_IMAGE_WIDTH}/${AppConstants.DEFAULT_IMAGE_HEIGHT}`;

    // update background img
    utils.setBackgroundImageByElementId('postHeroImage', imgURL);
    
}
// const postForm = document.querySelector('#postForm');

const getPostFormValue = () => {
    const formValue = {};

    const addForm = document.querySelector('#postForm');
    if (addForm) {
        const formControlNameList = ['title', 'author', 'description'];
        for (const controlName of formControlNameList) {
        const control = addForm.querySelector(`[name="${controlName}"]`);
            if(control){
                formValue[controlName] = control.value;
            }
        }
    }
    formValue.imageUrl = utils.getBackgroundImageByElementId('postHeroImage');

    return formValue;
};
const handleFormAddSubmit = async (e) => {
    e.preventDefault();
    const formValue = getPostFormValue();
    
    // form validation
    const isValid = validateForm();
    if (isValid) {

        try {
            const newPost = {
                ...formValue,
            };
            // add new post
            const addPost = await postApi.add(newPost);
        
            // go to edit page
            const viewEdit = `add-edit-post.html?postId=${addPost.id}`;
        
            window.location = viewEdit;

            alert('Add new post successfully');
            
          } catch (error) {
            alert('Save Failed ', error);
          }
    }
}
const handleFormEditSubmit = (postId) => {

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

    // add event click change img post
    const btnChangeImg = document.querySelector('#postChangeImage');
    if(btnChangeImg){
        btnChangeImg.addEventListener('click', handleChangeImg);
    }

    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId');
    const thisIsPage = !!postId;

    if(thisIsPage) {
        const postInfo = await postApi.getDetail(postId);
        setValuesPost(postInfo);
        // add event submit form edit
        const formEditSubmit = document.querySelector('#postForm');
        if(formEditSubmit){
            formEditSubmit.addEventListener('submit', (e) => {
                handleFormEditSubmit(postId);
            });
        }
        // handle view detail post
        editViewDetail(postId);

    } else {
        utils.setBackgroundImageByElementId('postHeroImage', AppConstants.DEFAULT_HERO_IMAGE_URL);
        const formAddSubmit = document.querySelector('#postForm');;

        if(formAddSubmit) {
            formAddSubmit.addEventListener('submit', handleFormAddSubmit);
        }
        console.log('page add');
    }
};

init();