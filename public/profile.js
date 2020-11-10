const addInfo = (res) => {
  const profile = document.querySelector(".profile");
  let html = "";
  html +=`
  <div class="hau-profile">
    <h1 class="name_profile1">${res.username}</h1>
  </div>
  <div class="img-profile">
    <img src="${res.profile_image.large}" />
  </div>
  <h1 class="name_profile2">${res.username}</h1>
  <div class="followerbox">
    <div class="numpost">
      <h5 class="follower-1">${res.total_photos}</h5>
      <p style="margin-top:-38%">posts</p>
    </div>
    <div class="numpost">
      <h5 class="follower-2">${res.followers_count} </h5>
      <p>followers</p>
    </div>
    <div class="numpost">
      <h5 class="follower-3">${res.following_count} </h5>
      <p>following</p>
    </div>
  </div>
  
  <h5 class="biobox">${res.bio}<h5>
  
  `;

  profile.innerHTML = html;
};

const callAPI = async (username) => {
  try {
    console.log("username --> ", username);
    const response = await fetch("/api/searchUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
//6. Add images to gallery
    addInfo(res);
  } catch (error) {
    console.log("message error --->", error);
  }
};

const addphoto = (res) => {
  const photo = document.querySelector(".photo");
  let html = "";
  res.forEach((element) => {
  html +=`
  <div class="photo-colum">
    <div class="photo-card">
      <img src="${element.urls.regular}"/>
      <span class="photo__icon">
          <i class="fa fa-heart-o heart fa-lg"></i>
          <i class="fa fa-comment-o fa-lg"></i>
      </span>
      <h1 id="likes-pro">${element.likes} likes</h1>
      <br>
    </div>
  </div>
  `;
});
  photo.innerHTML = html;
};
const callAPIphoto = async (username) => {
  try {
    console.log("username --> ", username);
    const response = await fetch("/api/searchPhoto", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const res = await response.json();
    //check response return from our API
    console.log("response ----> ", res);
//6. Add images to gallery
    addphoto(res);
  } catch (error) {
    console.log("message error --->", error);
  }
};



const main = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if(urlParams.has('username')){
      const username = urlParams.get('username');
      console.log('username -->', username);
      callAPI(username);
      callAPIphoto(username);
  }
  else{
      console.log('Username is missing');
  }
};
 
main();

