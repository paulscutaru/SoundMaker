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
        description:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    });

    return Sounds;
};