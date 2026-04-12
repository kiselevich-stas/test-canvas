import type {PrivacyOptionItem, UserSettingsData} from "../../src/types/settings";

export const mockSettingsData: UserSettingsData = {
    notifications: [
        {
            key: 'scam_alerts',
            title: 'Скам-алерты',
            description: 'При появлении новых жалоб на скам',
            enabled: false,
        },
        {
            key: 'connection_requests',
            title: 'Запросы на связь',
            description: 'Когда партнёр отправляет запрос',
            enabled: false,
        },
        {
            key: 'connection_confirmations',
            title: 'Подтверждение связей',
            description: 'При подтверждении партнёрства',
            enabled: false,
        },
        {
            key: 'network_news',
            title: 'Новости сети',
            description: 'Обновления платформы Twix',
            enabled: false,
        },
    ],
    privacy: 'direct_partners',
}

export const privacyOptions: PrivacyOptionItem[] = [
    {
        value: 'direct_partners',
        label: 'Только прямые партнёры',
    },
    {
        value: 'all_members',
        label: 'Все участники сети',
    },
    {
        value: 'admins_only',
        label: 'Только администраторы',
    },
]