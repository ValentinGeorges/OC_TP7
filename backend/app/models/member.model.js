module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("Member", {
      email: {
        type: Sequelize.STRING(40),
        allowNull : false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      accessToken : {
        type : Sequelize.STRING,
        allowNull : true,
        unique: true
      }
    });
    return Member;
  };