<?php

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/* also read https://codex.wordpress.org/Writing_a_Plugin */

/*

Plugin Name: BA Calendars
Description: Shortcodes to integrate calendars
Version: 2022-08-05
Author: KP Family
Author URI: https://www.babyartikel.de/magazin

*/

/* Plugin-Code UNTERhalb dieser Zeile */

/* BEGIN show one product box */

// SSW Rechner

function wp_ba_wop($atts) { 
	$a = shortcode_atts( array (
        	'variables' => false,
        	'template' => 'mag-product',
			'area' => 'area1',
			'varname' => 'pid',
    	), $atts );

	if ($a['variables']) {
		$variables = explode("&",preg_replace('/\s+/', '', $a['variables'])); 
		foreach ($variables as &$vars) {
			$v = explode("=",$vars);
			$var[$v[0]]=$v[1];
		}
	};
	wp_enqueue_script('ba-calendars', plugin_dir_url(__FILE__) . 'js/ba-calendars.js', array('jquery'), '1.0');
	wp_enqueue_style( 'wp-ba-calendars', plugin_dir_url(__FILE__) . 'css/style.css' );
	$result = '
	<div class="calendarWrapper bgGradient">
		<div style="background-color:white;padding:15px;">
			<div class="wopCalendarInput">
				<h2 class="text-center" style="margin-bottom:15px">SSW berechnen</h2>
				<div class="form-check">
					<input class="form-check-input" type="radio" name="wopMethod" id="wopMethod1" value="firstDayMethod" checked>
					<label class="form-check-label" for="wopMethod1">
						Erster Tag der letzten Periode
					</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="radio" name="wopMethod" id="wopMethod2" value="ovulationMethod">
					<label class="form-check-label" for="wopMethod2">
						Tag der Befruchtung
					</label>
				</div>
				<div class="form-check">
					<input class="form-check-input" type="radio" name="wopMethod" id="wopMethod3" value="deliveryDateMethod">
					<label class="form-check-label" for="wopMethod3">
						Errechneter Geburtstermin
					</label>
				</div>
				<div class="form-group">
					<input class="form-control" id="wopCalendarInputDate" type="date" value="">
				</div>
				<div id="wopCycleLength" class="form-group">
					<label for="wopCalendarCycle">Zykluslänge: </label>
					<select class="form-control" id="wopCalendarCycle">
					  <option value="22">22 Tage</option>
					  <option value="23">23 Tage</option>
					  <option value="24">24 Tage</option>
					  <option value="25">25 Tage</option>
					  <option value="26">26 Tage</option>
					  <option value="27">27 Tage</option>
					  <option value="28" selected>28 Tage (Normal)</option>
					  <option value="29">29 Tage</option>
					  <option value="30">30 Tage</option>
					  <option value="31">31 Tage</option>
					  <option value="32">32 Tage</option>
					  <option value="33">33 Tage</option>
					  <option value="34">34 Tage</option>
					  <option value="35">35 Tage</option>
					  <option value="36">36 Tage</option>
					  <option value="37">37 Tage</option>
					  <option value="38">38 Tage</option>
					  <option value="39">39 Tage</option>
					  <option value="40">40 Tage</option>
					</select>
				</div>
				<button id="wopCalendarStart" class="btn btn-default" style="width:100%;height:100%">Berechnen</button>
			</div>
			<div class="calendarResultsTable" id="wopCalendarResults"></div>
			<div class="calendar" id="wopCalendar"></div>
			<ul class="calendarLegend" id="wopCalendarLegend"></ul>
		</div>
	</div>
	';
	return $result;
};

add_shortcode( 'wopcalendar', 'wp_ba_wop' );

// Eisprungrechner

