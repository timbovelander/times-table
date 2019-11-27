<template>
  <div class="timer">
    <div class="timer__bar" ref="bar"></div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class Timer extends Vue {
    animation: number = 0
    started: number = 0
    timer: number = 0

    @Prop({ type: Number, default: 3000 }) duration!: number

    mounted() {
      this.start();
    }

    beforeDestroy() {
      window.cancelAnimationFrame(this.animation);
    }

    animate() {
      (this.$refs.bar as HTMLElement).style.width = `${this.getRemainingPercentage()}%`;
      this.animation = window.requestAnimationFrame(this.animate.bind(this));
    }

    getElapsedTime() {
      return this.started
           ? window.performance.now() - this.started
           : 0;
    }

    getRemainingTime() {
      return this.duration - this.getElapsedTime();
    }

    getRemainingPercentage() {
      return (this.getRemainingTime() / this.duration * 100).toFixed(2);
    }

    start() {
      this.started = window.performance.now();
      this.timer = window.setTimeout(this.done.bind(this), this.getRemainingTime());
      this.animate();
    }

    done() {
      this.started = 0;
      this.timer = 0;
      this.$emit('done');
    }
  }
</script>

<style lang="scss">
  .timer {
    border: 1px solid gray;
    border-radius: 0.5rem;
    display: flex;
    height: 2vmin;
    overflow: hidden;
    width: 20vmin;
  }

  .timer__bar {
    background: gray;
    opacity: 0.8;
    height: 100%;
    width: 100%;
  }
</style>
