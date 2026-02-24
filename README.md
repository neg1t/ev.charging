# Solution Factory React Template

## Информация

#### Шаблон React-приложения.

- React
- React Router Dom
- Typescript
- Ant Design
- effector
- Архитектура основана на [Feature-Sliced Design]("https://feature-sliced.design")

## Установка

#### После установки зависимостей:

`yarn | npm install`

#### Необходимо подключить husky выполнив команду:

`yarn prepare | npm run prepare`

## После установки

- Не забудь поменять title в [index.html](./index.html?plain=1#React.Template)
- Если не используется identity [auth.ts](./src/entities/auth.ts) не нужен
- Изменить тему для фигмы - [конфиг](./src/shared/config/theme.ts)
- Табы для layout - [tabs](./src/entities/menu/model/menu.ts#allTabs)
- Роуты - [routes](./src/widgets/Router/model/routes.tsx#routes)
- Изменить layout под дизайн - [layout](./src/widgets/Router/index.tsx#Layoutstyle)

## Валидация FSD
```
yarn fsd:check
```