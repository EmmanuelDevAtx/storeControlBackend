export const databaseFactory = async () => ({
  uri: process.env.MONGO_URL || 'mongodb://mongodb:27017',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
