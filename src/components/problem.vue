<template>
  <div class="problem">
    {{ multiplicand }} × {{ multiplier }} =
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { generateRandomIntInRange } from '@/lib/math';

  @Component
  export default class Problem extends Vue {
    @Prop(Array) multiplicands!: number[]
    @Prop(Number) multiplier!: number

    get multiplicand() {
      return generateRandomIntInRange(this.multiplicands);
    }
  }
</script>

<style lang="scss">
  .problem {
    font-size: 20vmin;
  }
</style>
