// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
//
// function App() {
//
//     return (
//         <BrowserRouter basename="/">
//             <div>
//                 <ul>
//                     <li>
//                         <Link to="/">Старт</Link>
//                     </li>
//                     <li>
//                         <Link to="/new">Хочу на страницу с чем-то новеньким</Link>
//                     </li>
//                 </ul>
//                 <hr />
//             <Routes>
//                 <Route path="/" element={<h1>Это наша стартовая страница</h1>} />
//                 <Route path="/new" element={<h1>Это наша страница с чем-то новеньким</h1>} />
//             </Routes>
//             </div>
//         </BrowserRouter>
//     );
// }
//
// export default App;

// import React, {useEffect, useState} from 'react';
//
// const data = [
//     'Эндрю Робертсон',
//     'Рахим Стерлинг',
//     'Эдерсон Мораес',
//     'Маркус Рэшфорд',
//     'Алекс Ивоби',
//     'Майкл Антонио',
//     'Карим Бензема',
//     'Ансу Фати',
//     'Пауло Дибала',
//     'Тео Эрнандез',
//     'Марко Ройс',
// ]

// function StartPage() {
//
//     // В функциональных компонентах для работы с состоянием можно использовать хук useState()
//     // Он возвращает кортеж из двух элементов:
//     // 1 элемент - объект состояния
//     // 2 элемент - метод который позволит нам обновить состояние
//     const [randomName, setRandomName] = useState();
//
//     // Кстати, это хороший пример деструктуризации массива в JavaScript
//     const [names, setNames] = useState(data);
//
//     const [showNames, setShowNames] = useState(false);
//
//     // В данном хендлере мы изменяем состояние на какое-то конкретное
//     const handleShowNames = () =>{
//         setShowNames(true)
//     }
//
//     // В данном хендлере мы изменяем состояние на какое-то конкретное
//     const handleHideNames = () =>{
//         setShowNames(false)
//     }
//
//     // В данном хендлере мы изменяем состояние в зависимости от его прошлого значения
//     const handleSwitch = () =>{
//         // метод из useState может принимать как определенное значение, так и метод,
//         // принимающий прошлое значение и возвращающий новое
//         setShowNames(state => !state)
//     }
//
//     useEffect(()=>{
//         console.log('Этот код выполняется только на первом рендере компонента')
//         // В данном примере можно наблюдать Spread syntax (Троеточие перед массивом)
//         //SetNames(names=>[...names, ''])
//
//         return () => {
//             console.log('Этот код выполняется, когда компонент будет размонтирован')
//         }
//     },[])
//
//     useEffect(()=>{
//         console.log('Этот код выполняется каждый раз, когда изменится состояние showNames ')
//         setRandomName(names[Math.floor(Math.random()*names.length)])
//     },[showNames])
//
//
//     return (
//         <div>
//             <h3>Случайный футболист из списка: {randomName}</h3>
//             {/*Кнопка для того, чтобы показать футболистов*/}
//             <button onClick={handleShowNames}>Хочу увидеть список футболистов</button>
//             {/*Кнопка для того, чтобы скрыть футболистов*/}
//             <button onClick={handleHideNames}>Хочу скрыть список футболистов</button>
//
//             {/*Универсальная кнопка*/}
//             <button onClick={handleSwitch}>{showNames ? 'Хочу скрыть список футболистов' :'Хочу увидеть список футболистов' }</button>
//
//             {/*React отрисует список только если showNames будет равен true, boolean значения игнорируются при отрисовке*/}
//             {showNames && <ul>
//                 {/*Рекомендую почитать про прекрасные встроенные методы массивов в JavaScript    */}
//                 {names.map((name, index)=>{
//                     return (
//                         <li key={index}>
//                             <span>{name}</span>
//                         </li>
//                     )
//                 })}
//             </ul>
//             }
//         </div>
//     );
// }
//
// export default StartPage;

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Spinner} from "react-bootstrap";


function App() {

    return (
        <BrowserRouter basename="/">
            <div>
                <ul>
                    <li>
                        <Link to="/">Старт</Link>
                    </li>
                    <li>
                        <Link to="/new">Хочу на страницу с чем-то новеньким</Link>
                    </li>
                </ul>
                <hr />
                <Routes>
                    <Route path="/" element={<h1>Это наша стартовая страница</h1>} />
                    <Route path="/new" element={<h1>Это наша страница с чем-то новеньким</h1>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}




const data = [
    'Эндрю Робертсон',
    'Рахим Стерлинг',
    'Эдерсон Мораес',
    'Маркус Рэшфорд',
    'Алекс Ивоби',
    'Майкл Антонио',
    'Карим Бензема',
    'Ансу Фати',
    'Пауло Дибала',
    'Тео Эрнандез',
    'Марко Ройс',
]




const getTransferByID = async (name = 'Криштиану Роналду') =>{
    const res = await fetch(`http://127.0.0.1:8000/find/?format=json&search=${name}`)
        .then((response) => {
            return response.json();
        }).catch(()=>{
            return {resultCount:0, results:[]}
        })
    return res
}


function TransfersPage() {

    const [searchValue, setSearchValue] = useState('Криштиану Роналду');

    const [loading, setLoading] = useState(false)

    const [team, setTransfer] = useState([])

    const handleSearch = async () =>{
        await setLoading(true);
        const { results } = await getTransferByID(searchValue);
        console.log(await getTransferByID(searchValue));
        console.log(results);
        await setTransfer(results);
        await setLoading(false)
    }

    return (
        <Button disabled={loading} onClick={handleSearch}>Искать</Button>
    );
}

export default TransfersPage;