import { Request, Response } from "express";
import { pool } from "../index";
import { Card, TDeck } from "../models/Deck";

export async function createCardForDeckController(req: Request, res: Response) {
    const { text }: Card = req.body;
    const query = "UPDATE Deck SET cards = array_append(cards, $1) WHERE id = $2 RETURNING *";

    try {
        const { rows } = await pool.query<TDeck>(query, [text ?? '', req.params.deckId]);
        if (!rows[0]) res.status(400).send('No existe un deck con este id');
        res.json(rows[0]);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).send("Error al crear una nueva carta");
    }
}