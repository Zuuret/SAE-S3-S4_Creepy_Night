const express = require("express");
const userRouter = require("./routes/users.router");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = 3000;
const app = express();

// Middleware traitement JSON 
app.use(express.json());
app.use("/api/users",userRouter);

/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "Creepy Night API",
            description: "API documentation",
            contact: {
                name: "BOISSELOT Harry / CARRARA Tim / KHERZA Yahia / ROSE Mathéo / VIDY Enzo",
            },
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["./routes/users.router.js"],
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