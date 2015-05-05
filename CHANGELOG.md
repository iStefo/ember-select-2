# ember-select-2 changelog

### 1.3.0 (May 5, 2015)

* Add ability for infinite scroll (#85, thanks, cooperjbrandon!)
* The `didSelect` action should wait for databinding (#75, thanks, pierrickrouxel!)
* Make select2 assets optional (#71, thanks, minichate!)
* The `didSelect` action passes new value and reference to component (suggested in #76, thanks, DENIELER!)
* Add ability to set a custom separator for values (#88, thanks drapergeek!)
* Fix a crash with disabled prototype extension (#79, thanks, huafu!)
* Add the ability to pass a `tabindex` (suggested in #53, thanks, ryanjm!)
* Add support for disabled options (#47, thanks, kevintraver!)
* Add `optionSelectedLabelPath` option (#66, thanks, ziggythehamster!)
* Fix possible incopatibility with disabled prototype extension

### 1.2.0 (February 11, 2015)

* Added option to disable the search field for single select dropdowns (#29)
* Fixed promises in value binding (#30)
* Change event does not trigger an autorun anymore (#33)
* Make select2 assertion ember 1.10 proof (#34, thanks, lucas-clemente!)
* Added option to customize group headers (#46, thanks, gopeter)
* Override default option of select2 libraries for looking up object id (#39, thanks, tylr & kevin-brown)
* Added `minimumInputLength` option and `didSelect` action (#61, thanks, jniechcial)
* Added `optionIdPath` option (#58, thanks, ziggythehamster)

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
