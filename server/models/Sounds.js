module.exports= (sequelize,DataTypes) => {
    const Users = sequelize.define('Sounds',{
        description:{
            type: DataTypes.STRING,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    });

    Users.associate = (models) =>{
        Users.hasMany(models.Sounds,{
            onDelete: "cascade",
        });
    };
    return Users;
};