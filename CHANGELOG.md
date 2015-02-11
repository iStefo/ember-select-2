# ember-select-2 changelog

### 1.2.0 (TBB)

* Added option to disable the search field for single select dropdowns (#29)
* Fixed promises in value binding (#30)
* Change event does not trigger an autorun anymore (#33)
* Make select2 assertion ember 1.10 proof (#34, thanks, lucas-clemente!)
* Added option to customize group headers (#46, thanks, gopeter)
* Override default option of select2 libraries for looking up object id (#39, thanks, tylr & kevin-brown)
* Added `minimumInputLength` option and `didSelect` action (#61, thanks, jniechcial)

### 1.1.0 (November 18, 2014)

* #18 Allow to specify optionLabelPath instead of relying on text. (thanks, abuiles!)
* Added option to set custom optionDescriptionPath
* #6 how do you use it with Ember-data ?. (thanks, Rodrigora!)
* Added option to enable/disable input
* Refactor tests into multiple files
* #20 Add the custom classes to result box too. (`cssClass` option)
* #13 Server Side Type Ahead (`query` option)

### 1.0.1 (Oktober 11, 2014)

* Published to npm
* Refactored to propper ember-cli addon
* Received support from:
	* jevanlingen (#3 Bug when using the multiple option)
	* lucas-clemente (#11 Update currently selected value's text)
	* lucas-clemente (#12 lints with ember-cli default jshint settings)
	* deanmarano (#14 Add support for the allowClear option)