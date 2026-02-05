# Инструкция по деплою на VPS

## Требования
- VPS с Ubuntu 20.04/22.04
- Docker и Docker Compose установлены
- Домен romanov-master.ru направлен на IP сервера

## Шаг 1: Подготовка сервера

```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Устанавливаем Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Создаем пользователя для деплоя
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG docker deploy