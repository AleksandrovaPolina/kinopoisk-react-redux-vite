import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { removeCard, toggleLikeCard } from '../../store/slice/dataSlice'
import styles from './Card.module.scss'

export default function Card({url, name, type, year, id}){
    const dispatch = useDispatch();

    const [toggleState, setToggleState] = useState(false);
    const handle = (id)=>{
        setToggleState(!toggleState)
        dispatch(toggleLikeCard(id))
    }


    return(
        <>
        <div className={styles.container}>
            <div className={styles.container__img}>
                <img className={styles.img} src={url} alt="Постер" />
            </div>
            <div className={styles.container__info}>
                <p>{year} ●</p>
                <p>{type} ●</p>
                <p>{name}</p>
            </div>
            <div className={styles.symbols}>
                {toggleState === true? 
                <button className={styles.like} onClick={()=>handle(id)}><img src="assets/img/like2.png" alt="Кнопка лайк" /></button> 
                : 
                <button className={styles.like} onClick={()=>handle(id)}><img src="assets/img/like1.png" alt="Кнопка лайк" /></button>}
                    <button className={styles.delete} onClick={()=>dispatch(removeCard(id))}><img src="assets/img/delete.png" alt="Кнопка удаления" /></button> 
                </div>
        </div>
        </>
    )
}