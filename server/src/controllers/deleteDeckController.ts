import { Request, Response } from "express";
import { pool } from "../index";
import { TDeck } from "../models/Deck";

export async function deleteDeckController(req: Request, res: Response) {
    const query = "DELETE FROM Deck WHERE id = $1 RETURNING *";

    try {
        const { rows } = await pool.query<TDeck>(query, [req.params.deckId]);
        res.json(rows[0]);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).send("Error al eliminar el mazo");
    }
}