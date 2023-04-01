const { deletePost } = require("../services/postService");

module.exports = async function (context, req) {
  context.log("deletePost processing...");
  try {
    const postId = req?.params?.id;

    if (!postId) {
      context.res = {
        status: 400,
        body: "Missing parametes",
      };
      return;
    }

    await deletePost(postId);

    context.res = {
      status: 200,
      body: "Item deleted",
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: err.message,
    };
  }
};
