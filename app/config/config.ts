export default {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://db:27017/cookbook',
  SECRET_TOKEN: 'claveSuperSecreta'
};