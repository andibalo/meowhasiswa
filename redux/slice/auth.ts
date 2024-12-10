import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authApi, subThreadsApi, threadsApi, universityApi, userApi } from "redux/api";
import { login as loginService, register as registerService } from "services/auth";
import { ILoginRequest, IRegisterRequest } from "types/request/auth";
import { APIResponse } from "types/response/common";

const initialState = {
	token: "",
	isBiometricAuthEnabled: false,
	isBiometricAuthenticated: false,
}

export const register = createAsyncThunk(
	"auth/register",
	async (req: IRegisterRequest) => {
		//TODO: add error handling
		try {
			const res = await registerService(req);

			return res?.data;
		} catch (e) {
			console.log(e, "REGISTER ERR")
			throw e
		}
	}
);


export const login = createAsyncThunk(
	"auth/login",
	async (req: ILoginRequest) => {
		//TODO: add error handling
		try {
			const res = await loginService(req);

			return res?.data;
		} catch (e) {
			console.log(e, "LOGIN ERR")

			throw e
		}
	}
);

interface ISetIsBiometricAuthEnabledPayload {
	isEnabled: boolean
	shouldAuthenticate?: boolean
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload
		},
		setIsBiometricAuthEnabled: (state, action: PayloadAction<ISetIsBiometricAuthEnabledPayload>) => {
			state.isBiometricAuthEnabled = action.payload.isEnabled

			if (action.payload.shouldAuthenticate) {
				state.isBiometricAuthenticated = true
			}
		},
		setIsBiometricAuthenticated: (state, action: PayloadAction<boolean>) => {
			state.isBiometricAuthenticated = action.payload
		},
		logout: (state) => {
			state.isBiometricAuthEnabled = false
			state.isBiometricAuthenticated = false
			state.token = ""
		}
	},
	extraReducers: (builder) => {
		builder.addCase(
			login.fulfilled,
			(
				state,
				action: PayloadAction<APIResponse<string> | undefined>
			) => {
				if (action.payload && action.payload.data) {
					state.token = action.payload.data;
				}
			}
		);
	},
})

export const { setToken, setIsBiometricAuthEnabled, setIsBiometricAuthenticated, logout } = authSlice.actions

export default authSlice.reducer

export const logoutAndResetCache = () => (dispatch) => {
	dispatch(logout());
	dispatch(threadsApi.util.resetApiState());
	dispatch(authApi.util.resetApiState());
	dispatch(subThreadsApi.util.resetApiState());
	dispatch(universityApi.util.resetApiState());
	dispatch(userApi.util.resetApiState());
};