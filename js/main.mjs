'use strict';
import postApi from './api/postApi.js';

// create a element
const buildPostItem = (post) => {
  const postItemTemplate = document.querySelector('#itemPost');
  const postItemFragment = postItemTemplate.content.cloneNode(true);
  const postItem = postItemFragment.querySelector('li');

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

  renderPostsList(postList);
};

init();
