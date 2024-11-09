function delay(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

function fetchProfile(){
    return delay(1000).then(()=>{
        if (Math.random() > 0.8){
            return Promise.reject(new Error("Failed to fetch Proflie"));
        }
        return {name: "Beyonce", age: 500};
    })
}

function fetchPosts() {
    return delay(1500).then(() =>{
        if(Math.random() > 0.8){
            return Promise.reject(new Error("Failed to fetch Pos5s"))
        }
        return [{post: 1, caption: "Went to paris!"}];
    })
}

function fetchComments(){
    return delay(1000).then(() => {
        if (Math.random() > 0.8){
            return Promise.reject(new Error("Failed to fetch comments"));
        }
        return [{num: 1, comment: "Eiffel Toweer!"}, {num: 2, comment: "crossant"}];
    })
}

async function sequential(){
    try{
        console.log("Sequential Fething: ")

        const profile = await fetchProfile();
        console.log("(Sequential) Profiel retrieved: ", profile)

        const posts = await fetchPosts();
        console.log("(Sequential) Posts retrieved: ", posts)

        const comments = await fetchComments();
        console.log("(Sequential) Comments retrieved: ", comments)
    } catch (error){
        console.error("Could not retirve sequential data")
    }
}

async function parallel() {
    try {
        console.log("Paralel Fetching:");

        const [profile, posts, comments] = await Promise.all([
            fetchProfile(),
            fetchPosts(),
            fetchComments()
        ]);

        console.log("(Parallel) Profile retrived:", profile);
        console.log("(Parallel) Posts reitevd:", posts);
        console.log("(Parallel) Comments retrieved:", comments);

    } catch(error) {
        console.error("Could not retrieve parallel data: ", error);
    }
}

async function fetchProfileAsynch() {
    try {
      return await fetchProfile();
    } catch (error) {
      throw new Error("Profile Error");
    }
  }

  async function fetchPostsAsynch() {
    try {
      return await fetchPosts();
    } catch (error) {
      throw new Error("Posts Error");
    }
  }

  async function fetchCommentsAsynch() {
    try {
      return await fetchComments();
    } catch (error) {
      throw new Error("Commenets Error");
    }
  }

  async function getUserContent() {
    try {
        console.log("Fetching user content: ");

        const profile = await fetchProfile();
        console.log("(Async) Profile retrieved:", profile);

        const posts = await fetchPosts();
        console.log("(Async) Posts retrieved:", posts);

        for (const post of posts) {
            const comments = await fetchComments();
            console.log(`(Async) Comments for post ${post.post}:`, comments);
        }
    } catch(error) {
        console.error("Error fetching user content:", error);
    }
}

sequential();
parallel();
getUserContent();