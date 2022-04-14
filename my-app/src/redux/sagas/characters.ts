import {all, fork, put, takeEvery} from "redux-saga/effects";
import {AxiosResponse} from "axios"
import { getFoundCharacters, getCharacterByIdApi, getCharactersPageApi } from "../../api/api";
import { GET_CHARACTERS, GET_CHARACTERS_PAGE, GET_CHARACTER_BY_ID } from "redux/actionTypes";
import { getCharacterByIdFailed, getCharacterByIdSuccess, getCharactersFailed, getCharactersPageInfo, getCharactersSuccess } from "redux/actions/characters";


function* getCharactersSaga(charName: any) {
    try {
        const response:AxiosResponse<any> = yield getFoundCharacters(charName.payload);
        const {data: {results, info}} = response;
        
        yield put(getCharactersSuccess(results));
        yield put(getCharactersPageInfo(info))
    } catch (err) {
        console.log(err)
        yield put(getCharactersFailed())
    }
}

function* getCharacterByIdSaga(id: any) {
    try {
        const response:AxiosResponse<any> = yield getCharacterByIdApi(id.payload);
        const {data} = response;

        yield put(getCharacterByIdSuccess(data));
    } catch (err) {
        console.log(err)
        yield put(getCharacterByIdFailed())
    }
}

export function* getCharactersFork() {
    yield takeEvery(GET_CHARACTERS, getCharactersSaga);
};

export function* getCharacterByIdFork() {
    yield takeEvery(GET_CHARACTER_BY_ID, getCharacterByIdSaga)
};

export default function* rootSaga() {
    yield all([
        fork(getCharactersFork),
        fork(getCharacterByIdFork),
    ])
};