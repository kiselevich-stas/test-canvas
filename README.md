# Cytoscape + Vue 3 + Vite demo

Готовый стартовый проект для интерактивной схемы/графа.

Что уже есть:
- Vue 3 + Vite
- Cytoscape.js
- pan / zoom / drag узлов
- фильтры по типу, статусу и типу связи
- кастомные узлы с цветовым статус-индикатором
- разные стили линий
- панель деталей выбранного узла

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
npm run preview
```

## Где менять данные

Файл:

```text
src/data/sampleGraph.js
```

Структура:

```js
{
  nodes: [
    {
      id: 'node-1',
      label: 'Node name',
      type: 'hub' | 'processor' | 'merchant',
      status: 'active' | 'warning' | 'danger',
      size: 58,
      x: 0,
      y: 0,
      meta: {
        country: 'Latvia',
        group: 'Merchant'
      }
    }
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      edgeType: 'hub' | 'direct' | 'dashed',
      risk: 'low' | 'medium' | 'high',
      label: 'routing'
    }
  ]
}
```

## Где менять стили

Основная логика:
- `src/components/GraphCanvas.vue` — Cytoscape instance и стили графа
- `src/utils/nodeSprite.js` — SVG-спрайт узла и цветной индикатор
- `src/utils/mapToElements.js` — преобразование данных и фильтрация

## Почему так удобно поддерживать

- нет лишней Vue-обёртки вокруг Cytoscape
- все данные лежат отдельно
- фильтры отдельно
- узлы и линии стилизуются централизованно
- можно легко заменить demo JSON на API response
