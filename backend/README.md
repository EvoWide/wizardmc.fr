# WizardMC BackEnd

## Installation

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate
    php artisan jwt:secret

Create the symbolic link

    php artisan storage:link

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Seed the database (optional)

    php artisan db:seed

Start the local development server

    php artisan serve
