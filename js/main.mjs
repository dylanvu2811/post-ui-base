'use strict';
import postApi from './api/postApi.js';
import utils from "./utils.js";

// create a element
const buildPostItem = (post) => {
  const postItemTemplate = document.querySelector('#itemPost');
  const postItemFragment = postItemTemplate.content.cloneNode(true);
  const postItem = postItemFragment.querySelector('li');

  // set images
  const imagesItem = postItemFragment.querySelector('.card img');
  if (imagesItem) {
    imagesItem.src = post.imageUrl;
  }

  // set title
  const titleItem = postItemFragment.querySelector('h5.card-title');
  if (titleItem) {
    titleItem.innerText = post.title;
  }

  // set desc
  const descItem = postItemFragment.querySelector('.card-text');
  if (descItem) {
    descItem.innerText = utils.truncateTextlength(post.description, 110);
  }

  // set author
  const authorItem = postItemFragment.querySelector('small:nth-child(2)');
  if (authorItem) {
    authorItem.innerText = post.author;
  }

  // set date
  const timeItem = postItemFragment.querySelector('small:nth-child(3)');
  if (timeItem) {
    const timeString = ` - ${utils.formatDate(post.updatedAt)}`;
    timeItem.innerText = timeString;
  }

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
};

init();
