'use strict';
import postApi from './api/postApi.js';
import utils from "./utils.js";

const handleClickRemoveItem = async (post) => {
    const confirmMessage = `Do you want remove post ${post.title}`;
    if (window.confirm(confirmMessage)) {
      await postApi.remove(post.id);
      // console.log('test');

      // reload page
      window.location.reload();
    }
}

// create a element
const buildPostItem = (post) => {
  const postItemTemplate = document.querySelector('#postItemTemplate');
  const postItemFragment = postItemTemplate.content.cloneNode(true);
  const postItem = postItemFragment.querySelector('li');

  // set images
  const imagesItem = postItemFragment.querySelector('#postItemImage');
  if (imagesItem) {
    imagesItem.src = post.imageUrl;
  }

  // set title
  const titleItem = postItemFragment.querySelector('#postItemTitle');
  if (titleItem) {
    titleItem.innerText = post.title;
  }

  // set desc
  const descItem = postItemFragment.querySelector('#postItemDescription');
  if (descItem) {
    descItem.innerText = utils.truncateTextlength(post.description, 110);
  }

  // set author
  const authorItem = postItemFragment.querySelector('#postItemAuthor');
  if (authorItem) {
    authorItem.innerText = post.author;
  }

  // set date
  const timeItem = postItemFragment.querySelector('#postItemTimeSpan');
  if (timeItem) {
    const timeString = ` - ${utils.formatDate(post.updatedAt)}`;
    timeItem.innerText = timeString;
  }

  // add event click view detail
  const postItemElement = postItemFragment.querySelector('.post-item');
  postItemElement.addEventListener('click',() => {
    const postURL = `post-detail.html?postId=${post.id}`;
    window.location = postURL;
  });

  // add event remove
  const iconRemove = postItemFragment.querySelector('#postItemRemove');
  iconRemove.addEventListener('click',(e) => {
    handleClickRemoveItem(post);
    e.stopPropagation();
  });

  // add event click edit item
  const iconEdit = postItemFragment.querySelector('#postItemEdit');
  iconEdit.addEventListener('click', (e) => {
    const editURL = `add-edit-post.html?postId=${post.id}`;
    window.location = editURL;
    e.stopPropagation();
  });

  return postItem;
};


//  create a list posts
const renderPostsList = (postsList) => {
  const getPostsList = () => document.querySelector('ul#postsList');
  const postsListElement = getPostsList();

  if (postsListElement) {
      for (const post of postsList) {
        const postItem = buildPostItem(post);
        postsListElement.appendChild(postItem);
      }
  }
};

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  // Write your logic here ....
  const postList = await postApi.getAll();
  // console.log(postList);

  renderPostsList(postList);

  anime({
    targets: '#postsList li',
    translateY: [
      { value: 100, duration: 0 },
      { value: 0, duration: 500 },
    ],
    delay: anime.stagger(100),
    easing: 'linear'
  });
};

init();
