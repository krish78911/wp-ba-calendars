// Listeners for wop calendar
jQuery(document).ready( function() {
	if ( jQuery( "#wopCalendarInputDate" ).length ) {
   		 document.getElementById('wopCalendarInputDate').value = new Date().toDateInputValue();
	}
});
jQuery("#wopCalendarStart").click(function(){ 
    createWopCalendar()
});
jQuery(document).on('click','#wopCalendarPrev',function(){
    createWopCalendar(jQuery(this).data('month'))
});
jQuery(document).on('click','#wopCalendarNext',function(){
    createWopCalendar(jQuery(this).data('month'))
});

// Main function for WOP calendar
function createWopCalendar(month = 0) {
    var deliveryCalendarInputDate = new Date(jQuery("#wopCalendarInputDate").val());
    var cycle = jQuery("#wopCalendarCycle").val();
	ovulation = new Date(deliveryCalendarInputDate);
	var firstDay = new Date(deliveryCalendarInputDate);
	if (jQuery('input:radio[name="wopMethod"]:checked').val() == 'firstDayMethod') {
		ovulation.setDate (deliveryCalendarInputDate.getDate() + (cycle - 14));
		firstDay = deliveryCalendarInputDate;
	}
	else if (jQuery('input:radio[name="wopMethod"]:checked').val() == 'ovulationMethod') {
		firstDay.setDate (firstDay.getDate() + 14);
		firstDay.setDate (firstDay.getDate() - cycle);
	}
	else if (jQuery('input:radio[name="wopMethod"]:checked').val() == 'deliveryDateMethod') {
		ovulation.setDate (deliveryCalendarInputDate.getDate() - 266);
		firstDay.setDate (deliveryCalendarInputDate.getDate() - 280);
	}
	deliveryDate = new Date(ovulation);
	deliveryDate.setDate(ovulation.getDate() + 266);
		
    // start and end date of calendar month to show up
	var today=new Date();
    var y = today.getFullYear(), m = today.getMonth() + month;
    var startDate = new Date(y, m, 1);
    var endDate = new Date(y, m + 1, 0);
  
    // calendar navigation
    var prevMonth = -1 + month;
    var nextMonth = 1 + month;
  
    var monthName = new Array("Januar", "Februar", "März", "April", "Mai", "Juni",
                             "Juli", "August", "September", "Oktober", "November", "Dezember");
  
	
	pregnancyArr = getPregnancyArray(firstDay);
	//newWOPArr = getNewWOPArray(firstDay);
	newWOPArr = getNewWOPArray2(ovulation, cycle);
	
	// target month
    var monthArr = getCalendarArray(startDate, endDate);
	
	var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	// render results
    wopCalendarResults.innerHTML = '<h2 class="text-center">Du bist in der <br />SSW ' + getWOP(ovulation, "short") + ' (' + getWOP(ovulation) + ')</h2>';
	
	if (getWOP(ovulation, "short")>=5 && getWOP(ovulation, "short")<=40 ) wopCalendarResults.innerHTML = wopCalendarResults.innerHTML + '<a href="//www.babyartikel.de/magazin/' + getWOP(ovulation, "short") + '-ssw" class="btn btn-block btn-primary">Was passiert in der SSW ' + getWOP(ovulation, "short") + '?</a>';
    // render day by day to <ul id="pregnancyCalendar"></ul>
    wopCalendar.innerHTML = '<div class="calendarNav"><div><a id="wopCalendarPrev" data-month="' + prevMonth  + '">&laquo;</a></div><div class="wopCalendarHead">' + monthName[startDate.getMonth()] + ' ' + startDate.getFullYear() + '</div><div><a id="wopCalendarNext" data-month="' + nextMonth  + '">&raquo;</a></div></div><ul class="calendarDays" id="wopCalendarDays"></ul>';
  // render some placeholders before first monday
  var iterations = monthArr[0].getDay();
  if (monthArr[0].getDay()==0) var iterations = 7; //
  for(var i = 1; i < iterations; i++) {
    wopCalendarDays.innerHTML = wopCalendarDays.innerHTML + "<li class='day placeholder'><div></div></li>"
  };
	builtCalendarDays(monthArr, 'wopCalendarDays');
	styleCalendarDays(monthArr, [ovulation], 'ovulation2');
	styleCalendarDays(monthArr, pregnancyArr, 'pregnancy');
	styleCalendarDays(monthArr, newWOPArr, 'newwop', true);
	styleCalendarDays(monthArr, [deliveryDate], 'birthdate');
	styleCalendarDays(monthArr, [new Date()], 'today');
	wopCalendarLegend.innerHTML = '<li><span class="legendIcon newwop"></span> Beginn einer neuen SSW</li><li><span class="legendIcon ovulation2"></span> Befruchtung</li><li><span class="legendIcon birthdate"></span> Geburtstermin</li>';
}




