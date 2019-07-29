import actionTypes from './actionTypes';

export const addAttendance = (classId, date, attendanceInfo) => (
    {
        type: actionTypes.ADD_ATTENDANCE,
        classId,
        date,
        attendanceInfo,
    }
);