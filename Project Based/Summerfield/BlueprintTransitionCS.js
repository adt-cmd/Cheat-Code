if (transition.name == 'PAID') {
    let WaterBillProofOfPayment = ZDK.Page.getField('Proof_of_Payment');
    let WaterBillProofOfPaymentUploaded = ZDK.Page.getField("Proof_of_Payment_Uploaded").getValue()
    if (!WaterBillProofOfPaymentUploaded) {
        ZDK.Client.showAlert('Screenshot or Image of Water bill payment is mandatory');
        WaterBillProofOfPayment.addStyle({ borderColor: '#fc0313' });
        return false;
    }
    WaterBillProofOfPayment.addStyle({ borderColor: '#ffffff' });
}
return true;
