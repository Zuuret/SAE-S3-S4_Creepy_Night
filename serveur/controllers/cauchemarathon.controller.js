const cauchemarathonService = require("../services/cauchemarathon.services.pg");

exports.buyTicket = async (req, res) => {
    const { idUser, nbBillets, price, dateCourse, nomCourse } = req.body;
    try {
        const result = await cauchemarathonService.buyTicketCauchemarathon(idUser, nbBillets, price, dateCourse, nomCourse);
        if (result.error) {
            return res.status(400).json({ error: 1, data: result.error });
        }
        return res.status(200).json({ error: 0, data: result });
    } catch (error) {
        console.error("Erreur dans buyTicket :", error);
        return res.status(500).json({ error: 1, data: "Erreur interne du serveur" });
    }
};
