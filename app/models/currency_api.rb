class CurrencyApi
  include HTTParty
  base_uri "api.exchangeratesapi.io"

  CURRENCIES = {
    "EUR" => "Euro",
    "BRL" => "Real",
    "MXN" => "Pesos Mexicanos",
  }

  BASE_CURRENCY = "USD"

  HISTORY_PATH = "/history?base=#{BASE_CURRENCY}&symbols=#{CURRENCIES.keys.join(",")}"

  BASE_DAYS = 7

  def self.get_currency_rates_by_date
    days_in_seconds = BASE_DAYS * 86400
    current_date = Time.now
    start_date = (current_date - days_in_seconds).strftime("%Y-%m-%d")
    end_date = current_date.strftime("%Y-%m-%d")

    self.request_currencies(start_date, end_date)
  end

  private

  def self.request_currencies(start_date, end_date)
    Rails.cache.fetch("#{start_date}/currencies", expires_in: 12.hours) do
      get("#{HISTORY_PATH}&start_at=#{start_date}&end_at=#{end_date}")["rates"].sort.to_h
    end
  end
end
