<template>
  <div>
    <h1 class="text-xl font-semibold">Inscription</h1>
    <form class="mt-4 flex flex-wrap -mx-4">
      <label class="block w-full px-4">
        <span class="text-gray-700">Pseudonyme</span>
        <input type="text" class="form-input mt-1 block w-full" placeholder="Pseudonyme" />
      </label>
      <label class="mt-2 block w-1/2 px-4">
        <span class="text-gray-700">E-mail</span>
        <input type="email" class="form-input mt-1 block w-full" placeholder="E-mail" />
      </label>
      <label class="mt-2 block w-1/2 px-4">
        <span class="text-gray-700">Confirmer E-mail</span>
        <input type="email" class="form-input mt-1 block w-full" placeholder="Confirmer l'e-mail" />
      </label>
      <label class="mt-2 block w-1/2 px-4">
        <span class="text-gray-700">Mot de passe</span>
        <input type="password" class="form-input mt-1 block w-full" placeholder="Mot de passe" />
      </label>
      <label class="mt-2 block w-1/2 px-4">
        <span class="text-gray-700">Mot de passe</span>
        <input
          type="password"
          class="form-input mt-1 block w-full"
          placeholder="Confirmer le mot de passe"
        />
      </label>
      <div class="flex mt-6 px-4 w-full">
        <label class="flex items-center">
          <input type="checkbox" class="form-checkbox text-purple-500 w-5 h-5" />
          <span class="ml-2">
            En vous inscrivant, vous confirmez avoir lu, compris et accepté les
            <a
              href="#"
              class="underline"
            >conditions d'utilisations</a>
          </span>
        </label>
      </div>
      <div class="mt-4 px-4">
        <button class="bg-purple-500 px-4 py-2 rounded text-white">Confirmer</button>
      </div>
    </form>
  </div>
</template>
