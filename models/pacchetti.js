'use strict';
module.exports = (sequelize, DataTypes) => {
    var Pacchetti = sequelize.define('sa_pacchetti', {
        SPK_ID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(10).UNSIGNED
        },
        SPK_SU_CREATOR_ID: {
            allowNull: false,
            type: DataTypes.INTEGER(10)
        },
        SPK_SU_OWNER_ID: {
            allowNull: false,
            type: DataTypes.INTEGER(10)
        },
        SPK_CREATED: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW()
        },
        SPK_EXPIRE: {
            type: DataTypes.DATEONLY,
        },
        SPK_SKS_COUNT: {
            type: DataTypes.INTEGER(11),
            defaultValue: "0"
        },
        SPK_USED_SKS_COUNT: {
            type: DataTypes.INTEGER(11),
            defaultValue: "0"
        }
    }, {
            timestamps: false,
            paranoid: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'sa_pacchetti',
        });
    Pacchetti.associate = function (models) {
        // associations can be defined here
    };
    return Pacchetti;
};
