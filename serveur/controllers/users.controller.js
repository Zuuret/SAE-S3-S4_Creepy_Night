const { v4 : uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const userService = require("../services/users.services.pg");
const {FALSE} = require("pg-format/lib/reserved");

exports.saveUser = async (req,res) => {
    const id = uuidv4();
    const name = req.body.name;
    const firstname = req.body.firstname;
    const birthdate = req.body.birthdate;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);
    const solde = 0;
    const num_cashless = uuidv4();
    const qr_code = 'null';
    const est_festivalier = FALSE;
    const resultat = await userService.insertUser(id,name,firstname,birthdate,email,password,solde,num_cashless,qr_code,est_festivalier);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

/*
exports.getUsers = async(req,res) => {
    userService.getUsers((error,data)=>{
        if(error){
            return res.status(500).send("Erreur interne");
        }
        return res.status(200).json({data:data});
    })
}
exports.deleteUser = async (req,res) => {
    let uuid = req.query.uuid;
    if(!uuid){
        return res.status(400).send("UUID Nulle!!!!");
    }
    userService.deleteUser(uuid,(error,data)=>{
        if(error){
            if(error == "Utilisateur introuvable"){
                return res.status(400).send(error);
            }else{
                return res.status(500).send("Erreur interne");
            }
        }
        return res.status(200).send(data);
    })
}
exports.updateUser = async (req,res) => {
    let uuid = req.params.uuid; // api/users/:abc
    let {nom,prenom} = req.body;
    userService.updateUser(uuid,nom,prenom,(error,data)=>{
        if(error){
            if(error == "Utilisateur introuvable"){
                return res.status(400).send(error);
            }else{
                return res.status(500).send("Erreur interne");
            }
        }
        return res.status(200).send(data);      
    })
}
exports.getUserById = async (req,res)=> {
    const uuid = req.params.uuid;
    userService.getUsers((error,data)=>{
        if(error){
            return res.status(500).send("Erreur Interne");
        }
        const user = data.find(user => user.id == uuid);
        return res.status(200).json({data:user});
    })
}
*/