// Listeners for delivery calendar
jQuery(document).ready( function() {
	if ( jQuery( "#deliveryCalendarInputDate" ).length ) {
    		document.getElementById('deliveryCalendarInputDate').value = new Date().toDateInputValue();
	}
});
jQuery("#deliveryCalendarStart").click(function(){ 
    createDeliveryCalendar()
});
jQuery(document).on('click','#deliveryCalendarPrev',function(){
    createDeliveryCalendar(jQuery(this).data('month'))
});
jQuery(document).on('click','#deliveryCalendarNext',function(){
    createDeliveryCalendar(jQuery(this).data('month'))
});
jQuery('input:radio[name="deliveryMethod"]').change(function(){
	if (jQuery(this).is(':checked') && jQuery(this).val() == 'firstDayMethod') {
		jQuery("#deliveryCycleLength").show("slow");
	}
	else {
		jQuery("#deliveryCycleLength").hide("slow");
	}
});

// Main function for delivery calendar
function createDeliveryCalendar(month = 0) {
    var deliveryCalendarInputDate = new Date(jQuery("#deliveryCalendarInputDate").val());
    var cycle = jQuery("#deliveryCalendarCycle").val();
	ovulation = new Date(deliveryCalendarInputDate);
	
	if (jQuery('input:radio[name="deliveryMethod"]:checked').val() == 'firstDayMethod') {
		ovulation.setDate (deliveryCalendarInputDate.getDate() + (cycle - 14));
	}
	else if (jQuery('input:radio[name="deliveryMethod"]:checked').val() == 'deliveryDateMethod') {
		ovulation.setDate (deliveryCalendarInputDate.getDate() - 266);
	}
	deliveryDate = new Date(ovulation);
	deliveryDate.setDate(ovulation.getDate() + 266);
	maternityLeave = new Date(deliveryDate.getFullYear(),deliveryDate.getMonth(),deliveryDate.getDate() - 42);
		
    var bloodTest = new Date(ovulation);
        bloodTest.setDate(ovulation.getDate() + 10);
    var nidation = new Date(ovulation);
        nidation.setDate(ovulation.getDate() + 9);
    // start and end date of calendar month to show up
    var y = deliveryDate.getFullYear(), m = deliveryDate.getMonth() + month;
    var startDate = new Date(y, m, 1);
    var endDate = new Date(y, m + 1, 0);
  
    // calendar navigation
    var prevMonth = -1 + month;
    var nextMonth = 1 + month;
  
    var monthName = new Array("Januar", "Februar", "März", "April", "Mai", "Juni",
                             "Juli", "August", "September", "Oktober", "November", "Dezember");
  
    deliveryDay90Arr = getDeliveryDate90(deliveryDate, startDate, endDate, cycle);
	
	// target month
    var monthArr = getCalendarArray(startDate, endDate);
	
	var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	
	// render results
    deliveryCalendarResults.innerHTML = '<h2 class="text-center">Dein Ergebnis</h2><dl class="row"><!--<dt class="col-sm-6">Befruchtung:</dt><dd class="col-sm-6">' + ovulation.toLocaleDateString('de-DE', dateOptions) + '</dd>--><dt class="col-sm-6">Geburtstermin:</dt><dd class="col-sm-6">' + deliveryDate.toLocaleDateString('de-DE', dateOptions) + '</dd><dt class="col-sm-6">Schwangerschaftswoche:</dt><dd class="col-sm-6">SSW ' + getWOP(ovulation, "short") + " (" + getWOP(ovulation) + ')</dd><!--<dt class="col-sm-6">Vergangene Tage:</dt><dd class="col-sm-6">' + getWOP(ovulation, "dop") + '</dd><dt class="col-sm-6">Tage bis zur Geburt:</dt><dd class="col-sm-6">' + getWOP(ovulation, "dtd") + '</dd>--><dt class="col-sm-6">Beginn Mutterschutz:</dt><dd class="col-sm-6">' + maternityLeave.toLocaleDateString('de-DE', dateOptions) + '</dd><dt class="col-sm-6">Sternzeichen des Babys:</dt><dd class="col-sm-6">' + getZodiac(deliveryDate) + '</dd></dl>';
	
	if (getWOP(ovulation, "short")>=5 && getWOP(ovulation, "short")<=40 ) deliveryCalendarResults.innerHTML = deliveryCalendarResults.innerHTML + '<a href="//www.babyartikel.de/magazin/' + getWOP(ovulation, "short") + '-ssw" class="btn btn-block btn-primary">Was passiert in der SSW ' + getWOP(ovulation, "short") + '?</a>';
    // render day by day to <ul id="pregnancyCalendar"></ul>
    deliveryCalendar.innerHTML = '<div class="calendarNav"><div><a id="deliveryCalendarPrev" data-month="' + prevMonth  + '">&laquo;</a></div><div class="deliveryCalendarHead">' + monthName[startDate.getMonth()] + ' ' + startDate.getFullYear() + '</div><div><a id="deliveryCalendarNext" data-month="' + nextMonth  + '">&raquo;</a></div></div><ul class="calendarDays" id="deliveryCalendarDays"></ul>';
  // render some placeholders before first monday
  var iterations = monthArr[0].getDay();
  if (monthArr[0].getDay()==0) var iterations = 7; //
  for(var i = 1; i < iterations; i++) {
    deliveryCalendarDays.innerHTML = deliveryCalendarDays.innerHTML + "<li class='day placeholder'><div></div></li>"
  };
	builtCalendarDays(monthArr, 'deliveryCalendarDays');
	var deliveryDateArr = [deliveryDate];
	styleCalendarDays(monthArr, deliveryDay90Arr, 'delivery90');
	styleCalendarDays(monthArr, deliveryDateArr, 'birthdate');
	deliveryCalendarLegend.innerHTML = '<li><span class="legendIcon birthdate"></span> Errechneter Geburtstermin (4% Wahrscheinlichkeit)</li><li><span class="legendIcon delivery90"></span> Geburtstermin (90% Wahrscheinlichkeit)</li>';
}

