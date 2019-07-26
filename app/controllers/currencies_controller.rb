class CurrenciesController < ApplicationController
  def index
    @available_currencies = CurrencyApi::CURRENCIES || {}
    @currency_rates = CurrencyApi.get_currency_rates_by_date || {}
  end
end
