import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { login as loginService, register as registerService } from "services/auth";
import { ILoginRequest, IRegisterRequest } from "types/request/auth";
import { APIResponse } from "types/response/common";

const initialState = {
	token: ""
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
			// if (e instanceof ResponseError) {
			// 	const err = await wrapError(e);
			// 	return rejectWithValue({
			// 		meta: {
			// 			statusCode: e.response.status,
			// 			message:
			// 				e.response.status === HttpStatus.InternalServerError
			// 					? serverEncounterError
			// 					: err.message,
			// 		},
			// 	});
			// }
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
			// if (e instanceof ResponseError) {
			// 	const err = await wrapError(e);
			// 	return rejectWithValue({
			// 		meta: {
			// 			statusCode: e.response.status,
			// 			message:
			// 				e.response.status === HttpStatus.InternalServerError
			// 					? serverEncounterError
			// 					: err.message,
			// 		},
			// 	});
			// }
		}
	}
);


const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload
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

export const { setToken } = authSlice.actions

export default authSlice.reducer