// Listeners for ovulation calendar
jQuery(document).ready( function() {
	if ( jQuery( "#ovulationCalendarFirstday" ).length ) {
    		document.getElementById('ovulationCalendarFirstday').value = new Date().toDateInputValue();
	}
});
jQuery("#ovulationCalendarStart").click(function(){ 
    createOvulationCalendar()
});
jQuery(document).on('click','#ovulationCalendarPrev',function(){
  createOvulationCalendar(jQuery(this).data('month'))
});
jQuery(document).on('click','#ovulationCalendarNext',function(){
    createOvulationCalendar(jQuery(this).data('month'))
});

// Main function for ovulation calendar
function createOvulationCalendar(month = 0) {
    var periodStart = new Date(jQuery("#ovulationCalendarFirstday").val());

    var cycle = jQuery("#ovulationCalendarCycle").val();
    var ovulation = new Date(periodStart);
        ovulation.setDate( ovulation.getDate() + (cycle - 14) );
    var bloodTest = new Date(ovulation);
        bloodTest.setDate(ovulation.getDate() + 10);
    var nidation = new Date(ovulation);
        nidation.setDate(ovulation.getDate() + 9);
    // start and end date of calendar month to show up
    var date = new Date(), y = date.getFullYear(), m = date.getMonth() + month;
    var startDate = new Date(y, m, 1);
    var endDate = new Date(y, m + 1, 0);
  
    // calendar navigation
    var prevMonth = -1 + month;
    var nextMonth = 1 + month;
  
    var monthName = new Array("Januar", "Februar", "März", "April", "Mai", "Juni","Juli", "August", "September", "Oktober", "November", "Dezember");
    
    // correct offset and calculate the days in the target month
    fertilityArr = getFertilityArray(correctOffset(ovulation, startDate, cycle));
    veryFertileArr = getVeryFertileArray(correctOffset(ovulation, startDate, cycle));
    nestingArr = getNestingArray(correctOffset(ovulation, startDate, cycle));
    periodsArr = getPeriodsArray(correctOffset(periodStart, startDate, cycle));
	  urinTestArr = getUrinTestArray(correctOffset(periodStart, startDate, cycle));

    // calculate some earlier and later days to have buffer
    ovulationArr = getTargetArray(correctOffset(ovulation, startDate, cycle), startDate, endDate, cycle);
    bloodTestArr = getTargetArray(correctOffset(bloodTest, startDate, cycle), startDate, endDate, cycle);
    fertilityArr = getTargetArray(fertilityArr, startDate, endDate, cycle);
    veryFertileArr = getTargetArray(veryFertileArr, startDate, endDate, cycle);
    nestingArr = getTargetArray(nestingArr, startDate, endDate, cycle);
    periodsArr = getTargetArray(periodsArr, startDate, endDate, cycle);
	  urinTestArr = getTargetArray(urinTestArr, startDate, endDate, cycle);
    // target month
    var monthArr = getCalendarArray(startDate, endDate);
    
    // render day by day to <ul id="pregnancyCalendar"></ul>
    ovulationCalendar.innerHTML = '<div class="calendarNav"><div><a id="ovulationCalendarPrev" data-month="' + prevMonth  + '">&laquo;</a></div><div class="ovulationCalendarHead">' + monthName[startDate.getMonth()] + ' ' + startDate.getFullYear() + '</div><div><a id="ovulationCalendarNext" data-month="' + nextMonth  + '">&raquo;</a></div></div><ul class="calendarDays" id="ovulationCalendarDays"></ul>';
  // render some placeholders before first monday
  var iterations = monthArr[0].getDay();
  if (monthArr[0].getDay()==0) var iterations = 7; //
  for(var i = 1; i < iterations; i++) {
    ovulationCalendarDays.innerHTML = ovulationCalendarDays.innerHTML + "<li class='day placeholder'><div></div></li>"
  };
	builtCalendarDays(monthArr, 'ovulationCalendarDays');
	styleCalendarDaysEisprung(monthArr, fertilityArr, periodStart, 'fertility');
  styleCalendarDaysEisprung(monthArr, veryFertileArr, periodStart, 'veryFertile');
  styleCalendarDaysEisprung(monthArr, nestingArr, periodStart, 'nesting');
	styleCalendarDaysEisprung(monthArr, periodsArr, periodStart, 'periods');
	styleCalendarDaysEisprung(monthArr, ovulationArr, periodStart, 'ovulation');
	styleCalendarDaysEisprung(monthArr, bloodTestArr, periodStart, 'bloodtest');
	styleCalendarDaysEisprung(monthArr, urinTestArr, periodStart, 'urintest');
    ovulationCalendarFirstday.value = periodStart.getFullYear() + "-" + addZ((periodStart.getMonth() + 1)) + "-" + addZ(periodStart.getDate());
	ovulationCalendarLegend.innerHTML = '<li><span class="legendIcon ovulation"></span> Eisprung</li><li><span class="legendIcon fertility"></span> Eventuell fruchtbare Tage</li><li><span class="legendIcon veryFertile"></span> Fruchtbare Tage</li><li><span class="legendIcon nesting"></span> Einnistung</li><li><span class="legendIcon bloodtest"></span> Bluttest möglich</li><li><span class="legendIcon periods"></span> Erster Tag der Periode</li><li><span class="legendIcon urintest"></span> Urintest möglich</li>';
}

