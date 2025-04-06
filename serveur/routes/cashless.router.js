const express = require("express");
const router = express.Router();
const cashlessController = require("../controllers/cashless.controller");

/**
 * @swagger
 * /api/cashless/updateFunds:
 *   put:
 *     summary: Mettre à jour les fonds d'un utilisateur
 *     description: Permet de recharger ou rembourser les fonds d'un utilisateur. La mise à jour du solde est suivie de l'enregistrement d'une transaction.
 *     tags:
 *       - Cashless
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: fundsUpdate
 *         description: Données pour la mise à jour des fonds
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - utilisateurId
 *             - montant
 *             - operation
 *           properties:
 *             utilisateurId:
 *               type: string
 *               format: uuid
 *               description: Identifiant de l'utilisateur
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             montant:
 *               type: number
 *               format: float
 *               description: Montant à ajouter ou soustraire
 *               example: 50.00
 *             operation:
 *               type: string
 *               description: Type d'opération (ex. recharge, remboursement)
 *               example: "recharge"
 *             details:
 *               type: string
 *               description: Détails complémentaires sur l'opération
 *               example: "Recharge effectuée via carte bancaire"
 *     responses:
 *       '200':
 *         description: Fonds mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newSolde:
 *                   type: number
 *                   format: float
 *                   example: 150.00
 *                 transaction:
 *                   type: object
 *                   description: Détails de la transaction enregistrée
 *       '400':
 *         description: Données invalides
 *       '500':
 *         description: Erreur interne du serveur
 */
router.put("/updateFunds", cashlessController.updateFunds);

/**
 * @swagger
 * /api/cashless/checkBankCard:
 *   post:
 *     summary: Vérifier les coordonnées bancaires
 *     description: Permet de vérifier la validité des coordonnées bancaires d'un utilisateur en comparant avec les données enregistrées dans la table coordonnees_bancaire.
 *     tags:
 *       - Cashless
 *     parameters:
 *       - in: body
 *         name: bankCardData
 *         description: Coordonnées bancaires à vérifier
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - nom
 *             - numeroCarte
 *             - dateExpiration
 *             - cvv
 *           properties:
 *             nom:
 *               type: string
 *               description: Nom inscrit sur la carte bancaire
 *               example: "Doe"
 *             numeroCarte:
 *               type: string
 *               description: Numéro de la carte bancaire (16 chiffres)
 *               example: "123456789ABCDEFG"
 *             dateExpiration:
 *               type: string
 *               description: Date d'expiration de la carte (MM/YY)
 *               example: "11/31"
 *             cvv:
 *               type: string
 *               description: Code CVV de la carte bancaire
 *               example: "484"
 *     responses:
 *       '200':
 *         description: Coordonnées bancaires vérifiées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *       '400':
 *         description: Données invalides
 *       '500':
 *         description: Erreur interne du serveur
 */
router.post("/checkBankCard", cashlessController.checkBankCard);

module.exports = router;
