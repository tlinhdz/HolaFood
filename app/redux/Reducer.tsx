import { AppStateStatus } from "react-native";
import { AnyAction } from 'redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { CategoryData } from "../components/Home/CategoryList";
import { OrderData } from "../components/Order/OrderItem";
import { CartItemData } from "../components/Order/Cart";

export type AppState = {
    userApiToken: string,
    applicationState: AppStateStatus,
    theme: AppTheme,
    language: AppLanguage,
    userType: UserType,
    newOrderNotification: boolean,
    selectedBottomTabIndex: number,
    categoryList: CategoryData[],
    cartItems: CartItemData[],
    orders: OrderData[],
    shipperOrderQueue: OrderData[],
    userInfo: UserInfo | undefined,
    userAddressList: UserAddress[]
}

export type AppTheme = "dark" | "light"
export type AppLanguage = "en" | "vi"

// admin 1
// customer 2
// shop 3
// shipper 4
export type UserType = "customer" | "shipper"
export type UserInfo = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    role: string
}

export type UserAddress = {
    id: number,
    address: string
}

const initalStates: AppState = {
    userApiToken: '',
    applicationState: "unknown",
    theme: "light",
    language: "vi",
    userType: 'customer',
    newOrderNotification: false,
    selectedBottomTabIndex: 0,
    categoryList: [],
    cartItems: [],
    orders: [],
    shipperOrderQueue: [],
    userInfo: undefined,
    userAddressList: []
}

const MainAppReducer = createSlice({
    name: 'mainAppReducer',
    initialState: initalStates,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo>) => { state.userInfo = action.payload; return state },
        setUserApiToken: (state, action: PayloadAction<string>) => { state.userApiToken = action.payload; return state },
        changeApplicationState: (state, action: PayloadAction<AppStateStatus>) => { state.applicationState = action.payload; return state },
        changeTheme: (state, action: PayloadAction<AppTheme>) => { state.theme = action.payload; return state },
        changeLanguage: (state, action: PayloadAction<AppLanguage>) => { state.language = action.payload; return state },
        setUserType: (state, action: PayloadAction<UserType>) => { state.userType = action.payload; return state },
        setNewOrderNotification: (state, action: PayloadAction<boolean>) => { state.newOrderNotification = action.payload; return state },
        setSelectedBottomTabIndex: (state, action: PayloadAction<number>) => { state.selectedBottomTabIndex = action.payload; return state },
        setStateListCategory: (state, action: PayloadAction<CategoryData[]>) => { state.categoryList = action.payload; return state },
        setCartItems: (state, action: PayloadAction<CartItemData[]>) => { state.cartItems = action.payload; return state },
        addCartItems: (state, action: PayloadAction<CartItemData[]>) => { state.cartItems = [...action.payload, ...state.cartItems]; return state },
        updateCartItem: (state, action: PayloadAction<CartItemData>) => {
            const index = state.cartItems.findIndex((i) => i.id == action.payload.id);
            if (index != -1) {
                state.cartItems[index] = action.payload
                state.cartItems = [...state.cartItems];
            }

            return state
        },
        deleteCartItems: (state, action: PayloadAction<number[]>) => {
            action.payload.forEach((v) => {
                const index = state.cartItems.findIndex((i) => i.id == v);
                if (index != -1) {
                    state.cartItems.splice(index, 1)
                }
            })

            state.cartItems = [...state.cartItems];
            return state
        },
        setOrders: (state, action: PayloadAction<OrderData[]>) => { state.orders = action.payload; return state },
        addOrders: (state, action: PayloadAction<OrderData[]>) => { state.orders = [...action.payload, ...state.orders]; return state },
        updateOrder: (state, action: PayloadAction<OrderData>) => {
            const index = state.orders.findIndex((i) => i.id == action.payload.id);
            if (index != -1) {
                state.orders[index] = action.payload
                state.cartItems = [...state.cartItems];
            }

            return state
        },
        removeOrder: (state, action: PayloadAction<number>) => { state.orders = state.orders.filter((item) => item.id != action.payload); return state },
        setOrderQueue: (state, action: PayloadAction<OrderData[]>) => { state.shipperOrderQueue = action.payload; return state },
        removeOrderFromOrderQueue: (state, action: PayloadAction<number>) => { state.shipperOrderQueue = state.shipperOrderQueue.filter((item) => item.id != action.payload); return state },
        addOrderToOrderQueue: (state, action: PayloadAction<OrderData[]>) => { state.shipperOrderQueue = [...action.payload, ...state.shipperOrderQueue]; return state },
        setUserAddressList: (state, action: PayloadAction<UserAddress[]>) => { state.userAddressList = action.payload; return state },
        deleteUserAddress: (state, action: PayloadAction<number>) => { state.userAddressList = [...state.userAddressList.filter((i) => i.id != action.payload)]; return state },
        clearUserInfo: (state, action: PayloadAction<null>) => { 
            state.cartItems = []
            state.categoryList = []
            state.orders = []
            state.shipperOrderQueue = []
            state.userInfo = undefined
            state.userAddressList = []

            return state
         }
    }
})

export const {
    setUserInfo,
    setUserApiToken,
    changeApplicationState,
    changeTheme,
    changeLanguage,
    setUserType,
    setNewOrderNotification,
    setSelectedBottomTabIndex,
    setStateListCategory,
    setCartItems,
    addCartItems,
    updateCartItem,
    deleteCartItems,
    setOrders,
    addOrders,
    removeOrder,
    updateOrder,
    setOrderQueue,
    removeOrderFromOrderQueue,
    addOrderToOrderQueue,
    setUserAddressList,
    deleteUserAddress,
    clearUserInfo
} = MainAppReducer.actions

export const reducer = MainAppReducer.reducer



