import actionTypes from './actionTypes';

export const addAttendance = (classId, attendanceInfo) => (
    {
        type: actionTypes.ADD_ATTENDANCE,
        classId,
        attendanceInfo
    }
);