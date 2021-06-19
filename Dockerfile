FROM node:alpine as build

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

# imagem base
FROM nginx:stable-alpine

# copia o build para o nginx
COPY --from=build /usr/src/app/dist /var/www/html/

# troca a configuracao default do nginx para rodar a build do angular
COPY --from=build /usr/src/app/docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# expose porta 8000
EXPOSE 8000
# roda nginx
CMD ["nginx", "-g", "daemon off;"]


