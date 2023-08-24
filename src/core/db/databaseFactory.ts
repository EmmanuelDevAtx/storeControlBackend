export const databaseFactory = async () => ({
  uri: process.env.MONGO_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
