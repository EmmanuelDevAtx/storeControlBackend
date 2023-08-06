export const databaseFactory = async () => ({
  uri: 'mongodb://mongodb:27017',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
