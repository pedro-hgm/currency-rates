require "rails_helper"

RSpec.describe CurrencyApi do
  it "has available currencies" do
    currencies = CurrencyApi::CURRENCIES
    expect(currencies).to be_a(Hash)
    expect(currencies.length).to be > 0
  end

  it "has a base currency" do
    base_currency = CurrencyApi::BASE_CURRENCY
    expect(base_currency).to be_a(String)
    expect(base_currency.length).to be_between(1, 3).inclusive
  end

  it "has a histoy path" do
    history_path = CurrencyApi::HISTORY_PATH
    expect(history_path).to be_a(String)
    expect(history_path).to match /history?/
  end

  it "requests the currency rates" do
    rates = CurrencyApi.get_currency_rates_by_date
    expect(rates).to be_a(Hash)
    expect(rates.length).to be > 0
  end
end
