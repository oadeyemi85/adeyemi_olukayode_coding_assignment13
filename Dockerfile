# Assignment 13 - UI Garden with build checks
# Build:  docker build -t adeyemi_olukayode_ui_garden_build_checks .
# Run:    docker run -d --name adeyemi_olukayode_coding_assignment13 -p 8018:8018 adeyemi_olukayode_ui_garden_build_checks
# Site:   http://localhost:8018  (working dir: /adeyemi_olukayode_ui_garden_build_checks)

# ==========================================
# Stage 1: run the quality checks and build
# ==========================================
FROM node:22-alpine AS builder

WORKDIR /adeyemi_olukayode_ui_garden_build_checks

# Husky hooks are for git; skip them inside the image
ENV HUSKY=0

COPY package*.json .npmrc ./
RUN npm ci

COPY . .

# Code quality gate: the image will NOT build if any check fails
RUN npm run format:check && npm run lint && npm run test:ci

# Production build of the Create React App
RUN npm run build

# ==========================================
# Stage 2: serve the production build with nginx
# ==========================================
FROM nginx:alpine AS runner

# Site files are hosted from this working directory
WORKDIR /adeyemi_olukayode_ui_garden_build_checks

COPY --from=builder /adeyemi_olukayode_ui_garden_build_checks/build ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8018

CMD ["nginx", "-g", "daemon off;"]
