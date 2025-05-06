if ($Crm.user.type == "Client Portal User") {
    ZDK.Page.getButton("edit").disable();
    pageFields = ZDK.Page.getFields();
    pageFields.forEach((field) => {
        let fieldApiName = field.getApiName();
        if (fieldApiName !== "Proof_of_Payment") field.setReadOnly(true);
        if (fieldApiName === "Proof_of_Payment_Uploaded") field.setVisibility(false);
    });
} else {
    ZDK.Page.getField('Proof_of_Payment_Uploaded').setReadOnly(true);
}
