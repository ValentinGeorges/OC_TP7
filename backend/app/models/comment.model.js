module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  
    return Comment;
};