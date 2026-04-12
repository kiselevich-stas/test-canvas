export type SettingsPrivacyValue =
    | 'direct_partners'
    | 'all_members'
    | 'admins_only'

export type SettingsNotificationKey =
    | 'scam_alerts'
    | 'connection_requests'
    | 'connection_confirmations'
    | 'network_news'

export interface NotificationSettingItem {
    key: SettingsNotificationKey
    title: string
    description: string
    enabled: boolean
}

export interface PrivacyOptionItem {
    value: SettingsPrivacyValue
    label: string
}

export interface UserSettingsData {
    notifications: NotificationSettingItem[]
    privacy: SettingsPrivacyValue
}