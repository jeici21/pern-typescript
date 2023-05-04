import { Request, Response } from "express";
import { pool } from "..";
import { TDeck } from "../models/Deck";

export async function getDecksController(req: Request, res: Response) {
    try {
        const { rows } = await pool.query<TDeck>("SELECT * FROM deck");
        res.json(rows);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}