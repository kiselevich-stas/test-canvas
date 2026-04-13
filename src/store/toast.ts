import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ToastItem, ToastType } from '../types/toast'

const DEFAULT_DURATION = 4000000
const DEFAULT_ERROR_MESSAGE = 'Что-то пошло не так. Попробуйте позже.'

function generateToastId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

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

        if (Array.isArray(maybeError.response?.data?.errors)) {
            const firstError = maybeError.response.data.errors.find(
                (item) => typeof item === 'string' && item.trim(),
            )

            if (typeof firstError === 'string') {
                return firstError
            }
        }
    }

    return fallbackMessage
}

export const useToastStore = defineStore('toast', () => {
    const items = ref<ToastItem[]>([])

    function show(payload: {
        type?: ToastType
        title?: string
        message: string
        duration?: number
        closable?: boolean
    }): string {
        const id = generateToastId()

        const toast: ToastItem = {
            id,
            type: payload.type ?? 'info',
            title: payload.title,
            message: payload.message,
            duration: payload.duration ?? DEFAULT_DURATION,
            closable: payload.closable ?? true,
        }

        items.value.push(toast)

        if (toast.duration && toast.duration > 0) {
            setTimeout(() => {
                remove(id)
            }, toast.duration)
        }

        return id
    }

    function remove(id: string) {
        items.value = items.value.filter((item) => item.id !== id)
    }

    function clear() {
        items.value = []
    }

    function success(message: string, title?: string, duration = DEFAULT_DURATION) {
        return show({
            type: 'success',
            title,
            message,
            duration,
        })
    }

    function warning(message: string, title?: string, duration = 4500) {
        return show({
            type: 'warning',
            title,
            message,
            duration,
        })
    }

    function info(message: string, title?: string, duration = DEFAULT_DURATION) {
        return show({
            type: 'info',
            title,
            message,
            duration,
        })
    }

    function error(message: string, title?: string, duration = 5000) {
        return show({
            type: 'error',
            title,
            message,
            duration,
        })
    }

    function showError(
        error: unknown,
        options?: {
            title?: string
            duration?: number
            closable?: boolean
            fallbackMessage?: string
        },
    ) {
        const message = getErrorMessage(
            error,
            options?.fallbackMessage ?? DEFAULT_ERROR_MESSAGE,
        )

        return show({
            type: 'error',
            title: options?.title ?? 'Ошибка',
            message,
            duration: options?.duration ?? 5000,
            closable: options?.closable ?? true,
        })
    }

    return {
        items,

        show,
        remove,
        clear,

        success,
        warning,
        info,
        error,
        showError,
    }
})