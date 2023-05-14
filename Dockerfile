FROM public.ecr.aws/docker/library/node:latest as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM public.ecr.aws/nginx/nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80