/* === HELPFUL FUNCTIONS FOR ALL CALENDARS === */

function builtCalendarDays(allDays, calendarID) {
  for(var i = 0; i < allDays.length; i++) {
		var date = new Date(allDays[i]);
		date.setHours(0,0,0,0);
		var id = 'day' + allDays[i].getDate();		
		jQuery('#' + calendarID).append("<li id='" + id + "' class='day '><div>" + allDays[i].getDate() +"</div><div class='icon'></div></li>"); 
  }
} 

function styleCalendarDaysEisprung(allDays, styleDays, periodStart, className, addIndex=false) {
  for(var i = 0; i < allDays.length; i++) {
		var date = new Date(allDays[i]);
		date.setHours(0,0,0,0);
		for(var j = 0; j < styleDays.length; j++) {
			if (isSameDate(styleDays[j],allDays[i])) {
        var currentDate = new Date(periodStart);
        currentDate.setHours(0,0,0,0);
        if(currentDate <= styleDays[j]) {
          jQuery( '#day' + allDays[i].getDate() ).addClass( className );
          if (addIndex) jQuery( '#day' + allDays[i].getDate() ).addClass( className + j );
        }
			}
		}		
  }
} 

function styleCalendarDays(allDays, styleDays, className, addIndex=false) {
  for(var i = 0; i < allDays.length; i++) {
		var date = new Date(allDays[i]);
		date.setHours(0,0,0,0);
		var classes = "day ";
		for(var j = 0; j < styleDays.length; j++) {
			if (isSameDate(styleDays[j],allDays[i])) {
				jQuery( '#day' + allDays[i].getDate() ).addClass( className );
				if (addIndex) jQuery( '#day' + allDays[i].getDate() ).addClass( className + j );
			}
		}		
  }
} 
  
