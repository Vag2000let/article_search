import {CREATE_TEXT} from "./types";

export default function createText(title) {
    return {
        type: CREATE_TEXT,
        payload: title
    }
}