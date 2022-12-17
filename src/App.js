import { useState } from 'react';
import './App.css';
import logo from './card.png'
import chip from './chip.png'

function App() {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const cc_format = (value) => {

    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    console.log(v);
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    let len = match.length
    for (let i = 0; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))

    }
    if (parts.length) {
      setCode(parts.join(' '))
      return parts.join(' ')
    } else {
      setCode(v)
      return v
    }
  }
  const codeCard = code.split("")
  const rows = [];
  for (let i = 0; i < 19; i++) {
    if (i == 4 || i == 9 || i == 14) {
      rows.push(
        <>
          &nbsp;
          &nbsp;
        </>
      );
    } else
      rows.push(
        <div className={codeCard[i] && codeCard[i] != '' ? "active" : ''}>
          <p>#</p>
          <p>{codeCard[i]}</p>
        </div>
      );
  }

  return (
    <div className="App">
      <div className='card'>
        <div className='visa'>
          <div className='visa-front'>
            <div className='front-logo'>
              <img src={chip} alt="" />
              <img src={logo} alt="" />
            </div>
            <div className='numCard'>
              <div className='numCard-cadr'>
                {rows}
              </div>
            </div>
            <div className='footer-card'>
              <div className='text'>
                <p className='title'>Card Holder</p>
                <p>{name !== '' ?name:'FULL NAME'}</p>
              </div>
              <div className='text'>
                <p className='title'>Expires</p>
                <p>MM/YY</p>
              </div>
            </div>
          </div>
          <div className='visa-back'>
            <div className='black-hr'></div>
            <div className='cvv'>
              <p className='cvv-text'>cvv</p>
              <p>****</p>
            </div>
            <div className='back-logo'>
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
        <div className='form'>
          <label className='label'>
            Card Number
            <input id="ccn" className='input' inputMode='numeric' type="text" placeholder="xxxx xxxx xxxx xxxx" onInput={(e) => { e.target.value = cc_format(e.target.value) }}></input>
          </label>
          <label className='label'>
            Card Holder
            <input className='input' type="text" placeholder="ّFULL NAME" onInput={(e)=>{setName(e.target.value)}}></input>
          </label>
        </div>
      </div>
    </div >
  );
}

export default App;
