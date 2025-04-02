const ReservConcertService = require("../services/reservConcert.services.pg");

exports.saveReservConcert = async (req,res) => {
    const utilisateur_id = req.body.utilisateur_id;
    const concert_id = req.body.concert_id;
    const nb_places = req.body.nb_places;
    const date_reservation = req.body.date_reservation;
    const resultat = await ReservConcertService.insertReservConcert(utilisateur_id, concert_id, nb_places, date_reservation);
    if (resultat) {
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("INSERTION AVEC SUCCES");
}

exports.getReservConcert = async (req, res) => {
    const reservConcert = await ReservConcertService.getReservConcert();
    if (!reservConcert) {
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
    return res.status(200).json({ data: reservConcert });
};

exports.getReservConcertById = async (req, res) => {
    const uuid = req.params.uuid;
    //console.log(uuid)
    try {
        const reservsConcert = await ReservConcertService.getReservConcert();
        if (!reservsConcert) {
            return res.status(500).json({ error: 'ERREUR INTERNE' });
        }
        //console.log(reservConcert)
        const reservConcert = reservsConcert.find(reservConcert => reservConcert.id == uuid);
        //console.log(reservConcert)
        if (!reservConcert) {
            return res.status(404).json({ error: 'reservConcert non trouvé' });
        }
        return res.status(200).json({ data: reservConcert });
    } catch (error) {
        console.error('Erreur lors de la récupération du reservConcert :', error);
        return res.status(500).json({ error: 'ERREUR INTERNE' });
    }
};

exports.updateReservConcert = async (req,res) => {
    
    const id = req.params.id;
    const utilisateur_id = req.body.utilisateur_id;
    const concert_id = req.body.concert_id;
    const nb_places = req.body.nb_places;
    const date_reservation = req.body.date_reservation;
    const resultat = await ReservConcertService.updateReservConcert(id, utilisateur_id, concert_id, nb_places, date_reservation);
    if(resultat){
        return res.status(500).send("ERREUR INTERNE");
    }
    return res.status(200).send("MODIFICATION ENREGISTREE");
};

exports.deleteReservConcert = async (req, res) => {
    const { id } = req.params;
    //console.log(id)
    try {
        const result = await ReservConcertService.deleteReservConcert(id);

        if (!result) {
            return res.status(200).json({ message: 'ReservConcert supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'ReservConcert non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du ReservConcert:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};
