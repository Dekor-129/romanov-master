# Используем официальный Node.js образ
FROM node:18-alpine AS base

# Устанавливаем зависимости только если нужно
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production образ
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Создаем не-root пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем необходимые файлы из builder
COPY --from=base --chown=nextjs:nodejs /app/public ./public
COPY --from=base --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=base --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переключаем на не-root пользователя
USER nextjs

# Экспонируем порт
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запускаем приложение