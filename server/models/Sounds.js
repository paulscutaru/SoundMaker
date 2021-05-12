module.exports= (sequelize,DataTypes) => {
    const Sounds = sequelize.define('Sounds',{
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