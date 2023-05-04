import { API_URL, TDeck } from "./config"

export async function updateCard(deckId: string, index: number, text: string) {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text })
    })
    return response.json() as Promise<TDeck>
}