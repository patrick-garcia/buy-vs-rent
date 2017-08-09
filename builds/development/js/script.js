var app = {};

app.rent = 1000;
app.homePrice = 300000;
app.downPayment = 25000;
app.condoFee = 300;
app.interest = 0.025;
app.years = 25;
app.principal = app.homePrice - app.downPayment;
app.numberOfPayments = years * 12;
app.maxBarHeight = 450;
app.monthly = 0;

app.buyMonthlyCalc = function() {
  app.principal = app.homePrice - app.downPayment;
  app.numberOfPayments = app.years * 12;
  monthlyInt = app.interest / 12;
  topValue = monthlyInt * Math.pow((1 + monthlyInt), app.numberOfPayments);
  bottomValue = Math.pow((1 + monthlyInt), app.numberOfPayments) - 1;
  var buyMonthlyTotal = parseInt(app.principal * (topValue / bottomValue)) + app.condoFee;
  return buyMonthlyTotal;
};

app.sentenceCheck = function() {
  if (app.monthly > app.rent) {
    diff = (app.monthly - app.rent).toLocaleString();
    $('p.message').text(`Buying will cost $${diff}/month more than renting`);
  } else {
    diff = (app.rent - app.monthly).toLocaleString();
    $('p.message').text(`Buying will cost $${diff}/month less than renting`);
  };
};

app.mainFunction = function() {
  // normal effect
  if (app.rent <= 2700 && app.buyMonthlyCalc() <= 2700) {
    app.monthly = app.buyMonthlyCalc();
    buyHeight = app.monthly / 6;
    $('.buy-bar').css('height', buyHeight);
    $('.buy-bar p.updated-cost').text(`$${app.monthly.toLocaleString()}`);

    rentHeight = app.rent / 6;
    $('.rent-bar').css('height', rentHeight);
    $('.rent-bar p.updated-cost').text(`$${app.rent.toLocaleString()}`);

    app.sentenceCheck();

  // rent > mortgage && rent > 2700
  // rent is max-height - mortgage bar height decreases propotionately
  } else if (app.rent > app.buyMonthlyCalc() && app.rent >= 2700) {
    app.monthly = app.buyMonthlyCalc();
    buyHeight = (app.monthly / app.rent) * app.maxBarHeight;
    $('.buy-bar').css('height', buyHeight);
    $('.buy-bar p.updated-cost').text(`$${app.monthly.toLocaleString()}`);

    rentHeight = app.rent / 6;
    $('.rent-bar').css('height', rentHeight);
    $('.rent-bar p.updated-cost').text(`$${app.rent.toLocaleString()}`);

    app.sentenceCheck();

  // mortgage > rent && mortgage >= 2700
  // mortgage is max-height - rent bar height decreases propotionately
  } else {
    app.monthly = app.buyMonthlyCalc();
    buyHeight = app.monthly / 6;
    $('.buy-bar').css('height', buyHeight);
    $('.buy-bar p.updated-cost').text(`$${app.monthly.toLocaleString()}`);
    
    rentHeight = (app.rent / app.monthly) * app.maxBarHeight;
    $('.rent-bar').css('height', rentHeight);
    $('.rent-bar p.updated-cost').text(`$${app.rent.toLocaleString()}`);

    app.sentenceCheck();
  };
};  // end of mainFunction

// trigger slider change by field input
app.infoFromField = function() {
  $('.user-info input').on('change', function() {
    var sliderId = `#slider-${this.name}`;
    var $slider = $(sliderId);
    $slider.slider('value', this.value);
    $slider.slider('option', 'slide')(null, { value: $slider.slider('value') });
  });
};

app.init = function() {
        // rent
  $('#slider-rent').slider({
    slide: function(event, ui) {
      app.rent = (ui.value);
      $('#rent').val(app.rent);
      app.mainFunction();
    },
    min: 500,
    max: 5000,
    value: 1000,
    step: 100,
    range: 'min'
  });

  // home price
  $('#slider-home-price').slider({
    slide: function(event, ui) {
      app.homePrice = (ui.value);
      $('#home-price').val(app.homePrice);
      app.mainFunction();
    },
    min: 100000,
    max: 2000000,
    value: 300000,
    step: 10000,
    range: 'min'
  });

  // down payment
  $('#slider-down-payment').slider({
    slide: function(event, ui) {
      app.downPayment = (ui.value);
      $('#down-payment').val(app.downPayment);
      app.mainFunction();
    },
    min: 20000,
    max: 100000,
    value: 25000,
    step: 5000,
    range: 'min'
  });
  
  // years
  $('#slider-years').slider({
    slide: function(event, ui) {
      app.years = (ui.value);
      $('#years').val(app.years);
      app.mainFunction();
    },
    min: 5,
    max: 30,
    value: 25,
    step: 5,
    range: 'min'
  });
  
  // iterest rate
  $('#slider-interest').slider({
    slide: function(event, ui) {
      app.interest = (ui.value);
                        intPercent = (app.interest * 100).toFixed(2);
      $('#interest').val(intPercent);
      app.mainFunction();
    },
    min: 0.01,
    max: 0.1,
    value: 0.025,
    step: 0.0025,
    range: 'min'
  });

  // condo fee
  $('#slider-condo-fee').slider({
    slide: function(event, ui) {
      app.condoFee = (ui.value);
      $('#condo-fee').val(app.condoFee);
      app.mainFunction();
    },
    min: 100,
    max: 1500,
    value: 300,
    step: 20,
    range: 'min'
  });
  // end of jQueryUI

  app.infoFromField();

};


$(function() {
  app.init();
}); 