function isSameDate(d1,d2) {
  // compares dates without consideration of hours
  if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()) 
    return true;
  else return false;
}

function correctOffset(date, start, cycle) {
    // the function gives back a date in the target month
    // based on a given date in past or future
    var distance = Math.floor((date - start) / (1000*60*60*24));
    var factor = distance / cycle;
    var correction = cycle * Math.ceil(factor);
    var arr = new Array();
    var dt = new Date(date);
        dt.setDate(dt.getDate() - correction)
        dt.setHours(0,0,0,0);
    return dt;
};

function getFertilityArray(ovulation) {
    // gives back an array with fertility days
    // based on a given ovulation date
    var arr = new Array();
    var dt = new Date(ovulation);
        dt.setDate(dt.getDate() - 4)
        dt.setHours(0,0,0,0);
    arr.push(new Date(dt)); // the first ovulation day
    for (var i = 1; i<6 ;i++) { 
        dt.setDate(dt.getDate() + 1);
        arr.push(new Date(dt)); 
    }
    return arr;
};

function getVeryFertileArray(ovulation) {
  // gives back an array with very vertile days
  // based on a given ovulation date
  var arr = new Array();
  var dt = new Date(ovulation);
      dt.setDate(dt.getDate() - 2)
      dt.setHours(0,0,0,0);
  arr.push(new Date(dt)); // the first very fertile day
  for (var i = 1; i<3 ;i++) { 
      dt.setDate(dt.getDate() + 1);
      arr.push(new Date(dt)); 
  }
  return arr;
};

function getNestingArray(ovulation) {
  // gives back an array with nesting days
  // based on a given ovulation date
  var arr = new Array();
  var dt = new Date(ovulation);
      dt.setDate(dt.getDate() + 5)
      dt.setHours(0,0,0,0);
  arr.push(new Date(dt)); // the first nesting day
  for (var i = 1; i<3 ;i++) { 
      dt.setDate(dt.getDate() + 1);
      arr.push(new Date(dt)); 
  }
  return arr;
};

function getDeliveryDate90(deliveryDate) {
    // gives back an array with the delivery days
    // with 90% probability
    var arr = new Array();
    var dt = new Date(deliveryDate);
        dt.setDate(dt.getDate() - 14)
        dt.setHours(0,0,0,0);
    arr.push(new Date(dt));
    for (var i = 1; i<28 ;i++) { 
        dt.setDate(dt.getDate() + 1);
        arr.push(new Date(dt)); 
    }
    return arr;
};

function getCalendarArray(start, end) {
    // gives back an array with all days of the time frame
    // between given start and end day
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
};

function getPeriodsArray(periodStart) {
    // gives back a array with period days
    // based on the first day of periods
    var arr = new Array();
    var dt = new Date(periodStart);
        dt.setDate(dt.getDate())
        dt.setHours(0,0,0,0);
    arr.push(new Date(dt));
    for (var i = 1; i<5 ;i++) { 
        dt.setDate(dt.getDate() + 1);
        arr.push(new Date(dt)); 
    }
    return arr;
};

function getPregnancyArray(periodStart) {
    // gives back a array with pregnancy days
    // based on the first day of last periods
    var arr = new Array();
    var dt = new Date(periodStart);
        dt.setDate(dt.getDate())
        dt.setHours(0,0,0,0);
	arr.push(new Date(dt));
    for (var i = 0; i<279 ;i++) {  
        dt.setDate(dt.getDate() + 1);
		arr.push(new Date(dt));
    }
    return arr;
};

function getNewWOPArray(periodStart) {
    // gives back a array with the first days of all week of pregnancies
    // based on the first day of last periods
    var arr = new Array();
    var dt = new Date(periodStart);
        dt.setDate(dt.getDate())
        dt.setHours(0,0,0,0);
	arr.push(new Date(dt));
    for (var i = 0; i<41 ;i++) {  
        dt.setDate(dt.getDate() + 7);
		arr.push(new Date(dt));
    }
    return arr;
};

