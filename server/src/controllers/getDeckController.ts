import { Request, Response } from "express";
import { pool } from "../index";
import { TDeck } from "../models/Deck";

export async function getDeckController(req: Request, res: Response) {
    const query = "SELECT * FROM Deck WHERE id = $1";

    try {
        const { rows } = await pool.query<TDeck>(query, [req.params.deckId]);
        if (!rows[0]) res.status(404).send("Mazo no encontrado");
        res.json(rows[0]);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).send("Error al buscar el mazo");
    }
}