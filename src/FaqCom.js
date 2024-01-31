import { useState } from 'react';
import './FaqCom.css'
import Data from './Faq';

function App() {
  let [ans, setAns] = useState(Data.id);

  const toggleAnswer = (id) => {
    if (ans === id) {
      setAns(null);
    } else {
      setAns(id);
    }
  };

  return (
    <div className="App2">
      <div className='faq-container'>
        <h1 className=' faq-h1'>FAQ</h1>
        <div className=' '>
          {
            Data.map((faqitems, i) => {
              return (
                <div className='faqitmes' key={i}>
                 

                    <h2 onClick={() => toggleAnswer(faqitems.id)}>{faqitems.title}
                      <span>

                        {
                          ans === faqitems.id ?
                            <ion-icon name="close-outline"></ion-icon>
                            :
                            <ion-icon name="add-outline"></ion-icon>

                        }
                      </span>
                    </h2>
                  


                  <p className={ans === faqitems.id ? 'activeans' : '' } >{faqitems.body}</p>

                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  );
}

export default App;
