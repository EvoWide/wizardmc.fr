# WizardMC

<a href="https://discord.gg/abpKnXA"><img src="https://img.shields.io/badge/Discord-join%20chat-738bd7.svg" alt="EvoWide official Discord"></a>


[wizardmc.fr](https://wizardmc.fr) is the official website of the WizardMC minecraft server.

![Screenshot](https://res.cloudinary.com/kln/image/upload/v1601670733/repository-preview-wizardmc_zxztnw.jpg)

## Installation

Development environment requirements :
- [Node.js](https://nodejs.org/en/download/) >= 12.0.0 
- [PostgreSQ](https://www.postgresql.org/download/)
- [Redis](https://redis.io/download)

Setting up your development environment on your local machine :
```bash
> git clone https://github.com/EvoWide/WizardWebsite.git
> cd wizardwebsite/frontend
> npm install

# And

> cd wizardwebsite/api
> npm install
> cp .env.example .env
> node ace migration:run
```

## Useful commands
Running the app :
```bash
> cd frontend
> npm run dev

# And

> cd api
> npm run dev
```

Building the app :
```bash
> cd frontend
> npm run build
```

## Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## License

This project is using the [GPLv3 License](https://choosealicense.com/licenses/gpl-3.0/).
Feel free to create an issue for any question regarding your rights to use this project.
