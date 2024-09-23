import { useEffect, useState } from 'react'
import { getData } from '../../store/slice/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Card/Card'
import styles from './Table.module.scss'
import { changeFilter } from '../../store/slice/filterSlice'
import { selectCard } from '../../store/slice/selectors'

export default function Table(){
    const dispatch = useDispatch();
    const data = useSelector(selectCard);

    const [state, setState] = useState(false);

    const handleSetState = () =>{
        setState(!state);
    }

    useEffect(()=>{
        dispatch(getData())
    },[])

    useEffect(()=>{
        dispatch(changeFilter(state))
    })

    return(
        <div>
            <button className={styles.filter} onClick={handleSetState}><img src="assets/img/filter.png" alt="Иконка фильтра" /></button>
        <div className={styles.wrapper}>
            {data.map((item) =>(
                <Card key={item.kinopoiskId} id={item.kinopoiskId} type={item.type} year={item.year} url={item.posterUrl} name={item.nameRu}/>
            ))}
        </div>
        </div>
    )
}