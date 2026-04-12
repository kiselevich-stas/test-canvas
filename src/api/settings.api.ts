import { mockSettingsData} from "../../public/mocks/settings.mock";
import type { UserSettingsData} from "../types/settings";

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

function cloneSettings(data: UserSettingsData): UserSettingsData {
    return {
        notifications: data.notifications.map((item) => ({ ...item })),
        privacy: data.privacy,
    }
}

export async function fetchSettings(): Promise<UserSettingsData> {
    await delay(700)
    return cloneSettings(mockSettingsData)
}

export async function updateSettings(payload: UserSettingsData): Promise<UserSettingsData> {
    await delay(900)

    mockSettingsData.notifications = payload.notifications.map((item) => ({ ...item }))
    mockSettingsData.privacy = payload.privacy

    return cloneSettings(mockSettingsData)
}