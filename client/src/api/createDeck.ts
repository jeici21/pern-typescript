import { API_URL, TDeck } from "./config"

export async function createDeck(title: string) {
    const response = await fetch(`${API_URL}/decks`, {
        method: 'POST', body: JSON.stringify({ title }), headers: { "Content-Type": "application/json" }
    })
    return response.json() as Promise<TDeck>//conectando con el server y guardando el ingreso en formato json
}