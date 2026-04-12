import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchSettings, updateSettings} from "../api/settings.api";
import { privacyOptions} from "../../public/mocks/settings.mock";
import type {
    NotificationSettingItem,
    SettingsNotificationKey,
    SettingsPrivacyValue,
    UserSettingsData
} from "../types/settings";

function cloneSettings(data: UserSettingsData): UserSettingsData {
    return {
        notifications: data.notifications.map((item) => ({ ...item })),
        privacy: data.privacy,
    }
}

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref<UserSettingsData | null>(null)
    const initialSettings = ref<UserSettingsData | null>(null)

    const isLoading = ref(false)
    const isSaving = ref(false)

    const notifications = computed<NotificationSettingItem[]>(() => {
        return settings.value?.notifications ?? []
    })

    const privacy = computed<SettingsPrivacyValue>({
        get() {
            return settings.value?.privacy ?? 'direct_partners'
        },
        set(value) {
            if (!settings.value) {
                return
            }

            settings.value.privacy = value
        },
    })

    const hasChanges = computed(() => {
        if (!settings.value || !initialSettings.value) {
            return false
        }

        return JSON.stringify(settings.value) !== JSON.stringify(initialSettings.value)
    })

    function setNotificationEnabled(key: SettingsNotificationKey, enabled: boolean): void {
        if (!settings.value) {
            return
        }

        const target = settings.value.notifications.find((item) => item.key === key)

        if (!target) {
            return
        }

        target.enabled = enabled
    }

    function setPrivacy(value: SettingsPrivacyValue): void {
        privacy.value = value
    }

    function resetChanges(): void {
        if (!initialSettings.value) {
            return
        }

        settings.value = cloneSettings(initialSettings.value)
    }

    async function loadSettings(): Promise<void> {
        isLoading.value = true

        try {
            const response = await fetchSettings()
            settings.value = cloneSettings(response)
            initialSettings.value = cloneSettings(response)
        } finally {
            isLoading.value = false
        }
    }

    async function saveSettings(): Promise<void> {
        if (!settings.value) {
            return
        }

        isSaving.value = true

        try {
            const response = await updateSettings(settings.value)
            settings.value = cloneSettings(response)
            initialSettings.value = cloneSettings(response)
        } finally {
            isSaving.value = false
        }
    }

    return {
        settings,
        notifications,
        privacy,
        privacyOptions,

        isLoading,
        isSaving,
        hasChanges,

        setNotificationEnabled,
        setPrivacy,
        resetChanges,
        loadSettings,
        saveSettings,
    }
})