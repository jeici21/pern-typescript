import { Request, Response } from "express";
import { pool } from "../index";
import { TDeck } from "../models/Deck";

export async function updateDeckController(req: Request, res: Response) {
    const title: string = req.body.title || "";
    const query = "UPDATE Deck SET title = $1 WHERE id = $2 RETURNING *";

    try {
        const { rows } = await pool.query<TDeck>(query, [title, req.params.deckId]);
        res.json(rows[0]);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).send("Error al actualizar el mazo");
    }
}