import {createDraftSafeSelector} from "@reduxjs/toolkit";


const textsState = (state) => state.texts
export const draftSafeSelector = createDraftSafeSelector(textsState, (state) => state.value)
