# WizardMC

<a href="https://discord.gg/abpKnXA"><img src="https://img.shields.io/badge/Discord-join%20chat-738bd7.svg" alt="EvoWide official Discord"></a>


[wizardmc.fr](https://wizardmc.fr) is the official website of the WizardMC minecraft server. It is composed of 3 distinct applications: the frontend, the api and finally the admin dashboard.

![Screenshot](https://res.cloudinary.com/kln/image/upload/v1601670733/repository-preview-wizardmc_zxztnw.jpg)

## Requirements
- [Node.js](https://nodejs.org/en/download/) >= 12.0.0 
- [PostgreSQL](https://www.postgresql.org/download/)
- [Redis](https://redis.io/download)

## Stack
### Frontend
- [Nuxt.js](https://nuxtjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
### API
- [Adonis 5](https://preview.adonisjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
### Admin Dashboard
- [Vue.js 2](https://vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vuexy admin dashboard template](https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/)

# Installation

## Frontend
```bash
> cd wizardmc.fr/frontend
> npm install
> cp .env.example .env # and edit the values
> npm run dev
```

## API
```bash
> cd wizardmc.fr/api
> npm install
> cp .env.example .env # and edit the values
> node ace build
> node ace generate:key # and copy the value to the .env file (APP_KEY field) 
> node ace migration:run
> node ace seed:db # optional: if you want fake data to test the app
> npm run dev
```

## Admin dashboard
```bash
> cd wizardmc.fr/admin
> npm install
> cp .env.example .env
> npm run dev
```

# Deployment
## Frontend
```bash
> cd frontend
> npm run build
```

## API
```bash
> cd api
> node ace build
```

## Admin dashboard
```bash
> cd admin
> npm run build
```

# Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

# License

This project is using the [GPLv3 License](https://choosealicense.com/licenses/gpl-3.0/).
Feel free to create an issue for any question regarding your rights to use this project.
