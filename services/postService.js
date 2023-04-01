const CosmosClient = require("@azure/cosmos").CosmosClient;

const endpoint = process.env.AZURE_COSMOS_ENDPOINT;
const key = process.env.AZURE_COSMOS_KEY;

const client = new CosmosClient({ endpoint, key });

const databaseId = "PostsDB";
const containerId = "Posts";

const database = client.database(databaseId);

const container = database.container(containerId);

const createPost = async (item) => {
  const { resource } = await container.items.create(item);
  return resource;
};

module.exports.createPost = createPost;
