<template>
  <div>
    <h1 class="text-xl font-semibold">Connexion</h1>
    <form class="mt-4">
      <label class="block">
        <span class="text-gray-700">Pseudonyme</span>
        <input type="text" class="form-input mt-1 block w-full" placeholder="Pseudonyme" />
      </label>
      <label class="mt-2 block">
        <span class="text-gray-700">Mot de passe</span>
        <input type="password" class="form-input mt-1 block w-full" placeholder="Mot de passe" />
      </label>
      <div class="flex mt-6">
        <label class="flex items-center">
          <input type="checkbox" class="form-checkbox text-purple-500 w-5 h-5" />
          <span class="ml-2">Se souvenir de moi</span>
        </label>
      </div>
      <button class="mt-4 bg-purple-500 px-4 py-2 rounded text-white">Confirmer</button>
    </form>
  </div>
</template>
