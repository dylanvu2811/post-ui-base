'use strict';
import AppConstants from './appConstants.js';
import postApi from './api/postApi.js';

const getPostList = () => {
  const options = {
    method:'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  return fetch('https://js-post-api.herokuapp.com/api/posts', options)
    .then(reponse => {
      // console.log(reponse);
      if(reponse.status >= 200 && reponse.status < 300){
        // reponse.json().then(data => console.log(data));
        return reponse.json();
      }
    });
};

// getPostList().then(data => console.log(data));


const getPostListAsync = async () => {
  const options = {
    method:'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const reponse = await fetch('https://js-post-api.herokuapp.com/api/posts', options)
    if(reponse.status >= 200 && reponse.status < 300){
      return reponse.json();
    }
};
const getPostDetail = async (postId) => {
  const options = {
    method:'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const url = `${AppConstants.API_URL}/posts/${postId}`;
  const reponse = await fetch(url, options)
    if(reponse.status >= 200 && reponse.status < 300){
      return reponse.json();
    }
};

const updatePost = async (post) => {
  const options = {
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(post),
  }
  const url = `${AppConstants.API_URL}/posts/${post.id}`;
  const reponse = await fetch(url, options)
    if(reponse.status >= 200 && reponse.status < 300){
      const data = await reponse.json();
      return data;
    }
};

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  // Write your logic here ....
  // const data = await getPostListAsync();
  // console.log(data);

  // const post = await getPostDetail('1356b24a-8b63-41dc-9bbe-1bfd5f4a219a');
  // console.log(post);
  // post.author = 'duong';
  // const updatedPost = await updatePost(post);
  // console.log('gia tri:', updatedPost);

  const postList = await postApi.getAll();
  console.log(postList);
};

init();
