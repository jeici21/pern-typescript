import { Request, Response } from "express"
import { pool } from "../index";
import { TDeck } from "../models/Deck";

export async function createDeckController(req: Request, res: Response) {
    const deck: TDeck = req.body;
    const query = "INSERT INTO Deck(title, cards) VALUES($1, $2) RETURNING *";

    try {
        const { rows } = await pool.query<TDeck>(query, [deck.title, deck.cards ?? []]);
        res.json(rows[0]);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).send("Error al crear un nuevo mazo");
    }
}