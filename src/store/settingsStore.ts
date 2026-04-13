import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchSettings, updateSettings } from '@/api/settings.api'
import { privacyOptions as mockPrivacyOptions } from '../../public/mocks/settings.mock'

function cloneSettings(data) {
    return {
        notifications: data.notifications.map((item) => ({ ...item })),
        privacy: data.privacy
    }
}

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref(null)
    const initialSettings = ref(null)

    const isLoading = ref(false)
    const isSaving = ref(false)

    const privacyOptions = ref(mockPrivacyOptions)

    const notifications = computed(() => {
        return settings.value?.notifications ?? []
    })

    const privacy = computed(() => {
        return settings.value?.privacy ?? 'direct_partners'
    })

    const hasChanges = computed(() => {
        if (!settings.value || !initialSettings.value) {
            return false
        }

        return JSON.stringify(settings.value) !== JSON.stringify(initialSettings.value)
    })

    function setSettings(data) {
        settings.value = cloneSettings(data)
        initialSettings.value = cloneSettings(data)
    }

    function setNotificationEnabled(key, enabled) {
        if (!settings.value) {
            return
        }

        const target = settings.value.notifications.find((item) => item.key === key)

        if (!target) {
            return
        }

        target.enabled = enabled
    }

    function setPrivacy(value) {
        if (!settings.value) {
            return
        }

        settings.value.privacy = value
    }

    function resetChanges() {
        if (!initialSettings.value) {
            return
        }

        settings.value = cloneSettings(initialSettings.value)
    }

    async function loadSettings() {
        isLoading.value = true

        try {
            const response = await fetchSettings()
            setSettings(response)
        } finally {
            isLoading.value = false
        }
    }

    async function saveSettings() {
        if (!settings.value) {
            return
        }

        isSaving.value = true

        try {
            const response = await updateSettings(settings.value)
            setSettings(response)
        } finally {
            isSaving.value = false
        }
    }

    return {
        settings,
        initialSettings,
        notifications,
        privacy,
        privacyOptions,
        isLoading,
        isSaving,
        hasChanges,
        setSettings,
        setNotificationEnabled,
        setPrivacy,
        resetChanges,
        loadSettings,
        saveSettings
    }
})