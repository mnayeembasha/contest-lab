import { BACKEND_URL } from "@/config";
import axios from "axios";
import { atom, selector } from "recoil";

export const problemsAtom = atom({
    key:'problemsAtom',
    default:selector({
        key:'problemsAtomSelector',
        get:async()=>{
            const res = await axios.get(`${BACKEND_URL}/api/questions`);
            return res.data.questions;
        }
    })
});

