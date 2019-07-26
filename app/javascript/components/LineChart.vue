<template>
  <section id="chart">
    <div id="container-for-line-chart"></div>
    <div class="chart-buttons">
      <button
        v-for="(currencyFullName, currencyShortName, index) of availableCurrencies"
        :key="index"
        @click="setChartData(currencyShortName, currencyFullName)"
      >{{currencyFullName}}</button>
    </div>
  </section>
</template>

<script>
import Highcharts from "highcharts";
export default {
  name: "LineChart",
  props: {
    rates: {
      type: Object,
      required: true
    },

    availableCurrencies: {
      type: Object,
      required: true
    }
  },
  computed: {
    dates() {
      return Object.keys(this.rates);
    },

    currenciesValues() {
      return Object.values(this.rates);
    },

    currencySample() {
      return Object.entries(this.availableCurrencies)[0];
    }
  },
  mounted() {
    this.setChartData(...this.currencySample);
  },
  methods: {
    setChartData(currencyShortName, currencyFullName) {
      const chartValues = this.currenciesValues.map(
        currencies => currencies[currencyShortName]
      );

      this.mountChart(chartValues, currencyFullName);
    },

    mountChart(chartValues, currencyFullName) {
      Highcharts.chart("container-for-line-chart", {
        chart: {
          type: "line"
        },
        title: {
          text: `<strong>Câmbio</strong> <br/> ${currencyFullName} <br/> período: uma semana`
        },
        subtitle: {
          text: "Moeda base: Dollar"
        },
        xAxis: {
          categories: this.dates
        },
        yAxis: {
          title: {
            text: "Valor"
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: true
          }
        },
        series: [
          {
            name: currencyFullName,
            data: chartValues
          }
        ]
      });
    }
  }
};
</script>

<style scoped>
.chart-buttons {
  text-align: center;
}
</style>



