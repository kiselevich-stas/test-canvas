import { defineStore } from 'pinia'
import type { ToastItem, ToastType } from '~/types/toast'

interface ToastState {
    items: ToastItem[]
}

interface ShowToastPayload {
    type?: ToastType
    title?: string
    message: string
    duration?: number
    closable?: boolean
}

interface ShowErrorOptions {
    title?: string
    duration?: number
    closable?: boolean
    fallbackMessage?: string
}

const DEFAULT_DURATION = 4000000
const DEFAULT_ERROR_MESSAGE = 'Что-то пошло не так. Попробуйте позже.'

function generateToastId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

/**
 * Безопасно получает текст ошибки из разных форматов.
 */
function getErrorMessage(
    error: unknown,
    fallbackMessage = DEFAULT_ERROR_MESSAGE,
): string {
    if (typeof error === 'string' && error.trim()) {
        return error
    }

    if (error instanceof Error && error.message.trim()) {
        return error.message
    }

    if (typeof error === 'object' && error !== null) {
        const maybeError = error as {
            message?: unknown
            response?: {
                data?: {
                    message?: unknown
                    error?: unknown
                    errors?: unknown
                }
            }
            data?: {
                message?: unknown
            }
        }

        if (
            typeof maybeError.response?.data?.message === 'string' &&
            maybeError.response.data.message.trim()
        ) {
            return maybeError.response.data.message
        }

        if (
            typeof maybeError.response?.data?.error === 'string' &&
            maybeError.response.data.error.trim()
        ) {
            return maybeError.response.data.error
        }

        if (
            typeof maybeError.data?.message === 'string' &&
            maybeError.data.message.trim()
        ) {
            return maybeError.data.message
        }

        if (
            typeof maybeError.message === 'string' &&
            maybeError.message.trim()
        ) {
            return maybeError.message
        }

        /**
         * Частый случай: бэк вернул errors: string[]
         */
        if (Array.isArray(maybeError.response?.data?.errors)) {
            const firstError = maybeError.response?.data?.errors.find(
                (item) => typeof item === 'string' && item.trim(),
            )

            if (typeof firstError === 'string') {
                return firstError
            }
        }
    }

    return fallbackMessage
}

export const useToastStore = defineStore('toast', {
    state: (): ToastState => ({
        items: [],
    }),

    actions: {
        show(payload: ShowToastPayload): string {
            const id = generateToastId()

            const toast: ToastItem = {
                id,
                type: payload.type ?? 'info',
                title: payload.title,
                message: payload.message,
                duration: payload.duration ?? DEFAULT_DURATION,
                closable: payload.closable ?? true,
            }

            this.items.push(toast)

            if (toast.duration && toast.duration > 0) {
                setTimeout(() => {
                    this.remove(id)
                }, toast.duration)
            }

            return id
        },

        remove(id: string): void {
            this.items = this.items.filter((item) => item.id !== id)
        },

        clear(): void {
            this.items = []
        },

        success(message: string, title?: string, duration = DEFAULT_DURATION): string {
            return this.show({
                type: 'success',
                title,
                message,
                duration,
            })
        },

        warning(message: string, title?: string, duration = 4500): string {
            return this.show({
                type: 'warning',
                title,
                message,
                duration,
            })
        },

        info(message: string, title?: string, duration = DEFAULT_DURATION): string {
            return this.show({
                type: 'info',
                title,
                message,
                duration,
            })
        },

        error(message: string, title?: string, duration = 5000): string {
            return this.show({
                type: 'error',
                title,
                message,
                duration,
            })
        },

        /**
         * Показывает тост напрямую из объекта ошибки.
         */
        showError(error: unknown, options?: ShowErrorOptions): string {
            const message = getErrorMessage(
                error,
                options?.fallbackMessage ?? DEFAULT_ERROR_MESSAGE,
            )

            return this.show({
                type: 'error',
                title: options?.title ?? 'Ошибка',
                message,
                duration: options?.duration ?? 5000,
                closable: options?.closable ?? true,
            })
        },
    },
})