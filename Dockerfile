FROM node:22-alpine AS build

WORKDIR /workspace

COPY seller-frontend-platform ./seller-frontend-platform
RUN cd seller-frontend-platform \
    && npm ci \
    && npm run build

COPY seller-inventory-mfe ./seller-inventory-mfe
RUN cd seller-inventory-mfe \
    && npm ci \
    && npm run build

FROM nginx:1.27-alpine AS runtime

COPY seller-inventory-mfe/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/seller-inventory-mfe/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/mf-manifest.json || exit 1

