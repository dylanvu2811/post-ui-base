'use strict';
import postApi from './api/postApi.js';
import utils from "./utils.js";
import AppConstants from "./appConstants.js";

const handleClickRemoveItem = async (post) => {
    const confirmMessage = `Do you want remove post ${post.title}`;
    if (window.confirm(confirmMessage)) {
      await postApi.remove(post.id);

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
const renderPostsList = (postList) => {
  const getPostsList = () => document.querySelector('ul#postsList');
  const postsListElement = getPostsList();

  if (postsListElement) {
      for (const post of postList) {
        const postItem = buildPostItem(post);
        postsListElement.appendChild(postItem);
      }
  }
};

const getPostList = async() => {
  const searchParams = new URLSearchParams(window.location.search)   
  
  const _page = searchParams.get('_page');
  const _limit = searchParams.get('_limit');
   
  const searchString = {
      _page: _page?_page:AppConstants.DEFAULT_PAGE,
      _limit: _limit?_limit:AppConstants.DEFAULT_LIMIT,
      _sort: 'updatedAt',
      _order: 'desc',
    };

  const postListItem = await postApi.getAll(searchString);

  return postListItem;
}

const getPageList = (pagination) => {
  const { _limit, _totalRows, _page } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);
  //let prevPage = -1;
  let pageArray = [];

  // Return 0,0 if no page detected
  if (_page >= 1 && _page <= totalPages) {
    const isFirstPage = _page === 1? 0 : 1; //if first page, no "Prev" button, set it = 0
    const isLastPage = _page === totalPages ? 0 : 1;
    pageArray.push(isFirstPage);
    for (let n=0;n < totalPages; n++){
      pageArray.push(n+1);
    }
    pageArray.push(isLastPage);
  }
  else {
    pageArray = [0,0];
  }
  return pageArray;
}

const renderPagination = (pagination) => {
  const postPagination = document.querySelector('#postsPagination');
  if (postPagination) {
    const pageList = getPageList(pagination);
    const { _page, _limit } = pagination;
    // Make sure there is 1 page or more
    if (pageList.length >= 3) {
      pageList.forEach((page,index) => {
        const pageElements = document.createElement('li');
        pageElements.classList.add('page-item');
        switch (index){
          case 0:
            // PrevButton
            pageElements.innerHTML = `<a class="page-link" href="?_page=${_page-1}&_limit=${_limit}" aria-label="Previous">&laquo;</a>`;
            if(_page===1) pageElements.classList.add('disabled'); // Disable Prev Button in first page
            break;
          case pageList.length-1:
            // NextButton
            pageElements.innerHTML = `<a class="page-link" href="?_page=${_page+1}&_limit=${_limit}" aria-label="Next">&raquo;</a>`;
            if(_page===(pageList.length-2)) pageElements.classList.add('disabled'); // Disable Next button in last page
            break;
          default:
            pageElements.innerHTML = `<a class="page-link" href="?_page=${page}&_limit=${_limit}">${page}</a>`;
            if(_page===page) pageElements.classList.add('active'); 
            break;
        }
        postPagination.appendChild(pageElements);
      });
      postPagination.removeAttribute('hidden');
      }
    }
};

// -----------------------
// MAIN LOGIC
// -----------------------
const init = async () => {
  // Write your logic here ....

    // Get post items
    const postList = await getPostList();
    renderPostsList(postList.data);

    // Get post pagination
    renderPagination(postList.pagination);

    // hidden loader
    const loader = document.querySelector('.bg-loader');
    loader.classList.add('invisible');

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
