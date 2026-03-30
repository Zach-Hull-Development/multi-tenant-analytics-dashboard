export enum AnalyticEventType {
    VIEW = 'view',
    SIGN_UP = 'signup',
    DONATION = 'donation'
}

export interface AnalyticEvent {
    id: string,
    organizationId: string,
    type: AnalyticEventType
    timestamp: string,
}

export interface AnalyticEventSummary {
    totalEventCount: number,
    viewCount: number,
    signupCount: number,
    donationCount: number,
}

export const EventSummaryToEventType: Record<string, string> = {
    totalEventCount: 'all',
}
EventSummaryToEventType['viewCount'] = AnalyticEventType.VIEW;
EventSummaryToEventType['signupCount'] = AnalyticEventType.SIGN_UP;
EventSummaryToEventType['donationCount'] = AnalyticEventType.DONATION;