const { getAllPosts } = require("../services/postService");

module.exports = async function (context, req) {
  context.log("createPost processing...");
  try {
    const posts = await getAllPosts();

    const response = posts
      ? {
          success: true,
          posts: posts,
        }
      : {
          success: false,
        };
    context.res = {
      status: 200,
      body: response,
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message,
    };
  }
};
