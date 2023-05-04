import { pool } from "..";

export type TDeck = { id: number, title: string, cards: string[] }
export type Card = { text: string }

export const createDeckTable = async () => {
    const client = await pool.connect();

    try {
        await client.query(`
      CREATE TABLE IF NOT EXISTS Deck (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, cards TEXT[]);
    `);
    } finally {
        client.release();
    }
};