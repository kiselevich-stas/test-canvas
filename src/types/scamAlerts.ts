export type ScamAlertSeverity = 'critical' | 'high' | 'medium' | 'low'

export type ScamAlertType =
    | 'fraud'
    | 'chargeback'
    | 'scam'
    | 'delay'
    | 'aml'

export type ScamAlertStatus =
    | 'open'
    | 'watching'
    | 'resolved'

export interface ScamAlertItem {
    id: number
    title: string
    description: string

    type: ScamAlertType
    severity: ScamAlertSeverity
    status: ScamAlertStatus

    isCommunityConfirmed: boolean

    node: {
        name: string
        shortName: string
    }

    reporter: {
        name: string
        shortName: string
    }

    confirmationsCount: number
    createdAt: string
    riskTrendDays: number
}