import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useStatisticsStore = defineStore('statistics', () => {
    const period = ref('6m')

    const overviewCards = ref([
        {
            id: 'volume',
            title: 'Общий объём',
            value: '$193.7M',
            meta: 'в месяц',
            delta: '↗ 12.3M за неделю',
            deltaType: 'positive',
            icon: '/statistics/conversations.svg',
        },
        {
            id: 'connections',
            title: 'Активные связи',
            value: '33',
            meta: '17 ожидают',
            delta: '↘ -4 за неделю',
            deltaType: 'negative',
            icon: '/statistics/link.svg',
        },
        {
            id: 'merchants',
            title: 'Мерчантов',
            value: '30',
            meta: '22 активных',
            delta: '↗ 12 за неделю',
            deltaType: 'positive',
            icon: '/statistics/user-multiple.svg',
        },
        {
            id: 'processors',
            title: 'Процессингов',
            value: '12',
            meta: 'всего подключено',
            delta: '↗ 2 за неделю',
            deltaType: 'positive',
            icon: '/statistics/processing.svg',
        },
    ])

    const transactionSeries = ref([
        { label: 'Июн', value: 0.5 },
        { label: 'Июл', value: 0.8 },
        { label: 'Авг', value: 1.05 },
        { label: 'Сен', value: 0.9 },
        { label: 'Окт', value: 0.75 },
        { label: 'Ноя', value: 0.92 },
        { label: 'Дек', value: 1.08 },
        { label: 'Янв', value: 1.18 },
        { label: 'Фев', value: 1.27 },
        { label: 'Март', value: 1.35 },
        { label: 'Апр', value: 2.15 },
        { label: 'Май', value: 2.85 },
    ])

    const nodeStatuses = ref([
        { name: 'Активные', value: 10 },
        { name: 'Подозрит.', value: 6 },
        { name: 'Скам', value: 11 },
        { name: 'Неактивные', value: 13 },
    ])

    const topMerchants = ref([
        { name: 'CryptoShop', value: 2600 },
        { name: 'TurboPlay', value: 2400 },
        { name: 'ThetaProce...', value: 2320 },
        { name: 'VegasPay', value: 2250 },
        { name: 'GoldRush', value: 2210 },
        { name: 'UltraPay', value: 1980 },
        { name: 'AcePay', value: 1880 },
        { name: 'DarkHorse', value: 1760 },
        { name: 'AcePay 2', value: 1600 },
        { name: 'GoldPay', value: 1450 },
        { name: 'DarkPlay', value: 1120 },
        { name: 'UltraAce', value: 460 },
    ])

    const totalStatusCount = computed(() => {
        return nodeStatuses.value.reduce((sum, item) => sum + item.value, 0)
    })

    const lineChartOption = computed(() => ({
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#111827',
            borderWidth: 0,
            textStyle: {
                color: '#ffffff',
            },
            valueFormatter: (value) => `$${value.toFixed(2)}M`,
        },
        grid: {
            left: 8,
            right: 8,
            top: 24,
            bottom: 8,
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: transactionSeries.value.map((item) => item.label),
            axisLine: {
                lineStyle: {
                    color: '#e5e7eb',
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                color: '#9ca3af',
                fontSize: 12,
            },
        },
        yAxis: {
            type: 'value',
            min: 0,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: '#eef2f7',
                },
            },
            axisLabel: {
                color: '#9ca3af',
                formatter: (value) => `$${value}M`,
            },
        },
        series: [
            {
                type: 'line',
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    width: 3,
                    color: '#1d4ed8',
                },
                areaStyle: {
                    color: 'rgba(59, 130, 246, 0.16)',
                },
                data: transactionSeries.value.map((item) => item.value),
            },
        ],
    }))

    const donutChartOption = computed(() => ({
        tooltip: {
            trigger: 'item',
            backgroundColor: '#111827',
            borderWidth: 0,
            textStyle: {
                color: '#ffffff',
            },
        },
        legend: {
            show: false,
        },
        series: [
            {
                type: 'pie',
                radius: ['62%', '82%'],
                center: ['50%', '50%'],
                startAngle: 90,
                padAngle: 2,
                minAngle: 8,
                avoidLabelOverlap: false,
                label: {
                    show: false,
                },
                labelLine: {
                    show: false,
                },
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#ffffff',
                    borderWidth: 4,
                },
                data: [
                    {
                        value: nodeStatuses.value[0].value,
                        name: nodeStatuses.value[0].name,
                        itemStyle: { color: '#10b85a' },
                    },
                    {
                        value: nodeStatuses.value[1].value,
                        name: nodeStatuses.value[1].name,
                        itemStyle: { color: '#ff8a2a' },
                    },
                    {
                        value: nodeStatuses.value[2].value,
                        name: nodeStatuses.value[2].name,
                        itemStyle: { color: '#ef3b3b' },
                    },
                    {
                        value: nodeStatuses.value[3].value,
                        name: nodeStatuses.value[3].name,
                        itemStyle: { color: '#e3e3e3' },
                    },
                ],
            },
        ],
    }))

    const merchantsChartOption = computed(() => ({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            backgroundColor: '#111827',
            borderWidth: 0,
            textStyle: {
                color: '#ffffff',
            },
            valueFormatter: (value) => `${value}`,
        },
        grid: {
            left: 8,
            right: 8,
            top: 24,
            bottom: 48,
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: topMerchants.value.map((item) => item.name),
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#e5e7eb',
                },
            },
            axisLabel: {
                color: '#6b7280',
                interval: 0,
                rotate: 0,
                fontSize: 11,
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: '#eef2f7',
                },
            },
            axisLabel: {
                color: '#9ca3af',
                formatter: (value) => `${(value / 1000).toFixed(value >= 1000 ? 1 : 0)}k`,
            },
        },
        series: [
            {
                type: 'bar',
                barWidth: 46,
                itemStyle: {
                    color: '#dbeafe',
                    borderRadius: [8, 8, 0, 0],
                },
                data: topMerchants.value.map((item) => item.value),
            },
        ],
    }))

    function setPeriod(value) {
        period.value = value
    }

    return {
        period,
        overviewCards,
        transactionSeries,
        nodeStatuses,
        topMerchants,
        totalStatusCount,
        lineChartOption,
        donutChartOption,
        merchantsChartOption,
        setPeriod,
    }
})