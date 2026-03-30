## Запуск на сервере

### 1. Корень проекта `/forum`
```bash
npm install
npm run build  # собирает фронт + бэкенд в dist/
```

### 2. Создать .env
```bash
cp .env.production .env  # или редактировать существующий
```

Переменные для прода:
```env
NODE_ENV=production
PORT=9013
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=xxx
SESSION_SECRET=случайная-строка
```

### 3. Запуск через PM2
```bash
pm2 start npm --name "forum" -- start
pm2 save
```

---

## Локальная разработка
```bash
npm install
npm run dev  # на порту 5000
```

---

## Nginx
Реверс-прокси на порт `9013`.
