import { FormEvent, useEffect, useState } from 'react'
import './App.css'
import { Link } from "react-router-dom";
import { deleteDeck } from './api/deleteDeck';
import { getDecks } from './api/getDecks';
import { createDeck } from './api/createDeck';
import { TDeck } from './api/config';
import { updateDeck } from './api/updateDeck';

function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  async function handleCreateDeck(e: FormEvent) {
    e.preventDefault()
    const deck = await createDeck(title)
    setDecks([...decks, deck])
    setTitle("")//vaciando el input
  }

  async function handleUpdateDeck(deckId: string) {
    const title = prompt('Ingrese el nuevo título del deck')
    if (!title) return
    const updatedDeck = await updateDeck(deckId, title)
    setDecks(decks.map(deck => (deck._id === updatedDeck[0]._id ? updatedDeck[0] : deck)))
  }//actualizando el deck correspondiente

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId)
    setDecks(decks.filter(deck => deck._id !== deckId))
  }//borrando el deck correspondiente

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [decks])//recibiendo todos los registros en el front

  return (
    <div className='container'>
      <div className='App'>
        <h1>Tus Decks</h1>
        <ul className='decks'>
          {decks.map(deck => (
            <li key={deck._id}>
              <button className='edit' onClick={() => handleUpdateDeck(deck._id)}>E</button>
              <button className='delete' onClick={() => handleDeleteDeck(deck._id)}>X</button>
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor='deck-title'>Título del Deck</label>
          <input id='deck-title' value={title} onChange={e => setTitle(e.target.value)} />
          <button>Crear Deck</button>
        </form>
      </div>
    </div>
  )
}

export default App