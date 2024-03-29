<template>
  <button
    :class="{
      'hover:bg-purple-600': status === 'none' && !cta,
      'cursor-not-allowed': status !== 'none',
      'text-sm text-purple-200 bg-purple-700 rounded-md font-semibold h-10': !cta,
      'font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title h-12': cta,
      'px-4 py-2': !xl,
      'px-5 py-3': xl,
      'h-14': xl && cta,
    }"
    :disabled="status !== 'none'"
    class="focus:outline-none"
    :type="submit ? 'submit' : 'button'"
  >
    <template v-if="status === 'none'">
      <slot />
    </template>
    <template v-else-if="status === 'sent'">
      <div class="flex items-center">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </svg>
        <span class="ml-1">Envoyé</span>
      </div>
    </template>
    <template v-else-if="status === 'error'">
      <div class="flex items-center">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </svg>
        <span class="ml-1">Erreur</span>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center justify-center">
        <div :class="{'cta': cta}" class="relative inline-block w-5 h-5 loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </template>
  </button>
</template>

<script>
export default {
  props: {
    cta: {
      type: Boolean,
      default: false
    },
    submit: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      required: true
    },
    xl: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.h-14 {
  height: 3.25rem;
}

.loader div {
  @apply box-border block absolute w-4 h-4 rounded-full m-2px border-2 border-purple-200;
  animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #e9d8fd transparent transparent transparent;
}

.loader.cta div {
  @apply border-2 border-yellow-600;
  border-color: #d69e2e transparent transparent transparent;
}

.loader div:nth-child(1) {
  animation-delay: -0.45s;
}

.loader div:nth-child(2) {
  animation-delay: -0.3s;
}

.loader div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
