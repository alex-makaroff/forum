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
npm install --omit=dev

# Создание .env
cp .env.production .env
# При необходимости отредактировать: nano .env

# Установка systemd-сервиса
chmod +x deploy/srv.cjs
/root/.nvm/versions/node/v22.17.1/bin/node deploy/srv.cjs install
```

## Обновление

```bash
cd /opt/node/forum
git pull
# При изменении зависимостей:
/root/.nvm/versions/node/v22.17.1/bin/node -e "undefined" && npm install --omit=dev
# Перезапуск сервиса:
systemctl restart forum
```

## Управление сервисом

```bash
# Статус
systemctl status forum

# Логи
journalctl -o cat -xefu forum

# Перезапуск
systemctl restart forum

# Остановка
systemctl stop forum

# Переустановка сервиса (удаление + установка заново)
cd /opt/node/forum
/root/.nvm/versions/node/v22.17.1/bin/node deploy/srv.cjs reinstall -p 9018
```

## Проверка работоспособности

```bash
# Health
curl http://77.73.132.128:9018/health

# Загрузка файла
curl -F "file=@screenshot.png" http://77.73.132.128:9018/upload/test

# Просмотр файлов
curl http://77.73.132.128:9018/list
```

## Systemd unit file

Генерируется автоматически в `/etc/systemd/system/forum.service`:

```ini
[Unit]
Description=forum
After=network.target
StartLimitIntervalSec=0

[Service]
User=root
WorkingDirectory=/opt/node/forum
EnvironmentFile=/opt/node/forum/.env
ExecStart=/root/.nvm/versions/node/v22.17.1/bin/node server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```