function getNewWOPArray2(ovulation) {
    // gives back a array with the first days of all week of pregnancies
    // based on the given ovulation date
    var arr = new Array();
    var dt = new Date(ovulation);
        dt.setDate(dt.getDate() - 14 )
        dt.setHours(0,0,0,0);
	console.log("First day: " + dt);
	arr.push(new Date(dt));
    for (var i = 0; i<41 ;i++) {  
        dt.setDate(dt.getDate() + 7);
		arr.push(new Date(dt));
    }
    return arr;
};

function getUrinTestArray(periodStart) {
    // gives back a array with urin test days
    // based on the first day of periods
    var arr = new Array();
    var dt = new Date(periodStart);
        dt.setDate(dt.getDate())
        dt.setHours(0,0,0,0);
    arr.push(new Date(dt));
    return arr;
};

function getTargetArray(inputDate, start, end, cycle) {
    // based on a single date or a array of dates
    // the function creates an array of days in the target month
    if (!inputDate.length) {
      var input2=inputDate;
      inputDate[0] = new Date(input2);
      inputDate[0].setHours(0,0,0,0);
      inputDate.length = 1;
    }
    var arr = new Array();
    for(var j = 0; j < inputDate.length; j++) {
      var offset = Math.floor((inputDate[j] - start) / (1000*60*60*24));
      var factor = offset / cycle;
      factor = Math.floor(factor);
      if (factor == 0) factor = 1;
      for (var i=-4; i<=4; i++) {
        var dt = new Date(inputDate[j]);
          dt.setDate(dt.getDate() + ( (factor + i) * cycle));
          dt.setHours(0,0,0,0);
          if (dt>=start && dt <=end)
            // add only dates in target month to array
            arr.push(new Date(dt)); 
      }
    }
    return arr;
};

function addZ(n){
   // adding 0 to months or days
  return n<10? '0'+n:''+n;
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function getZodiac(date) {
  var zodiacSigns = {
    'capricorn':'Steinbock',
    'aquarius':'Wassermann',
    'pisces':'Fische',
    'aries':'Widder',
    'taurus':'Stier',
    'gemini':'Zwilling',
    'cancer':'Krebs',
    'leo':'Löwe',
    'virgo':'Jungfrau',
    'libra':'Waage',
    'scorpio':'Skorpion',
    'sagittarius':'Schütze'
  }
  var day = date.getDate();
  var month = date.getMonth() + 1;

  if((month == 1 && day <= 19) || (month == 12 && day >=21)) {
    zodiac = zodiacSigns.capricorn;
  } else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
    zodiac = zodiacSigns.aquarius;
  } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
    zodiac = zodiacSigns.pisces;
  } else if((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
    zodiac = zodiacSigns.aries;
  } else if((month == 4 && day >= 21) || (month == 5 && day <= 21)) {
    zodiac = zodiacSigns.taurus;
  } else if((month == 5 && day >= 22) || (month == 6 && day <= 21)) {
    zodiac = zodiacSigns.gemini;
  } else if((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
    zodiac = zodiacSigns.cancer;
  } else if((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
    zodiac = zodiacSigns.leo;
  } else if((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
    zodiac = zodiacSigns.virgo;
  } else if((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
    zodiac = zodiacSigns.libra;
  } else if((month == 10 && day >= 23) || (month == 11 && day <= 22)) {
    zodiac = zodiacSigns.scorpio;
  } else if((month == 11 && day >= 23) || (month == 12 && day <= 20)) {
    zodiac = zodiacSigns.sagittarius;
  }
  return zodiac;
}

function getWOP(ovulation, format="long") {
	var today = new Date();
	today.setHours(0,0,0,0);
	var ovulation = new Date(ovulation);
	ovulation.setHours(0,0,0,0);
	var dop = dates_difference(ovulation, today)+14;
	var dtd = 280 - dop;
	var wop = Math.floor((dop) / 7);
	var dow =  Math.round((((dop) / 7) % 1)*7);
	var wop_long = wop + "W" + " + " + dow + "T";
	var wop_short = Math.floor(dates_difference(ovulation, today)/7+3);
	if (format=="dop") return dop;
	else if (format=="dtd") return dtd;
	else if (format=="short") return wop_short;
	else return wop_long;
}

function dates_difference(date1, date2) {
dt1 = new Date(date1);
dt2 = new Date(date2);
return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}