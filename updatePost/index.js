const { updatePost } = require("../services/postService");

module.exports = async function (context, req) {
  context.log("updatePost processing...");
  try {
    const postId = req?.params?.id;
    const body = req?.body;

    if (!postId || !body) {
      context.res = {
        status: 400,
        body: "Missing parametes",
      };
      return;
    }

    const post = await updatePost(postId, body);

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
