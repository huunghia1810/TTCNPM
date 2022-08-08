import * as  constantMenu from '../../constants/Menu'

const initialState = {
  fetching: false,
  configs: {},
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case  constantMenu.MENU_GET_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        configs: {},
        error: null,
      }
    case  constantMenu.MENU_GET_DATA_SUCCESS:
      let { configs } = action.payload
      if(typeof configs === 'string') {
        configs = JSON.parse(configs)
      }
      return {
        ...state,
        fetching: false,
        configs: configs,
        error: null,
      }
    case  constantMenu.MENU_GET_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        configs: {},
        error: action.payload,
      }

    default:
      return state
  }
}

//sample configs
const aaaa = [
  {
    category: {
      name: 'Nướng',
      img: 'https://thegangs.onha.vn/images/repo/Tomahawk%20Beef%20890k%20(%201kg%20).jpg',
    },
    items: [
      {
        name: 'Đùi cừu nướng',
        price: 299000,
        description: 'Đùi cừu nướng trọng lương 300gr',
        option: [
          {
            name: 'Nướng ngói',
            description: '',
          },
          {
            name: 'Nướng lu',
            description: '',
          },
        ]
      },
      {
        name: 'Mực nướng sa tế / muối ớt',
        price: 239000,
        description: '200gr',
        option: [
          {
            name: 'Sa tế',
            description: '',
          },
          {
            name: 'Muối ớt',
            description: '',
          },
        ]
      },
      {
        name: 'Rau củ nướng',
        price: 70000,
        description: '210gr',
      }
    ]
  },
  {
    category: {
      name: 'Lẩu',
      img: 'https://thegangs.onha.vn/images/repo/91647914_505934110315337_91887878950354944_n.jpg',
    },
    items: [
      {
        name: 'Lẩu cá hồi',
        price: 199000,
        description: 'cho 2 người ăn',
      },
      {
        name: 'Lẩu cá kèo',
        price: 160000,
        description: '',
      },
      {
        name: 'Lẩu cá thác lác',
        price: 179000,
        description: '',
      }
    ]
  },
  {
    category: {
      name: 'Cơm chiên',
      img: 'https://thegangs.onha.vn/images/repo/com%20toi%20chiren.jpg',
    },
    items: [
      {
        name: 'Cơm chiên cá mặn',
        price: 199000,
        description: '',
      },
      {
        name: 'Cơm chiên hải sản',
        price: 1890000,
        description: '',
      },
      {
        name: 'Cơm chiên tỏi ớt',
        price: 279000,
        description: '',
      }
    ]
  },
  {
    category: {
      name: 'Súp',
      img: 'https://thegangs.onha.vn/images/repo/goi%20hs.jpg',
    },
    items: [
      {
        name: 'Súp cá hồi NaUy',
        price: 369000,
        description: '',
      },
      {
        name: 'Súp kim chi hải sản',
        price: 259000,
        description: '',
      },
    ]
  },
]