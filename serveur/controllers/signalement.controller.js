const signalementService = require('../services/signalement.services.pg');

exports.signalerIncident = async (req, res) => {
    const { utilisateurId, typeIncident, description, zoneId, position } = req.body;

    try {
        // Appel du service pour signaler l'incident et obtenir la liste des organisateurs à notifier
        const organisateurs = await signalementService.signalerIncident(
            utilisateurId, typeIncident, description, zoneId, position
        );
        
        // Retourner la liste des organisateurs
        res.status(200).json({
            message: 'Signalement ajouté et organisateurs notifiés',
            organisateurs
        });
    } catch (error) {
        console.error('Erreur lors du signalement:', error.message);
        res.status(500).json({
            message: 'Erreur interne lors du signalement de l\'incident',
            error: error.message
        });
    }
};
