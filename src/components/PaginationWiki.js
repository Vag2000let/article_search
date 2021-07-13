import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useState} from "react";
import {colorItem} from "../toolkitRedux/fetchReducer";


export const usePaginationWiki = () => {
    const wikiTexts = useSelector(state => state.fetch.fetchTexts)
    const dispatch = useDispatch();

    const [page, setPage] = useState(1)
    const [pageLength, setPageLength] = useState(5)
    const [currentItem, setCurrentItem] = useState(undefined)
    const totalPages = Math.ceil(wikiTexts && wikiTexts.length / pageLength)
    const items = useMemo(
        () => wikiTexts && wikiTexts.filter((item, key) => {
            if ((page - 1) * pageLength <= key && key < page * pageLength)
                return true;
            return false;
        }), [page, wikiTexts, pageLength]
    );
    // console.log("I am items", items)

    useEffect(() => {
        setPage(1);
    }, [pageLength]);

    const handleChange = useCallback((event, value) => {
        setPage(value)
    }, []);

    const closeModal = useCallback(() => {
        setCurrentItem(undefined)
    }, []);

    const changeColor = (item) => {
        setCurrentItem(item.title)
        dispatch(colorItem(item.id))
        return currentItem
    }

    return {
        changeColor,
        closeModal,
        handleChange,
        items,
        totalPages,
        setPageLength,
        pageLength,
        currentItem
    }

}