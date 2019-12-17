export default {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/cookbook',
  SECRET_TOKEN: 'claveSuperSecreta'
};