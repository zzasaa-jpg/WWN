import React, { useEffect, useState } from 'react';
import News from './News';
import './App.css';
import logo from './logo.png';

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('india');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&q=${category}&lang=${selectedLanguage}&apikey=6276ac9151c85c6fc5abc91d7fe6d424`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles);
        } else {
          console.error('Failed to fetch data');
          const errordata = await response.json()
          setError(errordata.errors[0]); //set the error message
        }
      } catch (errors) {
        console.error('Error fetching data:', errors);
      }
    };

    fetchData();
  }, [category, selectedLanguage, selectedCategory]);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const closeSearch = () => {
    setShowSearch(false)
  };

  const handleSearchChange = (event) => {
    if (event.target.value !== "") {
      setCategory(event.target.value);
    } else {
      setCategory("india");
    }
  }
  
  return (
    <div className="App">
      <header>
        <div className='logo'>
          <img src={logo} alt="Logo" />
        </div>
        <div className='select-category'>
          {isDesktop ? (
            <h4>category:</h4>
          ) : (
            <ion-icon name="list-outline"></ion-icon>
          )}
          <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="general">general</option>
            <option value="world">world</option>
            <option value="nation">nation</option>
            <option value="business">business</option>
            <option value="technology">technology</option>
            <option value="entertainment">entertainment</option>
            <option value="sports">sports</option>
            <option value="science">science</option>
            <option value="health">health</option>
          </select>
        </div>
        <div className='select-language'>
          {isDesktop ? (
            <h4>language:</h4>
          ) : (
            <h4>
              <ion-icon name="language-outline"></ion-icon>
            </h4>
          )}
          <select name="language" id="language" value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="Ar">Arabic</option>
            <option value="zh">Chinese</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="el">Greek</option>
            <option value="hi">Hindi</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ml">Malayalam</option>
            <option value="mr">Marathi</option>
            <option value="ru">Russian</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="uk">Ukrainian</option>
          </select>
        </div>
        {(isDesktop || showSearch) && (
          <input
            type='text'
            id='search'
            onChange={handleSearchChange}
            placeholder='Search...'
            onBlur={closeSearch} // Close input when focus is lost
          />
        )}
        {/*serach-btn*/}
        {
          !isDesktop && !showSearch && (
            <button onClick={toggleSearch} id='search-btn'><ion-icon name="search-outline"></ion-icon></button>
          )
        }
      </header>
      <div className='news-show'>
        <h1 id='top-news' >Top News</h1>
        <section className='news-articles'>
          {articles.length !== 0 ?
            articles.map((article, index) => (
              <News key={index} article={article} />
            )) :
            <h1 id='no-news'>Failed news fetching...{error}</h1>
          }
        </section>
      </div>
    </div>
  );
}

export default App;



