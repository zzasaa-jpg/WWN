import React, { useEffect, useState } from 'react';
import News from './News';
import './App.css';
import logo from './logo.png';
import dark_logo from './dark_logo.png';
import Loader from './Loader';

function App() {
  // difine thr states
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('india');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  // calling the api by useEffect
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_NEWS_KEY;
      try {
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&q=${category}&lang=${selectedLanguage}&apikey=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles);
          setLoading(false);
        } else {
          const errordata = await response.json()

          if (response.status === 403) {
            console.log('Request limit reached:', errordata.errors[0]);
            setError('Request limit reached. Please try again later.');
          } else {
            console.error('Failed to fetch data:', errordata.errors[0]);
            setError('Failed to fetch data. Please try again');
          }
          setLoading(false);
        }
      } catch (errors) {
        // catch the erros
        setLoading(false);
        console.error('Error fetching data:', errors);

      }
    };

    fetchData();
  }, [category, selectedLanguage, selectedCategory]);

  // usEffect for 
  useEffect(() => {
    const handleWindowResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // event for handleLanguageChange
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // event forhandleCategoryChange 
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  // event for 
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [showSearch, setShowSearch] = useState(false);

  // event for togglrSearch
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // event for closeSearch
  const closeSearch = () => {
    setShowSearch(false)
  };

  // event for handleSearchChange
  const handleSearchChange = (event) => {
    if (event.target.value !== "") {
      setCategory(event.target.value);
    } else {
      setCategory("india");
    }
  }

  return (
    <div className='parent'>
      <div className={`parent ${darkMode ? "App dark" : "App"} ${articles.length === 0 ? "App-darkh" : ""}`}>
        {/* header */}
        <header>
          {/* website logo */}
          <div className='logo'>
            <img src={darkMode ? dark_logo : logo} alt="Logo" />
          </div>

          {/* DarkMode button */}
          <button id='darkbtn' onClick={toggleDarkMode}>
            {darkMode ? <ion-icon name="sunny-outline"></ion-icon> : <ion-icon name="moon-outline"></ion-icon>}
          </button>

          {/* Select dropdown Category*/}
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

          {/* Select dropdown for Language */}
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

          {/* Search Input */}
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

        {/* <h1 id='top-news' >Top News</h1> */}

        {/* News rendring */}
        {
          // Add a condition for News articles and Loader Component
          loading ? (<Loader />) : error ? (
            <h1 id='no-news'>{error}</h1>
          ) : (
            <div className='news-show'>
              <section className='news-articles'>
                {/* map function use for render the newses */}
                {articles.length !== 0 ?
                  articles.map((article, index) => (
                    <News key={index} article={article} />
                  )) :
                  // <h1 id='no-news'>Failed news fetching...{error}</h1>
                  <h1 id='no-news'>Failed news fetching...</h1>
                }
              </section>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;