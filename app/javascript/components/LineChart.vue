<template>
  <div id="chart">
    <TheNav />
    <div class="container">
      <div ref="highcharts-container" class="my-chart"></div>
    </div>
    <div class="chart-buttons">
      <button
        class="my-button btn waves-effect waves-light"
        v-for="(currencyFullName, currencyShortName, index) of availableCurrencies"
        :key="index"
        :ref="currencyShortName"
        @click="setChartData(currencyShortName, currencyFullName)"
      >
        {{currencyFullName}}
        <i class="material-icons right">timeline</i>
      </button>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import TheNav from "./TheNav";
export default {
  name: "LineChart",
  components: { TheNav },
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
      Highcharts.chart(this.$refs["highcharts-container"], {
        chart: {
          type: "line",
          marginLeft: 80,
          marginRight: 60,
          reflow: true,
          borderRadius: 20
        },
        title: {
          text: `<strong>${currencyFullName}</strong> <br/> período: uma semana`
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

<style scoped >
.chart-buttons {
  text-align: center;
}
.my-button {
  margin: 1em;
}
.my-chart {
  opacity: 0.9;
  margin-top: 4em;
}
</style>