function wp_ba_ovulation($atts) { 
	$a = shortcode_atts( array (
        	'variables' => false,
        	'template' => 'mag-product',
			'area' => 'area1',
			'varname' => 'pid',
    	), $atts );

	if ($a['variables']) {
		$variables = explode("&",preg_replace('/\s+/', '', $a['variables'])); 
		foreach ($variables as &$vars) {
			$v = explode("=",$vars);
			$var[$v[0]]=$v[1];
		}
	};
	wp_enqueue_script('ba-calendars', plugin_dir_url(__FILE__) . 'js/ba-calendars.js', array('jquery'), '1.0');
	wp_enqueue_style( 'wp-ba-calendars', plugin_dir_url(__FILE__) . 'css/style.css' );
	$result = '
	<div class="calendarWrapper bgGradient">
	<div style="background-color:white;padding:15px;">
	<div class="ovulationCalendarInput">
	<h2 class="text-center" style="margin-bottom:15px">Eisprung berechnen</h2>
		<div class="form-group">
			<label for="ovulationCalendarFirstday">Erster Tag der letzten Periode: </label><input class="form-control" id="ovulationCalendarFirstday" type="date" value="">
		</div>
		<div class="form-group">
			<label for="ovulationCalendarCycle">Zykluslänge: </label>
			<select class="form-control" id="ovulationCalendarCycle">
			  <option value="22">22 Tage</option>
			  <option value="23">23 Tage</option>
			  <option value="24">24 Tage</option>
			  <option value="25">25 Tage</option>
			  <option value="26">26 Tage</option>
			  <option value="27">27 Tage</option>
			  <option value="28" selected>28 Tage</option>
			  <option value="29">29 Tage</option>
			  <option value="30">30 Tage</option>
			  <option value="31">31 Tage</option>
			  <option value="32">32 Tage</option>
			  <option value="33">33 Tage</option>
			  <option value="34">34 Tage</option>
			  <option value="35">35 Tage</option>
			  <option value="36">36 Tage</option>
			  <option value="37">37 Tage</option>
			  <option value="38">38 Tage</option>
			  <option value="39">39 Tage</option>
			  <option value="40">40 Tage</option>
			</select>
		</div>
		<button id="ovulationCalendarStart" class="btn btn-default" style="width:100%;height:100%">Berechnen</button>
	</div>
	<div class="calendar" id="ovulationCalendar"></div>
	<ul class="calendarLegend" id="ovulationCalendarLegend"></ul>
	</div>
	</div>
	';
	return $result;
};

add_shortcode( 'ovulationcalendar', 'wp_ba_ovulation' );

// Geburtsterminrechner

function wp_ba_delivery($atts) { 
	$a = shortcode_atts( array (
        	'variables' => false,
        	'template' => 'mag-product',
			'area' => 'area1',
			'varname' => 'pid',
    	), $atts );

	if ($a['variables']) {
		$variables = explode("&",preg_replace('/\s+/', '', $a['variables'])); 
		foreach ($variables as &$vars) {
			$v = explode("=",$vars);
			$var[$v[0]]=$v[1];
		}
	};
	wp_enqueue_script('ba-calendars', plugin_dir_url(__FILE__) . 'js/ba-calendars.js', array('jquery'), '1.0');
	wp_enqueue_style( 'wp-ba-calendars', plugin_dir_url(__FILE__) . 'css/style.css' );
	$result = '
	<div class="calendarWrapper bgGradient">
	<div style="background-color:white;padding:15px;">
	<div class="deliveryCalendarInput">
	<h2 class="text-center" style="margin-bottom:15px">Geburtstermin berechnen</h2>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="deliveryMethod" id="deliveryMethod1" value="firstDayMethod" checked>
			<label class="form-check-label" for="deliveryMethod1">
				Erster Tag der letzten Periode
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="deliveryMethod" id="deliveryMethod2" value="ovulationMethod">
			<label class="form-check-label" for="deliveryMethod2">
				Tag der Befruchtung
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="deliveryMethod" id="deliveryMethod3" value="deliveryDateMethod">
			<label class="form-check-label" for="deliveryMethod3">
				Errechneter Geburtstermin
			</label>
		</div>
		<div class="form-group">
			<input class="form-control" id="deliveryCalendarInputDate" type="date" value="">
		</div>
		<div id="deliveryCycleLength" class="form-group">
			<label for="deliveryCalendarCycle">Zykluslänge: </label>
			<select class="form-control" id="deliveryCalendarCycle">
			  <option value="22">22 Tage</option>
			  <option value="23">23 Tage</option>
			  <option value="24">24 Tage</option>
			  <option value="25">25 Tage</option>
			  <option value="26">26 Tage</option>
			  <option value="27">27 Tage</option>
			  <option value="28" selected>28 Tage</option>
			  <option value="29">29 Tage</option>
			  <option value="30">30 Tage</option>
			  <option value="31">31 Tage</option>
			  <option value="32">32 Tage</option>
			  <option value="33">33 Tage</option>
			  <option value="34">34 Tage</option>
			  <option value="35">35 Tage</option>
			  <option value="36">36 Tage</option>
			  <option value="37">37 Tage</option>
			  <option value="38">38 Tage</option>
			  <option value="39">39 Tage</option>
			  <option value="40">40 Tage</option>
			</select>
		</div>
		<button id="deliveryCalendarStart" class="btn btn-default" style="width:100%;height:100%">Berechnen</button>
	</div>
	<div class="calendarResultsTable" id="deliveryCalendarResults"></div>
	<div class="calendar" id="deliveryCalendar"></div>
	<ul class="calendarLegend" id="deliveryCalendarLegend"></ul>
	</div>
	</div>
	';
	return $result;
};

add_shortcode( 'deliverycalendar', 'wp_ba_delivery' );

/* Plugin-Code OBERhalb dieser Zeile */

 ?>