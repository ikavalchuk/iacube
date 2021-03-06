sap.ui.define([
	"manage_vacancy/controller/BaseController",
	"manage_vacancy/util/formatter",
	"sap/ui/core/Fragment"
], function(BaseController, oFormatter) {
	"use strict";

	return BaseController.extend("manage_vacancy.SharedBlocks.candidates.CandidatesContr", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
			// onInit: function() {

			// }
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf vacancymngt.view.DetailVacancy
		 */
		//	onExit: function() {
		//
		//	}
		
		handleIconPress: function (oEvent) {
			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("manage_vacancy.view.fragments.CandidateLinks", this);
				this.getView().addDependent(this._oPopover);
			}
			
				var oIcon= oEvent.getSource();
				var oContext = oIcon.getBindingContext("ui");
				this._oPopover.setBindingContext(oContext, "ui");
				jQuery.sap.delayedCall(0, this, function () {
				this._oPopover.openBy(oIcon);
			});
		},
		
		handleCandidatePress: function(oEvent) {
		}
	
	});
 

	});