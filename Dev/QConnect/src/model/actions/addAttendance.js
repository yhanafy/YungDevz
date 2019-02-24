export const addAttendance = (classIndex, attendanceInfo) => (
    {
        type: 'ADD_ATTENDANCE',
        classIndex,
        attendanceInfo
    }
);