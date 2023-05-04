import { FormEvent, useEffect, useState } from "react"
import { createCard } from "./api/createCard"
import { useParams } from "react-router-dom"
import { getDeck } from "./api/getDeck"
import { TDeck } from "./api/config"
import { deleteCard } from "./api/deleteCard"
import './Deck.css'
import { updateCard } from "./api/updateCard"

const Deck = () => {
    const [deck, setDeck] = useState<TDeck | undefined>()
    const [cards, setCards] = useState<string[]>([])
    const [text, setText] = useState('')
    const { deckId } = useParams()

    async function handleCreateDeck(e: FormEvent) {
        e.preventDefault()
        const { cards: serverCards } = await createCard(deckId!, text)
        setCards(serverCards)
        setText("")
    }//creando carta

    async function handleUpdateCard(index: number) {
        if (!deckId) return
        const text = prompt('Ingrese el nuevo título del deck')
        if (!text) return
        const newDeck = await updateCard(deckId, index, text)
        setCards(newDeck.cards)
    }//editando carta

    async function handleDeleteCard(index: number) {
        if (!deckId) return
        const newDeck = await deleteCard(deckId, index)
        setCards(newDeck.cards)
    }//borrando carta

    useEffect(() => {
        async function fetchDeck() {
            if (!deckId) return
            const newDeck = await getDeck(deckId)
            setDeck(newDeck)
            setCards(newDeck.cards)
        }
        fetchDeck()
    }, [deckId])//obteniendo datos de la carta seleccionada

    return (
        <div className='Deck'>
            <h1>{deck?.title}</h1>
            <ul className='cards'>
                {cards.map((card, index) => (
                    <li key={index}>
                        <button className="edit" onClick={() => handleUpdateCard(index)}>E</button>
                        <button className="delete" onClick={() => handleDeleteCard(index)}>X</button>
                        {card}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCreateDeck}>
                <label htmlFor='card-text'>Texto de la Carta</label>
                <input id='card-text' value={text} onChange={e => setText(e.target.value)} />
                <button>Crear Deck</button>
            </form>
        </div>
    )
}

export default Deck