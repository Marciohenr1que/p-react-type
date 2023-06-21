import React from "react"
import { useState, useEffect } from "react"
import "./style-kanban.css";
import { ApiCard } from "../services/card"
import { deleteCard } from '../services/card/index'


type Card = {
  id: number
  title: string
  content: string
  column: string
}

function KanbanBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")
  const [proximo, setProximo] = useState(1) //mover os cards
  
  const [cards, setCards] = useState<Card[]>(() => {
  const savedCards = localStorage.getItem('cards')
  if (savedCards) {
    return JSON.parse(savedCards)
  }
  return []
})
useEffect(() => {
  localStorage.setItem('cards', JSON.stringify(cards))
}, [cards])

const addCard = async () => {
    try {
      const data = await ApiCard(title, content);
      const newCard = {id: proximo, title: data.title, content: data.content, column: "TODO"}
      setCards((prevCards) => [...prevCards, newCard])
      setProximo((prevId) => prevId = prevId + 1)
      console.log(cards)
    } catch (error) {
      console.error(error)
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addCard()
    setTitle("")
    setContent("")
  };

  const moveCard = (cardId: number, direction: string) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          switch (direction) {
            case "left":
              return { ...card, column: getPreviousColumn(card.column) }
            case "right":
              return { ...card, column: getNextColumn(card.column) }
            default:
              return card
          }
        }
        return card
      })
    );
  };

  const getPreviousColumn = (currentColumn: string) => {
    switch (currentColumn) {
      case "TODO":
        return "NOVO"
      case "DOING":
        return "TODO"
      case "DONE":
        return "DOING"
      default:
        return currentColumn
    }
  }

  const getNextColumn = (currentColumn: string) => {
    switch (currentColumn) {
      case "NOVO":
        return "TODO"
      case "TODO":
        return "DOING"
      case "DOING":
        return "DONE"
      default:
        return currentColumn
    }
  }
 const handleDeleteCard = async (cardId: number) => {
  const confirmDelete = window.confirm('Tem certeza de que deseja excluir o cartão?')
  if (confirmDelete) {
    try {
      await deleteCard(cardId);
      setCards(cards.filter((card) => card.id !== cardId));
      console.log('Cartão excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir o cartão:', error);
    }
  }
};
 
  
    const renderCards = (column: string) =>
  cards
    .filter((card) => card.column === column)
    .map((card) => (
      <div className="card" key={card.id}>
        <h3>{card.title}</h3>
        <p>{card.content}</p>
        <div className="card-actions">
          {column !== "" && (
            <>
              <button onClick={() => moveCard(card.id, "left")}>&larr;</button>
              <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
            </>
          )}
          {column !== "DONE" && (
            <button onClick={() => moveCard(card.id, "right")}>&rarr;</button>
          )}
        </div>
      </div>
    ))
 

  return (
    <div className="kanban-board">
      <div className="column">
        <h2>Novo</h2>
        <form onSubmit={handleSubmit} className="form-container">
         <input type="text" name="title" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
         <textarea name="content" placeholder="Conteúdo" value={content} onChange={(e) => setContent(e.target.value)} className="textarea-field"></textarea>
         <button className="submit-button">Adicionar</button>
</form>
      </div>
      <div className="column">
        <h2>To Do</h2>
        {renderCards("TODO")}
      </div>
      <div className="column">
        <h2>Doing</h2>
        {renderCards("DOING")}
           </div>
      <div className="column">
        <h2>Done</h2>
        {renderCards("DONE")}
      </div>
    </div>
  )
}

export default KanbanBoard
