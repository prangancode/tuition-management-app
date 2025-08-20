import { all } from "redux-saga/effects";

import authSaga from "./Auth/authSaga";
import connectStudentSaga from "./Teacher/ConnectStudents/connectStudentSaga";
import scheduleTuitionEventsSaga from "./Teacher/Schedule/scheduleTuitionEventsSaga";
import studentManagementSaga from "./Teacher/StudentManagement/studentManagementSaga";

//  Combining all sagas
export default function* rootSaga() {
  yield all([
    authSaga(),
    connectStudentSaga(),
    scheduleTuitionEventsSaga(),
    studentManagementSaga(),
  ]);
}
