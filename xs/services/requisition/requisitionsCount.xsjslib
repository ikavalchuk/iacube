var call = {
		get:{
			statement: "SELECT TO_INTEGER(COUNT (*)) AS CNT FROM IACUBE.\"iacube.db::tables.Requisition.Requisitions\" WHERE \"StatusCodeId\" = 'OPEN'",
			result: function(responce){
				return parseInt(responce[0].CNT);
			}				
		}
};