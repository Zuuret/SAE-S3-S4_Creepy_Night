const express = require("express");
const cors = require('cors');
const userRouter = require("./routes/users.router");
const concertRouter = require("./routes/concerts.router");
const expoRouter = require("./routes/expos.router");
const filmRouter = require("./routes/films.router");
const prestataireRouter = require("./routes/prestataires.router");
const prestationRouter = require("./routes/prestations.router");
const achatBilletRouter = require("./routes/achat_billet.router");
const transactionHistoriqueRouter = require("./routes/transactions.router");
const signalementRouter = require("./routes/signalement.router");
const demandesPrestatairesRouter = require("./routes/demandesPrestataires.router");
const organisateursRouter = require("./routes/organisateurs.router");
const demandesOrganisateurRouter = require("./routes/demandesOrganisateurs.router");
const livreDOrRouter = require("./routes/livreDOr.router");
const texteAccueilRoutes = require('./routes/texte_accueil.router');


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = 3000;
const app = express();
app.use(cors());

// Middleware traitement JSON 
app.use(express.json());

app.use("/api/users",userRouter);
app.use("/api/concerts",concertRouter);
app.use("/api/expos",expoRouter);
app.use("/api/films",filmRouter);
app.use("/api/prestataires",prestataireRouter);
app.use("/api/prestations",prestationRouter);
app.use("/api/achat",achatBilletRouter);
app.use("/api/transactions",transactionHistoriqueRouter);
app.use("/api/signalement",signalementRouter);
app.use("/api/demandePresta",demandesPrestatairesRouter);
app.use("/api/organisateurs",organisateursRouter);
app.use("/api/demandeOrga",demandesOrganisateurRouter);
app.use("/api/livreDOr", livreDOrRouter);
app.use('/api/texte-accueil', texteAccueilRoutes);



/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: {
        info: {
            title: "Creepy Night API",
            description: "API documentation",
            contact: {
                name: "BOISSELOT Harry / CARRARA Tim / KHERZA Yahia / ROSE Mathéo / VIDY Enzo",
            },
            servers: ["http://localhost:3000/"],
        },
    },
    apis: ["./routes/users.router.js", "./routes/concerts.router.js", "./routes/expos.router.js", "./routes/films.router.js",
        "./routes/prestataires.router.js", "./routes/prestations.router.js", "./routes/achat_billet.router.js",
        "./routes/transactions.router.js", "./routes/signalement.router.js", "./routes/demandesPrestataires.router.js",
        "./routes/organisateurs", "./routes/demandesOrganisateurs.router.js", "./routes/livreDOr.router.js", "./routes/texte_accueil.router.js"
    ],
};


const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Swagger Initialization - END */

// Middlewares Gestion erreurs
app.use("*",(req,res,next)=>{
    const error = new Error("Route non trouvée");
    error.status = 404;
    next(error);
});
app.use((err,req,res,next)=>{
    res.status(err.status).send(err.message);
});

app.listen(PORT,()=>{
    console.log(`Serveur écoute sur le port ${PORT}`);
})