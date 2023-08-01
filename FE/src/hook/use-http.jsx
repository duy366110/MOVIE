import { useState, useReducer } from 'react';
import { useDispatch } from "react-redux";
import { loaderStart, loaderEnd } from "../store/store-page";

const errorReducer = (state, action) => {
    if(action.type === "ERROR") {
        return {
            status: true,
            message: action.message
        }
    }

    if(action.type === "UNERROR") {

        return {
            status: false,
            message: ''
        }
    }

    return state;
}

const useHttp = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [errorInfor, errorInforDispatch] = useReducer(errorReducer, {status: false, message: ''});

    const httpRequest = async (option = {url: '', method: '', author: '', payload: null}, callback, element = null) => {
        dispatch(loaderStart());

        try {
            const res = await fetch(option.url, {
                method: option.method? option.method : 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    Authorization: option.author? option.author : ''
                },
                body: option.payload? JSON.stringify(option.payload) : null,
            });
    
            if(!res.ok) {
                throw new Error('Request server failed');
            }

            errorInforDispatch({type: 'UNERROR'});
            const data = await res.json();
            callback(data, element);

        } catch (error) {
            errorInforDispatch({type: 'ERROR', message: error.message});

        }
        dispatch(loaderEnd());

        setTimeout(() => {
            errorInforDispatch({type: 'UNERROR'});
            
        }, 1500)

    }

    return {
        loader,
        errorInfor,
        httpRequest
    }
}

export default useHttp;