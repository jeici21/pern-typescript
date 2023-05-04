import { API_URL, TDeck } from "./config"

export async function updateDeck(deckId: string, title: string) {
    const response = await fetch(`${API_URL}/decks/${deckId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title })
    })
    return response.json() as Promise<TDeck[]>
}