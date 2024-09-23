import { createSelector } from "@reduxjs/toolkit";

export const selectAllCards = state => state.data.data;
export const selectActiveFilter = state => state.filter;

export const selectCard = createSelector(
    [selectAllCards, selectActiveFilter],
    (allCards, activeFilter) => {
        if(activeFilter === false) return allCards;
        if(activeFilter === true){
            return allCards.filter(item => item.hasLike)
        } 
    },
)