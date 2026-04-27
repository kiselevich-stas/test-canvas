import { computed, reactive, ref, type ComputedRef, type Ref } from 'vue'
import authService, {
    type ActiveUserResponse,
    type LoginPayload,
} from '@/api/authService'

interface LoginForm {
    login: string
    password: string
    remember: boolean
    captcha: string
}

interface CaptchaState {
    image: string
    key: string
}

interface LoginErrors {
    login: string
    password: string
    captcha: string
}

interface AuthStore {
    form: LoginForm
    captcha: CaptchaState
    errors: LoginErrors
    user: Ref<ActiveUserResponse | null>
    token: Ref<string>
    loading: Ref<boolean>
    errorText: Ref<string>
    isAuth: ComputedRef<boolean>
    isFormFilled: ComputedRef<boolean>
    getCaptcha: () => Promise<void>
    login: () => Promise<boolean>
    fetchActiveUser: () => Promise<void>
    logout: () => void
}

const form = reactive<LoginForm>({
    login: '',
    password: '',
    remember: true,
    captcha: '',
})

const captcha = reactive<CaptchaState>({
    image: '',
    key: '',
})

const errors = reactive<LoginErrors>({
    login: '',
    password: '',
    captcha: '',
})

const user = ref<ActiveUserResponse | null>(null)
const token = ref<string>(localStorage.getItem('access_token') || '')
const loading = ref<boolean>(false)
const errorText = ref<string>('')

export function useAuthStore(): AuthStore {
    const isAuth = computed<boolean>(() => Boolean(token.value))

    const isFormFilled = computed<boolean>(() => {
        return Boolean(
            form.login.trim() &&
            form.password.trim() &&
            form.captcha.trim(),
        )
    })

    function resetErrors(): void {
        errors.login = ''
        errors.password = ''
        errors.captcha = ''
        errorText.value = ''
    }

    function validateForm(): boolean {
        resetErrors()

        if (!form.login.trim()) errors.login = 'Введите логин'
        if (!form.password.trim()) errors.password = 'Введите пароль'
        if (!form.captcha.trim()) errors.captcha = 'Введите капчу'

        return !errors.login && !errors.password && !errors.captcha
    }

    async function getCaptcha(): Promise<void> {
        const response = await authService.getCaptcha()

        captcha.image = response.image || response.captcha || ''
        captcha.key = response.key || response.captcha_key || ''
    }

    async function login(): Promise<boolean> {
        if (!validateForm()) return false

        try {
            loading.value = true

            const payload: LoginPayload = {
                username: form.login,
                password: form.password,
                captcha: form.captcha,
                captcha_key: captcha.key,
                google_code: '',
                grant_type: 'password',
            }

            const response = await authService.login(payload)

            token.value = response.access_token
            localStorage.setItem('access_token', response.access_token)

            return true
        } catch {
            errorText.value = 'Неверный логин, пароль или капча'
            await getCaptcha()

            return false
        } finally {
            loading.value = false
        }
    }

    async function fetchActiveUser(): Promise<void> {
        user.value = await authService.activeUser()
    }

    function logout(): void {
        token.value = ''
        user.value = null
        localStorage.removeItem('access_token')
    }

    return {
        form,
        captcha,
        errors,
        user,
        token,
        loading,
        errorText,
        isAuth,
        isFormFilled,
        getCaptcha,
        login,
        fetchActiveUser,
        logout,
    }
}