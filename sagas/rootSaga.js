import { all } from "redux-saga/effects";

import authSaga from "./Auth/authSaga";
import connectStudentSaga from "./Teacher/ConnectStudents/connectStudentSaga";

//  Combining all sagas
export default function* rootSaga() {
  yield all([authSaga(), connectStudentSaga()]);
}
