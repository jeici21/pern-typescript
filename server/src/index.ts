import express from "express";
import { config } from 'dotenv'
import cors from 'cors'
import { Pool } from 'pg';
import { createDeckTable } from "./models/Deck";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";
import { updateDeckController } from "./controllers/updateDeckController";
import { updateCardOnDeckController } from "./controllers/updateCardOnDeckController";

config();
const PORT = 5000;
const app = express();
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT as unknown as number,
});

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get('/decks', getDecksController);
app.post("/decks", createDeckController);
app.put("/decks/:deckId", updateDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.get('/decks/:deckId', getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.put("/decks/:deckId/cards/:index", updateCardOnDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

pool.connect().then(() => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    app.listen(PORT);
    createDeckTable();
});