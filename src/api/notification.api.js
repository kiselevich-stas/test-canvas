export function fetchNotifications() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: 'Аномальный рост объёмов',
                    description: 'Вынос более чем на 150% за последнюю неделю...',
                    time: '11 ч назад',
                    read: false,
                },
                {
                    id: 2,
                    title: 'AML Alert',
                    description: 'Транзакции требуют дополнительной проверки',
                    time: '11 ч назад',
                    read: false,
                },
                {
                    id: 3,
                    title: 'Аномальный рост объёмов',
                    description: 'Вынос более чем на 150% за последнюю неделю...',
                    time: '11 ч назад',
                    read: false,
                },
            ])
        }, 1200)
    })
}