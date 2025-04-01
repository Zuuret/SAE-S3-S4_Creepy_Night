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
    const password = bcrypt.hashSync(req.body.password, 8);
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

exports.getUsers = async (req,res) => {
    const users = await userService.getUsers();
    if (!users) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: users });
}

exports.getUserById = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const users = await userService.getUsers();
        if (!users) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        const user = users.find(user => user.id === uuid);
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        return res.status(200).json({ error : 0, data: user });
    } catch (error) {
        console.log('Erreur lors de la récupération de l\'utilisateur :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateUser = async (req,res) => {
    const uuid = req.params.uuid;
    const nom = req.body.name;
    const prenom = req.body.firstname;
    const birthdate = req.body.birthdate;
    const email = req.body.email;
    const password = req.body.password;
    const est_festivalier = req.body.is_festivalier;
    const resultat = await userService.updateUser(uuid,nom,prenom,birthdate,email,password,est_festivalier);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deleteUser = async (req, res) => {
    const { uuid } = req.params;

    try {
        const result = await userService.deleteUser(uuid);

        if (!result) {
            return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l’utilisateur:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
