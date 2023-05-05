import { API_URL, TDeck } from "./config";

export async function deleteCard(deckId: string, index: number) {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/${index + 1}`, { method: 'DELETE' })
    return response.json() as Promise<TDeck>
}