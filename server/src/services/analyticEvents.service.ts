import { AnalyticEventType, type AnalyticEvent, type AnalyticEventSummary } from "../models/AnalyticEvent";
import { alphaOrganization, betaOrganization, getOrganizationById } from "./organization.service";

export const mockAlphaEvents: AnalyticEvent[] = [
    {
        id: '100',
        organizationId: alphaOrganization.id,
        type: AnalyticEventType.SIGN_UP,
        timestamp: new Date(2026, 0, 1).toISOString(),
    },
    {
        id: '101',
        organizationId: alphaOrganization.id,
        type: AnalyticEventType.VIEW,
        timestamp: new Date(2026, 0, 1).toISOString(),
    },
    {
        id: '102',
        organizationId: alphaOrganization.id,
        type: AnalyticEventType.VIEW,
        timestamp: new Date(2026, 0, 1).toISOString(),
    },
    {
        id: '103',
        organizationId: alphaOrganization.id,
        type: AnalyticEventType.DONATION,
        timestamp: new Date(2026, 0, 2).toISOString(),
    },
    {
        id: '104',
        organizationId: alphaOrganization.id,
        type: AnalyticEventType.DONATION,
        timestamp: new Date(2026, 0, 2).toISOString(),
    },
    {
        id: '105',
        organizationId: alphaOrganization.id,
        type: AnalyticEventType.VIEW,
        timestamp: new Date(2026, 0, 3).toISOString(),
    },
];

export const mockBetaEvents: AnalyticEvent[] = [
    {
        id: '200',
        organizationId: betaOrganization.id,
        type: AnalyticEventType.SIGN_UP,
        timestamp: new Date(2026, 5, 21).toISOString(),
    },
    {
        id: '201',
        organizationId: betaOrganization.id,
        type: AnalyticEventType.VIEW,
        timestamp: new Date(2026, 5, 22).toISOString(),
    },
    {
        id: '203',
        organizationId: betaOrganization.id,
        type: AnalyticEventType.DONATION,
        timestamp: new Date(2026, 5, 22).toISOString(),
    },
    {
        id: '204',
        organizationId: betaOrganization.id,
        type: AnalyticEventType.SIGN_UP,
        timestamp: new Date(2026, 5, 23).toISOString(),
    },
    {
        id: '205',
        organizationId: betaOrganization.id,
        type: AnalyticEventType.VIEW,
        timestamp: new Date(2026, 5, 25).toISOString(),
    },
    {
        id: '206',
        organizationId: betaOrganization.id,
        type: AnalyticEventType.DONATION,
        timestamp: new Date(2026, 5, 25).toISOString(),
    },
];

const mockEvents = [...mockAlphaEvents, ...mockBetaEvents];
 
export const getOrganizationAnalyticsSummary = (tenantId: string): AnalyticEventSummary | null => {
    const organization = getOrganizationById(tenantId);
    
    if (!organization) return null;

    const orgEvents = mockEvents.filter((event) => event.organizationId === tenantId);
    
    return {
        totalEventCount: orgEvents.length,
        viewCount: orgEvents.filter((event) => event.type === AnalyticEventType.VIEW).length,
        signupCount: orgEvents.filter((event) => event.type === AnalyticEventType.SIGN_UP).length,
        donationCount: orgEvents.filter((event) => event.type === AnalyticEventType.DONATION).length,
    };
}

export const getOrganizationAnalyticEvents = (tenantId: string): AnalyticEvent[] | null => {
    const organization = getOrganizationById(tenantId);
    if (!organization) return null;
    const orgEvents = mockEvents.filter((event) => event.organizationId === tenantId);

    return orgEvents
}