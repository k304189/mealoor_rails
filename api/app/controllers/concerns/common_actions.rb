module CommonActions
  extend ActiveSupport::Concern

  def calc_stock_param(stock_id, use_rate)
    stock = Stock.find(stock_id)
    calced_stock_param = nil
    if stock
      calced_stock_param = {
        id: stock.id,
        name: stock.name,
        category: stock.category,
        price: (stock.price * use_rate / 100.to_f).ceil,
        kcal: (stock.kcal * use_rate / 100.to_f).ceil,
        amount: (stock.amount * use_rate / 100.to_f).ceil,
        protein: BigDecimal((stock.protein * use_rate / 100).to_s).ceil(1).to_f,
        unit: stock.unit,
        shop: stock.shop,
        discounted: stock.discounted,
        stock_type: stock.stock_type
      }
    end
    return calced_stock_param
  end
end
