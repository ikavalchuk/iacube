sap.ui.define([
	"sap/m/Popover",
	"sap/m/VBox",
	"sap/m/HBox",
	"sap/m/Image",
	"sap/m/Text",
	"sap/m/List",
	"sap/m/CustomListItem",
	"sap/m/Link",
], function(Popover, VBox, HBox, Image, Text, List, CustomListItem, Link) {
	"use strict";

	return Popover.extend("iacube.ui.common.profilesListPopover", {
		
		metadata : {			
			properties : {				
				FirstName	 : {type : "string", group : "data"},
				LastName	 : {type : "string", group : "data"},
				photoURL 	 : {type : "string", group : "data"},
				profiles	 : {type : "object[]", group: "data"}
			}			
		},
		
		init: function() {
			Popover.prototype.init.apply(this, arguments);
			this.oLocalModel = new sap.ui.model.json.JSONModel();
			this.setModel(this.oLocalModel, "local");
		},
		
		onBeforeRendering: function(){
			
			this.oBundle = this.getModel("i18nCom").getResourceBundle();
			this.setTitle(this.oBundle.getText("profiles.list.popover.title")+ " " + this.getFirstName() + " " + this.getLastName());
			

			this.oLocalModel.setProperty("/FirstName",	this.getFirstName());
			this.oLocalModel.setProperty("/photoURL",	this.getPhotoURL());
			this.oLocalModel.setProperty("/profiles",	this.getProfiles());
			
			this.createPopoverContent();
		},

		createPopoverContent: function() {
			
			var sText = this.oBundle.getText("profiles.list.popover.found", this.getFirstName());
			var oHBox = new HBox({
				alignItems: "Center",
				items: [
					new Image({src: "{local>/photoURL}", height:"3rem"}),
					new Text({text: sText }).addStyleClass("sapUiTinyMarginBegin")
				]
			}).addStyleClass("sapUiTinyMargin");
			
			var oVBox = new VBox({
				id: "profiles_popover_items_list"
			}).bindAggregation("items", "local>/profiles",
				new HBox({
					justifyContent: "SpaceBetween",
					items: [
						new Link({text:"{local>Link}", target:"{local>Link}", press:"handleLinkPress"}),
						new Image({src: {model: 'local', path:'ProfileTypeId',
							formatter:function(type){
								if(type == "HH"){
									return "/iacube/ui/common/img/Logo-2C-14px.png"
								}
								return "/iacube/ui/common/img/Logo-2C-14px.png";
							}
						}, height:"1rem"}).addStyleClass("sapUiTinyMarginBegin")
					]
				}).addStyleClass("sapUiLargeMarginBeginEnd")
			);
			
//			var oList = new List({
//				id: "profiles_popover_items_list"
//			}).bindAggregation("items", "local>/profiles",
//				new CustomListItem({
//					content: [
//						new HBox({
//							items: [
//								new Link({text:"{local>Link}", target:"{local>Link}", press:"handleLinkPress"}),
//								new Image({src: "{local>/ProfileTypeId}", width: "3rem", height:"3rem"})
//							]
//						})
//					]
//				})
//			);

			this.addContent(oHBox).addContent(oVBox);
		},

		renderer: {}
	});
});