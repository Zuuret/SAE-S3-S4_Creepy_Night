const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const prestataireService = require("../serveur/services/prestataires.services.pg");

const router = express.Router();

// Dossier où enregistrer les images
const uploadDir = path.join(__dirname, "../assets/");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer pour gérer l'upload des images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const { uuid } = req.params;
        const filePath = path.join(uploadDir, `${uuid}_background.jpg`);

        // Supprimer l'ancienne image si elle existe
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        cb(null, `${uuid}_background.jpg`);
    },
});

const upload = multer({ storage });

// Route d'upload
router.post("/prestataires/:uuid/background", upload.single("image"), async (req, res) => {
    const { uuid } = req.params;

    if (!req.file) {
        return res.status(400).json({ error: "Aucune image envoyée" });
    }

    const imageUrl = `/assets/${uuid}_background.jpg`;

    // Mise à jour de l'URL dans la BDD
    try {
        const error = await prestataireService.updateImagePrestataire(uuid, imageUrl);
        if (error) {
            return res.status(500).json({ error: "Erreur lors de la mise à jour de l'image" });
        }

        return res.json({ message: "Image mise à jour", imageUrl });
    } catch (error) {
        return res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
});

module.exports = router;
