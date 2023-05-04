import { Request, Response } from "express"
import { pool } from "../index"
import { TDeck } from "../models/Deck"

export async function updateCardOnDeckController(req: Request, res: Response) {
    const index = parseInt(req.params.index)
    const text: string = req.body.text
    const query = "SELECT * FROM Deck WHERE id = $1";
    const updateQuery = "UPDATE Deck SET cards[$2] = $3 WHERE id = $1 RETURNING *";

    try {
        const { rows } = await pool.query<TDeck>(query, [req.params.deckId]);
        if (!rows[0]) res.status(400).send('No existe un deck con este id');
        rows[0].cards[index] = text;
        const { rows: updatedRows } = await pool.query<TDeck>(updateQuery, [req.params.deckId, index, text]);
        res.json(updatedRows[0]);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).send("Error al actualizar la carta en el mazo");
    }
}