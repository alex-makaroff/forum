# Настройка на сервере TimeWeb

Сервер: **77.73.132.128** (2393435-cj79386.twc1.net)

## Доступ

```
Host: 77.73.132.128
Port: 22
User: root
Key: ~/.ssh/id_rsa
```

## Расположение проекта

```
/opt/node/forum
```

## Особенности сервера

- Системный Node.js — **v12.22.9** (слишком старый, не подходит)
- Через NVM установлен **v22.17.1** — используется для запуска
- В проекте есть `.envrc` с `nvm use 22.17.1` + `direnv` настроен
- **Важно**: `#!/usr/bin/env node` в скриптах подхватывает системный v12, поэтому `deploy/srv.cjs` нужно запускать явно через NVM-версию ноды

## Первоначальная установка

```bash
ssh root@77.73.132.128

# Клонирование
cd /opt/node
git clone git@github.com:alex-makaroff/forum.git
cd forum

# Активация direnv (для будущих интерактивных сессий)
direnv allow

# Установка зависимостей (через NVM-ноду)
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 22.17.1
npm ci

# Сборка проекта
npm run build

# Создание .env
cp .env.production .env
# Отредактировать реальные значения: nano .env

# Создание deploy/config.yml
cp deploy/config.example.yml deploy/config.yml

# Установка systemd-сервиса
chmod +x deploy/srv.cjs
/root/.nvm/versions/node/v22.17.1/bin/node deploy/srv.cjs install
```

## Настройка NGINX

```bash
# Копирование конфига
cp /opt/node/forum/deploy/NGINX/sites-enabled/forum.amak.site.conf /etc/nginx/sites-enabled/

# Проверка конфигурации
nginx -t

# Перезагрузка NGINX
systemctl reload nginx
```

Конфиг (`deploy/NGINX/sites-enabled/forum.amak.site.conf`) проксирует запросы с `https://forum.amak.site` на `127.0.0.1:9013`. Включает SSL через wildcard-сертификат `*.amak.site`.

### SSL-сертификат

Wildcard-сертификат `*.amak.site` уже выпущен через certbot (Let's Encrypt). Файлы:
- `/etc/letsencrypt/live/amak.site/fullchain.pem`
- `/etc/letsencrypt/live/amak.site/privkey.pem`

Если сертификат истёк — см. инструкцию `deploy/NGINX/Продление-ssl-сертификата-certbor-ssl-letsencrypt.md`.

### Проверка доступности

```bash
# Локально на сервере
curl -s -o /dev/null -w "%{http_code}" http://localhost:9013/

# Через HTTPS
curl -s -o /dev/null -w "%{http_code}" https://forum.amak.site/
```

## Автообновление (cron + update.cjs)

`update.cjs` каждую минуту проверяет обновления в git, и при наличии:
1. Делает `git pull`
2. Переустанавливает зависимости (`npm ci`)
3. Собирает проект (`npm run build`)
4. Перезапускает сервис (`systemctl restart`)

```bash
# Добавление в cron
(crontab -l 2>/dev/null; echo "*       *       *       *       *       /root/.nvm/versions/node/v22.17.1/bin/node /opt/node/forum/update.cjs >/dev/null 2>&1") | crontab -

# Проверка
crontab -l | grep forum
```

Логи автообновления: `/opt/node/deploy__forum__cumulative.log`

## Управление сервисом

```bash
# Статус
systemctl status rest-express

# Логи
journalctl -o cat -xefu rest-express

# Перезапуск
systemctl restart rest-express

# Остановка
systemctl stop rest-express

# Переустановка сервиса (удаление + установка заново)
cd /opt/node/forum
/root/.nvm/versions/node/v22.17.1/bin/node deploy/srv.cjs reinstall -p 9013
```

## Systemd unit file

Генерируется автоматически в `/etc/systemd/system/rest-express.service`:

```ini
[Unit]
Description=rest-express
After=network.target
StartLimitIntervalSec=0

[Service]
User=root
WorkingDirectory=/opt/node/forum
EnvironmentFile=/opt/node/forum/.env
ExecStart=/root/.nvm/versions/node/v22.17.1/bin/node dist/index.cjs
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```
