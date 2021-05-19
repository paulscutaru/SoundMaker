module.exports= (sequelize,DataTypes) => {
    const Sounds = sequelize.define('Sounds',{
        instrument:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        data:{
            type:DataTypes.JSON,
            allowNull:false,
        },
        effects:{
            type:DataTypes.JSON,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        shared:{
            type:DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });

    return Sounds;
};