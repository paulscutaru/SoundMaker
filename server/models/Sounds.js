module.exports= (sequelize,DataTypes) => {
    const Users = sequelize.define('Sounds',{
        description:{
            type: DataTypes.STRING,
        },
    });

    Users.associate = (models) =>{
        Users.hasMany(models.Sounds,{
            onDelete: "cascade",
        });
    };
    return Users;
};