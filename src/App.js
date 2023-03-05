import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios'



function App() {
  const [searchText, setSerachText] = useState("")
  const [bookTable, setBookTable] = useState([])

  const handleTrendingBooksClick = (type) => {
    setSerachText("")
    setSerachText(type)
    handleBookSerach()
  }
  const handleBookSerach = async () => {
    const response = await axios.get(`http://openlibrary.org/search.json?title=${searchText}`)

    console.log(response.data)
    const { docs } = response.data

    const newBooks = docs.slice(0, 20).map((bookSingle) => {
      const { key, author_name, title, first_publish_year } = bookSingle;

      return {
        id: key,
        author: author_name,
        first_publish_year: first_publish_year,
        title: title,
      }
    });

    setBookTable(newBooks)
  }
  return (
    <div className="App">
      <div className="trendingSection">
        <p>Trending Topics</p>
        <ul>
          <li onClick={() => { handleTrendingBooksClick("javascript") }} >JavaScript</li>
          <li onClick={() => { handleTrendingBooksClick("python") }} >Python</li>
          <li onClick={() => { handleTrendingBooksClick("java") }} >Java</li>
          <li onClick={() => { handleTrendingBooksClick("criminal law") }} >Criminal Law</li>
          <li onClick={() => { handleTrendingBooksClick("indian law") }} >Indian History</li>
        </ul>
      </div>
      <div className="bookSearchSection">
        <div className="search">
          <input
            type="text"
            placeholder='Type a book or author name to search'
            onChange={(e) => { setSerachText(e.target.value) }}
          />
          <button
            onClick={() => { handleBookSerach() }}
          >Serach</button>
        </div>
        <div className="books">
         {
          (bookTable.length > 0) && (
            <table>
            <thead>
              <tr>Title</tr>
              <tr>Author</tr>
              <tr
                style={{
                  borderRight: "none"
                }}
              >First publish year</tr>
            </thead>
            <tbody>

              {
                bookTable.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td
                      style={{
                        paddingLeft : "10px",
                        justifyContent : "flex-start"
                      }}
                      >
                        {item.title}
                      </td>
                      <td
                      style={{
                        paddingLeft : "10px",
                        justifyContent : "flex-start"
                      }}
                      >

                        {item.author}
                      </td>
                      <td>

                        {item.first_publish_year}
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          )
         }
        </div>
      </div>
    </div >
  );
}

export default App;
