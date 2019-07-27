import { mount } from '@vue/test-utils';
import LineChart from './LineChart';

describe('LineChart.vue', () => {
  const wrapper = mount(LineChart, {
    propsData: {
      availableCurrencies: {
        EUR: 'Euro',
        BRL: 'Real',
        MXN: 'Pesos Mexicanos'
      },
      rates: {
        '2019-07-19': {
          EUR: 0.8907892393,
          MXN: 19.0220915731,
          BRL: 3.7314270444
        },
        '2019-07-22': {
          EUR: 0.8916629514,
          MXN: 19.0295140437,
          BRL: 3.7434685689
        },
        '2019-07-23': {
          EUR: 0.8950147677,
          MXN: 19.0710641726,
          BRL: 3.7481428444
        },
        '2019-07-24': {
          EUR: 0.8976660682,
          MXN: 19.1392280072,
          BRL: 3.765529623
        },
        '2019-07-25': {
          EUR: 0.8996851102,
          MXN: 18.9964012596,
          BRL: 3.7580746739
        },
        '2019-07-26': {
          EUR: 0.897827258,
          MXN: 19.0373496139,
          BRL: 3.7756329682
        }
      }
    }
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('has a dates computed property', () => {
    expect(wrapper.vm.dates).toBeTruthy();
  });

  it('has a currenciesValues computed property', () => {
    expect(wrapper.vm.currenciesValues).toBeTruthy();
  });

  it('has a currencySample computed property', () => {
    expect(wrapper.vm.currencySample).toBeTruthy();
  });

  it('renders a button for each item in props.availableCurrencies', () => {
    const availableCurrencies = Object.keys(wrapper.vm.availableCurrencies);
    expect(wrapper.findAll('button')).toHaveLength(availableCurrencies.length);
  });

  it("changes the currency that's displayed when the correspondent button is clicked ", () => {
    const currency = 'BRL';
    const currencyExchangeRate = '3.7481428444';
    const button = wrapper.find({ ref: currency });
    expect(wrapper.html()).not.toContain(currencyExchangeRate);
    button.trigger('click');
    expect(wrapper.html()).toContain(currencyExchangeRate);
  });
});
