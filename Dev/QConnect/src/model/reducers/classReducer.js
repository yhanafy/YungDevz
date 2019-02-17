import { combineReducers } from 'redux';

const INITIAL_STATE = {
  students: [
    {
      name: "Ahmed Reducer",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      assignment: "Al-Nahl page 5"
    },
    {
      name: "Amina Khan",
      avatar: "https://randomuser.me/api/portraits/thumb/women/42.jpg",
      assignment: "An-Naze'aat"
    },
    {
      name: "Ayoub Barrak",
      avatar: "https://randomuser.me/api/portraits/thumb/men/43.jpg",
      assignment: "Aal-Imran"
    },
    {
      name: "Khaled Kwick",
      avatar: "https://randomuser.me/api/portraits/thumb/men/45.jpg",
      assignment: "Al-Toor pages 2,3"
    },
    {
      name: "Yassine Lightening",
      avatar: "https://randomuser.me/api/portraits/thumb/men/22.jpg",
      assignment: "Al-An'aam"
    },
    {
      name: "Yusuf Awesome",
      avatar: "https://randomuser.me/api/portraits/thumb/men/26.jpg",
      assignment: "Huud, pages 3 and 4"
    }
  ]
};

const classReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  classroom: classReducer,
});