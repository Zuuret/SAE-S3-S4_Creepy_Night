const ReservConcertService = require("../services/reservConcert.services.pg");

exports.saveReservConcert = async (req, res) => {
    try {
        const { utilisateur_id, concert_id, nb_places, date_reservation } = req.body;
        
        // 1. Vérifier que le concert existe et a assez de places
        const concert = await Concert.findOne({ where: { id: concert_id } });
        if (!concert) {
            return res.status(404).json({ error: "Concert non trouvé" });
        }
        
        if (concert.nb_places < nb_places) {
            return res.status(400).json({ error: "Places insuffisantes" });
        }

        // 2. Décrémenter le stock (de manière atomique)
        await Concert.update(
            { nb_places: sequelize.literal(`nb_places - ${nb_places}`) },
            { where: { id: concert_id } }
        );

        // 3. Créer la réservation
        const reservation = await ReservationConcert.create({
            utilisateur_id,
            concert_id,
            nb_places,
            date_reservation
        });

        // 4. Créer la transaction
        const prixTotal = concert.prix_place * nb_places;
        const transaction = await Transaction.create({
            utilisateur_id,
            montant: -prixTotal,
            operation: 'RESERVATION_CONCERT',
            details: `Réservation pour ${concert.artiste}`,
            date: new Date()
        });

        // 5. Mettre à jour le solde utilisateur
        await Utilisateur.update(
            { solde: sequelize.literal(`solde - ${prixTotal}`) },
            { where: { id: utilisateur_id } }
        );

        res.status(201).json(reservation);
        
    } catch (error) {
        console.error("Erreur réservation:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

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
