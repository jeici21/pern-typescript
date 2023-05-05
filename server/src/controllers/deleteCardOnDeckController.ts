import { Request, Response } from "express";
import { pool } from "../index";
import { TDeck } from "../models/Deck";

export async function deleteCardOnDeckController(req: Request, res: Response) {
    const index = parseInt(req.params.index)
    const query = "UPDATE Deck SET cards = array_remove(cards, cards[$1]) WHERE id = $2 RETURNING *";

    try {
        const { rows: updatedRows } = await pool.query<TDeck>(query, [index, req.params.deckId]);
        if (!updatedRows[0]) res.status(400).send('El deck no existe o la carta ya ha sido eliminada');
        res.json(updatedRows[0]);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).send("Error al eliminar una carta");
    }
}