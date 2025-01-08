const signalementService = require('../services/signalement.services.pg');

exports.signalerIncident = async (req, res) => {
    const utilisateurId = req.body.utilisateurId;
    const typeIncident = req.body.typeIncident;
    const description = req.body.description;
    const zoneId = req.body.zoneId;
    const position = req.body.position;
    try {
        const organisateurs = await signalementService.signalerIncident(
            utilisateurId, typeIncident, description, zoneId, position
        );
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
