
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('tracks', {
    AlbumId: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    href: DataTypes.STRING,
    name: DataTypes.STRING,
    popularity: DataTypes.INTEGER,
  }, {
    timestamps: false,
  }, {
    classMethods: {
      associate() {},
    },
  });
  return Track;
};