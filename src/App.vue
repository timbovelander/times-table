<template>
  <div id="times-table">
    <template v-if="problemActive">
      <Problem
        :key="`problem-${activeProblemIndex}`"
        :multiplier="multiplier"
        :multiplicands="multiplicands"
      />
      <Timer
        :key="`timer-${activeProblemIndex}`"
        :duration="duration * 1000"
        @done="problemDone"
      />
      <button @click="stop">Stop</button>
    </template>
    <template v-else>
      <label for="multiplicand">Vermenigvuldiger</label>
      <select
        id="multiplicand"
        multiple
        v-model.number="multiplicands"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

      <label for="multiplier">Vermenigvuldigtal</label>
      <input
        id="multiplier"
        type="number"
        v-model.number="multiplier"
      />

      <label for="number-of-problems">Aantal oefeningen</label>
      <input
        id="number-of-problems"
        type="number"
        v-model.number="numberOfProblems"
      />

      <label for="duration">Aantal seconden per oefening</label>
      <input
        id="duration"
        type="number"
        v-model.number="duration"
      />

      <button @click="nextProblem">Start</button>
    </template>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Problem from '@/components/problem.vue';
  import Timer from '@/components/timer.vue';

  @Component({
    components: {
      Problem,
      Timer,
    },
  })
  export default class TimesTable extends Vue {
    activeProblemIndex: number = 0
    duration: number = 3
    multiplicands: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    multiplier: number = 1
    numberOfProblems: number = 20

    get problemActive() {
      return this.activeProblemIndex > 0;
    }

    nextProblem() {
      this.activeProblemIndex++;
    }

    problemDone() {
      if (this.activeProblemIndex < this.numberOfProblems) {
        this.nextProblem();
      } else {
        this.stop();
      }
    }

    stop() {
      this.activeProblemIndex = 0;
    }
  }
</script>

<style lang="scss">
  #times-table {
    align-items: center;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }
</style>
