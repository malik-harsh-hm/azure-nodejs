const { getPostById } = require("../services/postService");

module.exports = async function (context, req) {
  context.log("getPost processing...");
  try {
    context.log(req.params);
    const postId = req?.params?.id;
    if (!postId) {
      context.res = {
        status: 400,
        body: "Missing parameter id",
      };
      return;
    }

    const post = await getPostById(postId);

    const response = post
      ? {
          success: true,
          post: post,
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
