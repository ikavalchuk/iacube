var call = {
	get:{
		procedure: "iacube.db.procedures.requisition::getRequsitions",
		parameters:{
			searchTerm:{
				type		:"string",
				defaultValue:"*"
			},
			filter:{
				type	: "filter",
				columns : {
					ReqId: {
						type: "integer"
					},
					Title:{
						type:"string"
					},
					SubcategoryId:{
						type:"list"
					},
					StatusCodeId:{
						type:"string"
					}
				}
			},
			paging:{
				type	: "paging"
			}
		},
		result: function(responce){
			
			var i;
			var result = [];
			var filter = this.parameters.filter.columns;
			
			function addTo(requisition){
				["CANDIDATES"].forEach(function(entity){
					var j;
					var newEntity = entity.toLowerCase();
					
					requisition[newEntity] = [];
					
					for(j = 0; j < responce[entity].length; j++){
						if(requisition.ReqId === responce[entity][j].ReqId){
							requisition[newEntity].push(responce[entity][j]);
						}
					}
				});
				return requisition;
			}
			
			for(i = 0; i < responce.REQUISITIONS.length; i++){
				result.push(
					addTo({
						ReqId			: responce.REQUISITIONS[i].ReqId,
						Title			: responce.REQUISITIONS[i].Title,
						ProjectId		: responce.REQUISITIONS[i].ProjectId,
						PriorityId		: responce.REQUISITIONS[i].PriorityId,
						Location		: responce.REQUISITIONS[i].Location,
						StatusCodeId	: responce.REQUISITIONS[i].StatusCodeId,
						SubcategoryId	: responce.REQUISITIONS[i].SubcategoryId,
						SubcategoryName	: responce.REQUISITIONS[i].SubcategoryName,
						UpdatedBy		: responce.REQUISITIONS[i].UpdatedBy,
						UpdatedAt		: responce.REQUISITIONS[i].UpdatedAt, 
						OpenedBy		: responce.REQUISITIONS[i].OpenedBy,
						OpenedAt		: responce.REQUISITIONS[i].OpenedAt,
						DaysRemain		: responce.REQUISITIONS[i].DaysRemain
				}));
			}
			
			filter.SubcategoryId.values = [];
			filter.StatusCodeId.values  = [];
			
			for(i = 0; i < responce.STATUSCODETYPES.length; i++){
				filter.StatusCodeId.values.push(responce.STATUSCODETYPES[i].id);
			}
			for(i = 0; i < responce.SUBCATEGORYTYPES.length; i++){
				filter.SubcategoryId.values.push({
					id	 : responce.SUBCATEGORYTYPES[i].id,
					name : responce.SUBCATEGORYTYPES[i].name,
				});
			}
			
			return {
				data	: result,
				filter 	: filter
			};
		}
	},
	put:{
		procedure:"iacube.db.procedures.requisition::updateRequisitions",
		parameters:{
			requisitions:{
				type:"table",
				columns:{
					ReqId : {
						type : "integer"
					},
					Title : {
						type : "string"
					},
					ProjectId : {
						type : "string"
					},
					PriorityId : {
						type :"string"
					},
					Location : {
						type : "string"
					},
					StatusCodeId : {
						type : "string"
					},
					SubcategoryId : {
						type : "integer"
					},
					Language : {
						type: "string"
					},
					Keywords : {
						type: "string"
					},
					Description : {
						type: "string"
					},
					flag:{
						type:"string"
					}
				}
			},
			skills:{
				type:"table",
				columns:{
					ReqId : {
						type : "integer"
					},
					Skill : {
						type : "string"
					},
					Weight : {
						type : "integer"
					},
					flag:{
						type:"string"
					}
				}
			},
			comments:{
				type:"table",
				columns:{
					ReqId : {
						type : "integer"
					},
					CommentId : {
						type : "integer"
					},
					CommentTypeId : {
						type : "string"
					},
					Title : {
						type : "string"
					},
					Text : {
						type : "string"
					},
					CommentStatusId : {
						type : "string"
					},
					flag:{
						type:"string"
					}
				}
			},
			
		}
	}
};