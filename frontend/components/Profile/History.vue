<template>
  <table class="min-w-full table-auto">
    <thead>
      <tr class="text-left border-b-4 border-purple-800 bg-purple-1000">
        <slot name="header" />
      </tr>
    </thead>
    <tbody>
      <template v-if="history.length">
        <slot name="content" />
      </template>
      <template v-else>
        <tr class="bg-purple-700 border-b-4 border-purple-800">
          <td class="p-2 lg:px-4" colspan="3">Aucun élément n'a été trouvé dans cet historique.</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true
    }
  }
}
</script>
