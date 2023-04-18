import Card from "./components/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems, like, likedItems, removeItem } from "./redux/slices/counterSlice";


function App() {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const [pageNumber, setPageNumber] = useState(1);
  const [likedCards, setLikedCards] = useState(false)
  console.log(likedCards)

  useEffect(() => {
    dispatch(fetchItems(pageNumber))
  }, [pageNumber, dispatch])

  const nextPage = (pageNumber) => {
    if (pageNumber <= state.cards.pages) {
      setPageNumber(pageNumber + 1)
    }
  }


  const togleLike = (id) => {
    dispatch(like(id))
    dispatch(likedItems())
  }
  const removeCard = (id) => {
    dispatch(removeItem(id))
  }
  const likedHeroes = () => state.cards.likeItems.map(({ id, name, image, like }) => {
    return <Card key={id} like={togleLike} removeCard={removeCard} id={id} name={name} image={image} checklike={like} />
  })

  const heroes = () => state.cards.items.map(({ id, name, image, like }) => {
    return <Card key={id} like={togleLike} removeCard={removeCard} id={id} name={name} image={image} checklike={like} />
  })
  return (
    <>
      <div className="header" >
        <div className="container">
          <div className="header-inner">
            <h1>Rick and Morty</h1>
          </div>

        </div>
      </div >
      <div className="container">
        <div onClick={() => setLikedCards(!likedCards)} className="filter">
          <p className={`${likedCards ? 'active' : null}`}>LIKED</p>
        </div>
        <div className="cards">
          {likedCards ? likedHeroes() : heroes()}
          {/* {heroes()} */}
        </div>
        <button onClick={() => { nextPage(pageNumber) }}>Показать ещё</button>
      </div >
    </>
  );
}

export default App;
