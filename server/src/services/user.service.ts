import type { User } from "../models/User";
import { alphaOrganization, betaOrganization } from "./organization.service";

export const mockUsers: Record<string, User> = {
	"1": {
		id: '1',
		firstName: 'Zach',
		lastName: 'Hull',
		organizationId: alphaOrganization.id,
	},
	"2": {
		id: '2',
		firstName: 'Vahida',
		lastName: 'Shaikh',
		organizationId: betaOrganization.id
	},
}

export const getUserById = (userId: string): User | null=> {
	return mockUsers[userId] ?? null;
}