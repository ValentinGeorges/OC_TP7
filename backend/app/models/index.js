const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.members = require("./member.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

// sequelize.sync({force: true});

db.members.hasMany(db.posts, { foreignKey: { allowNull: false } });
db.posts.belongsTo(db.members, { foreignKey: { allowNull: false } });

db.members.hasMany(db.comments, { foreignKey: { allowNull: false } });
db.posts.hasMany(db.comments, { foreignKey: { allowNull: false } });
db.comments.belongsTo(db.members, { foreignKey: { allowNull: false } });
db.comments.belongsTo(db.posts, { foreignKey: { allowNull: false } });

module.exports = db;