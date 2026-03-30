import type { Organization } from "../models/Organization";

export const alphaOrganization: Organization = {
    id: '1',
    name: 'Alpha',
};

export const betaOrganization: Organization = {
    id: '2',
    name: 'Beta',
}

const organizationRecord: Record<string, Organization> = {}
organizationRecord[alphaOrganization.id] = alphaOrganization;
organizationRecord[betaOrganization.id] = betaOrganization;

export const getOrganizationById = (tenantId: string): Organization | null => {
    return organizationRecord[tenantId] ?? null;
}