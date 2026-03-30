// Would include an expiry date for better protection in real world scenario
import type { Organization } from "./Organization";
import type { User } from "./User";

export interface JWTPayload {
    user: User;
    tenant: Organization;
}