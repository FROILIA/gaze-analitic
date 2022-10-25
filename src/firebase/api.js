import { getDatabase, ref, set, push, update, child, get } from 'firebase/database';
import { FIREBASE_RESULTS_PATH, FIREBASE_USERS_PATH } from '../constants';

const createUser = async (name, callback) => {
    const db = getDatabase();
    try {
        const newUserKey = await push(child(ref(db), FIREBASE_USERS_PATH)).key;
        const valueToSubmit = { name: name, results: '' };
        set(ref(db, `${FIREBASE_USERS_PATH}/${newUserKey}`), valueToSubmit).then(
            callback(newUserKey),
        );
    } catch (e) {
        console.log('firebase api error', e);
    }
};

const updateUserData = async (id, data, callback) => {
    const db = getDatabase();

    try {
        const newResultKey = push(child(ref(db), 'results')).key;
        const valueToSubmit = {
            [`${FIREBASE_USERS_PATH}/${id}/results`]: data,
            [`${FIREBASE_RESULTS_PATH}/${newResultKey}`]: data,
        };
        await update(ref(db), valueToSubmit).then(callback());
    } catch (e) {
        console.log('firebase api error', e);
    }
};

const pushUserResult = async (userId, data, callback) => {
    const db = getDatabase();

    try {
        const newResultKey = push(child(ref(db), 'results')).key;
        const valueToSubmit = {
            [`${FIREBASE_USERS_PATH}/${userId}/results/${newResultKey}`]: data,
            [`${FIREBASE_RESULTS_PATH}/${newResultKey}`]: data,
        };
        await update(ref(db), valueToSubmit).then(callback());
    } catch (e) {
        console.log('firebase api error', e);
    }
};

const getUserData = async (id, callback) => {
    const dbRef = ref(getDatabase());
    let res;
    try {
        get(child(dbRef, `${FIREBASE_USERS_PATH}/${id}${FIREBASE_RESULTS_PATH}`)).then(
            async (snapshot) => {
                if (snapshot.exists()) {
                    res = await snapshot.val();
                    callback(res);
                } else {
                    console.log('No data available');
                }
            },
        );
    } catch (e) {
        console.log('firebase api error', e);
    }
    return res;
};

export { createUser, updateUserData, getUserData, pushUserResult };
