import {
    SAVED_USER_IS_CALIBRATED,
    SAVED_USER_KEY,
    SAVED_USER_NAME,
    SAVED_USER_HAS_RESULT,
    PATH_HOME,
} from './../constants';

const logout = (navigate) => {
    localStorage.removeItem(SAVED_USER_NAME);
    localStorage.removeItem(SAVED_USER_KEY);
    localStorage.removeItem(SAVED_USER_HAS_RESULT);
    localStorage.removeItem(SAVED_USER_IS_CALIBRATED);
    navigate(PATH_HOME);
};
export default logout;
