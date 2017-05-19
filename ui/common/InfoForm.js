sap.ui.define([
	"sap/m/VBox",
	"sap/ui/layout/form/SimpleForm",
	"sap/m/Label",
	"sap/m/TextArea",
	"sap/m/Input",
	"sap/ui/core/Item",
	"sap/m/ComboBox"
], function(VBox, SimpleForm, Label, TextArea, Input, Item, ComboBox) {
	"use strict";

	return VBox.extend("iacube.ui.common.InfoForm", {
		
		init: function() {
			VBox.prototype.init.apply(this, arguments);
			this.createSimpleFormContent();
		},

		createSimpleFormContent: function() {
			var oForm = new SimpleForm("infoForm", {
				minWidth: 1024,
				maxContainerCols: 2,
				editable: true,
				layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
				labelSpanL: 3,
				labelSpanM: 3,
				emptySpanL: 3,
				emptySpanM: 3,
				columnsL: 2,
				columnsM: 2,

				content: [
					new Label({
						text: "{i18n>requisName}",
						labelFor: "idPos"
					}),
					new Input("idPos", {
						value: "{ui>Position}"
					}).setEditable(false),

					new Label({
						text: "{i18n>Project}",
						labelFor: "idProj"
					}),
					new Input("idProj", {
						value: "{ui>Project}",
						showSuggestion: true,
						showValueHelp: true,
						events: [{
							valueHelpRequest: "this._handleProjValueHelp"
						}]
					}).setEditable(false).bindAggregation("suggestionItems", "ui>/JobRequisCollection",
						new Item({
							text: "{ui>Project}"
						})),
						
					new Label({
						text: "{i18n>priority}",
						labelFor: "idPrior"
					}),
					
					new ComboBox("idPrior", {
						selectedKey: "{ui>Priority}"
					}).bindAggregation("items", "ui>/AvailablePriorities", new Item({
							key: "{ui>PriorityCode}",
							text: "{ui>PriorityCode}"
						})).setEditable(false),
					
					new Label({
						text: "{i18n>location}",
						labelFor: "idLocation"
					}),
					new Input("idLocation", {
						value: "{ui>Location}"
					}).setEditable(false),

					new Label({
						text: "{i18n>language}",
						labelFor: "idLangu"
					}),
					new ComboBox("idLangu", {
						selectedKey: "{ui>Language}"
					}).bindAggregation("items", "ui>/AvailableLanguages", new Item({
							key: "{ui>SlsLang}",
							text: "{ui>SlsLang}"
						})).setEditable(false),
						
					new Label({
						text: "{i18n>keyWords}",
						labelFor: "idKeyW"
					}),
					new TextArea("idKeyW", {
						growing: true,
						growingMaxLines: 5,
						value: ""
					}).setEditable(false),
					new Label({
						text: "{i18n>descr}",
						labelFor: "idDescr"
					}),
					new TextArea("idDescr", {
						value: "{ui>Description}",
						rows: 7
					}).setEditable(false)
				]
			});

			this.addItem(oForm);
		},

		renderer: {}
	});
});