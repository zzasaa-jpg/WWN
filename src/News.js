import React from 'react'
import './App.css';

function News(props) {
  // console.log(props); // Logging props for demonstration

  return (
    <>
    
    <div className='section'>
        {
          props.article.urlToImage !== null ?
            <img className='img' src={props.article.image} alt='logo'/> :
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmHl1hOB60MKFw_j9QUVQKAguWs1C2p1YXGQ&usqp=CAU" alt='logo'/>
        }
      <div className='section-h2-p'>
        <h2 id='title'>{props.article.title}</h2>
        <p id='des'>{props.article.description?.substring(0, 100).concat('...')} <a id='link' href={props.article.url} target='_blank' rel='noopener noreferrer'>Read more</a></p>
        <p id='publish-date'>{props.article.publishedAt}</p>
      </div>
    </div>
    </>

   
  );
}

export default News
