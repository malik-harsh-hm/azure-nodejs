const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.AZURE_COSMOS_ENDPOINT;
const key = process.env.AZURE_COSMOS_KEY;

//Create an instance of CosmosClient
const client = new CosmosClient({ endpoint, key });

const databaseId = "PostsDB";
const containerId = "Posts";

const database = client.database(databaseId);

const container = database.container(containerId);

const createPost = async (item) => {
  const { resource: result } = await container.items.create(item);
  return result;
};

const getAllPosts = async () => {
  // await container.items.readAll().fetchAll();
  const { resources: result } = await container.items
    .query("SELECT c.id, c.title FROM c")
    .fetchAll();

  return result;
};

const getPostById = async (id) => {
  const querySpec = {
    query: "SELECT c.id, c.title FROM c WHERE  c.id = @id",
    parameters: [
      {
        name: "@id",
        value: id,
      },
    ],
  };

  const { resources: result } = await container.items
    .query(querySpec)
    .fetchAll();

  if (result.length === 1) {
    return result[0];
  } else {
    throw new Error("Data not found");
  }
};

const updatePost = async (id, item) => {
  // const item = container.item(id);
  // item.foo = "bar";
  // await item.replace(item);

  const existingItem = await getPostById(id);
  if (!existingItem) {
    throw new Error("Data not found");
  }
  let newItem = existingItem;
  newItem.title = item.title;

  const { resource: result } = await container.items.upsert(newItem);
  return result;
};

const deletePost = async (id) => {
  try {
    const item = container.item(id, id);
    await item.delete();
  } catch (err) {
    throw err;
  }
};

module.exports.createPost = createPost;
module.exports.getAllPosts = getAllPosts;
module.exports.getPostById = getPostById;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
