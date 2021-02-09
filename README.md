# sibdev-test-spa

Решение 2го тестового задания

> #хочувсибдев =)

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Всё как обычно:

- `npm start` - запустит dev-server от react-scripts
- `npm test` - протестирует работу API и что-то ещё
- `npm run build` - создаст статическую сборку

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Логин: `admin`  
Пароль: `admin`

## Реализация

- Приложение работает 😅
- До UI-библиотеки увы, так и не добрался. Написал элементы руками. 
- Запросы выполняются через fetch (не `axios`). Однако, все запросы для большей абстракции вынесены в src/Services.
- Для навигации использовал `react-router`. Результаты поиска, кстати, можно открыть по ссылке и скинуть другу.
- Состояние приложения (авторизация и список избранного) хранитя в `redux`. *P.S.: Поиск видео реализован в стейте компонента*
- Попробовал библиотеку [redux toolkit](https://redux-toolkit.js.org/). Прикольная, и очень гибкая). По производительности не знаю, но вроде нормас)
- Список избранного хранится в `localStorage`. Пользователи лежат в [fakeUsers.ts](https://github.com/hackey9/sibdev-test-spa/blob/main/src/Services/BackendAPI/fakeUsers.ts)
- Google API токен находится в [.env](https://github.com/hackey9/sibdev-test-spa/blob/main/.env). Github мне уже успел прислать сообщение о том что так делать не нужно =))
- Лимиты на Youtube API чёт жосткие. API отваливается быстро, а восстанавливаются (вроде) каждый день в 12:00 МСК.
- Пока API в отвале, добавил анимацию (библиотека [framer-motion](https://www.framer.com/motion/)) в список навигации.
- Структура проекта оставляет желать лучшего. Я ещё неопытный в этом, но идеи как можно было бы улучшить, уже есть)
- Вёрстка сделана на CSS modules. Знаком со `styled-components`, но тут не стал делать, и отлаживать их неудобно ))
