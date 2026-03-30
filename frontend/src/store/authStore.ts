import { create } from 'zustand';

interface User {
	id: string,
	firstName: string,
	lastName: string,
	organizationId: string,
}

interface Organization {
	id: string,
	name: string,
}

export interface LoginResponse {
	token: string,
	user: User,
	tenant: Organization,
}

interface AuthState {
	token: string | null,
	user: User | null,
	organization: Organization | null,
	login: (loginResponse: LoginResponse) => void,
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	token: null,
	userId: null,
	user: null,
	organization: null,
	login: ( loginResponse: LoginResponse ) => {
		set({
			token: loginResponse.token,
			user: loginResponse.user,
			organization: loginResponse.tenant
		})
	},
	logout: () => set({
		token: null,
		user: null,
		organization: null,
	})
}));