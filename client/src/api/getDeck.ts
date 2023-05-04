import { API_URL, TDeck } from "./config"

export async function getDeck(deckId: string) {
    const response = await fetch(`${API_URL}/decks/${deckId}`)
    return response.json() as Promise<TDeck>
}