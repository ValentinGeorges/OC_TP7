module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Post", {
      title: {
        type: Sequelize.STRING(60),
        allowNull : false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    return Post;
};