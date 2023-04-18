import Card from "./components/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems, like, removeItem } from "./redux/slices/counterSlice";


function App() {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const [pageNumber, setPageNumber] = useState(1);
  const [likedCards, setLikedCards] = useState(false)

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
  }
  const removeCard = (id) => {
    dispatch(removeItem(id))
  }

  // const likeHeroes = () => state.cards.items.filter(item => {
  //   return item.like ? item : null
  // })
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
        <div onClick={setLikedCards(!likedCards)} className="filter">
          <p>LIKED</p>
        </div>
        <div className="cards">
          {/* {likedCards ? likeHeroes() : heroes()} */}
          {heroes()}
        </div>
        <button onClick={() => { nextPage(pageNumber) }}>Показать ещё</button>
      </div>
    </>
  );
}

export default App;
