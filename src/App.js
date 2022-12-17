import { useRef, useState } from 'react';
import './App.css';
import logo from './card.png'
import chip from './chip.png'

function App() {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [mm, setMm] = useState('')
  const [yy, setYY] = useState('')
  const [Cvv, setCvv] = useState('')
  const [Cvvclass, setCvvclass] = useState(false)
  const defaultStyle = {
    opacity:0,
    marginTop:"50%",
    marginLeft:"50%",
    width:"10%",
    height:"10%"
  }
  const [style,setStyle] = useState(defaultStyle)
  const elCode = useRef();
  const elName = useRef();
  const elDate = useRef();
  const cc_format = (value) => {

    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
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
  const number_format = (value, count, fun) => {
    var v = value
    var matches
    if (count === 2)
      matches = v.match(/\d{2,2}/g)
    else
      matches = v.match(/\d{4,4}/g)
    var match = matches && matches[0] || ''
    var parts = []
    let len = match.length
    for (let i = 0; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))

    }
    if (parts.length) {
      fun(parts.join(' '))
      return parts.join(' ')
    } else {
      fun(v)
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

  const finSetFocus=(e)=>{
    console.log(e.current);
    const setStyleOBJ = {
      opacity:1,
      marginTop:e.current.offsetTop,
      marginLeft:e.current.offsetLeft,
      width:e.current.offsetWidth,
      height:e.current.offsetHeight
    }
    setStyle(setStyleOBJ)
  }
  return (
    <div className="App">
      <div className='card'>
        <div className={`visa ${Cvvclass ? 'back' : ''}`}>
          <div className='visa-front'>
            <div className='focus' style={style}></div>
            <div className='front-logo'>
              <img src={chip} alt="" />
              <img src={logo} alt="" />
            </div>
            <div className='numCard'>
              <div className='numCard-cadr' ref={elCode}>
                {rows}
              </div>
            </div>
            <div className='footer-card'>
              <div className='text' ref={elName}>
                <p className='title'>Card Holder</p>
                <p>{name !== '' ? name : 'FULL NAME'}</p>
              </div>
              <div className='text' ref={elDate}>
                <p className='title'>Expires</p>
                <p>{mm !== '' ? mm : 'MM'}/{yy !== '' ? yy : 'YY'}</p>
              </div>
            </div>
          </div>
          <div className='visa-back'>
            <div className='black-hr'></div>
            <div className='cvv'>
              <p className='cvv-text'>cvv</p>
              <p>{Cvv !== '' ? Cvv : ''}</p>
            </div>
            <div className='back-logo'>
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
        <div className='form'>
          <div className='flexbox'>
            <label className='label'>
              Card Number
              <input id="ccn" className='input' inputMode='numeric' type="text" placeholder="xxxx xxxx xxxx xxxx" onInput={(e) => { e.target.value = cc_format(e.target.value) }} onFocus={() => finSetFocus(elCode)}  onBlur={() => setStyle(defaultStyle)}></input>
            </label>
            <label className='label'>
              Card Holder
              <input className='input' type="text" placeholder="ّFULL NAME" onInput={(e) => { setName(e.target.value) }} onFocus={() => finSetFocus(elName)} onBlur={() => setStyle(defaultStyle)}></input>
            </label>
          </div>
          <div className='flexbox2 '>
            <label className='label'>
              Expiration Date
              <input id="ccn" className='input' inputMode='numeric' type="number" placeholder="Month" onInput={(e) => { e.target.value = number_format(e.target.value, 2, setMm) }} onFocus={() => finSetFocus(elDate)} onBlur={() => setStyle(defaultStyle)}></input>
            </label>
            <label className='label'>
              <span> ‌</span>
              <input className='input' type="text" inputMode='number' placeholder="ّYear" onInput={(e) => { e.target.value = number_format(e.target.value, 2, setYY) }} onFocus={() => finSetFocus(elDate)}  onBlur={() => setStyle(defaultStyle)}></input>
            </label>
            <label className='label'>
              cvv
              <input className='input' type="text" inputMode='number' placeholder="" onInput={(e) => { e.target.value = number_format(e.target.value, 4, setCvv) }} onFocus={() => setCvvclass(!Cvvclass)} onBlur={() => setCvvclass(!Cvvclass)}></input>
            </label>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
