const { createPost } = require("../services/postService");

module.exports = async function (context, req) {
  context.log("createPost processing...");
  try {
    // Read incoming data
    if (!req.body) {
      context.res = {
        status: 400,
        body: "Please pass a request body",
      };
      return;
    }
    const title = req.body.title;
    // fail if incoming data is required
    if (!title) {
      context.res = {
        status: 400,
        body: "Please pass a title",W
      };
      return;
    }

    let postItem = {
      title: title,
    };

    const createdPost = await createPost(postItem);

    const response = createdPost
      ? {
          success: true,
          id: createdPost.id,
        }
      : {
          success: false,
          id: null,
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
