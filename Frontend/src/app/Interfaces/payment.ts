export interface Payment {
    rentee_id: number;
    applicant_id:string,
    full_Name:string,
    property_id:number,
    rent:number,
    unit:number,
    moaStart:Date,
    moaEnd:Date,
    rent_paid:number,
    create_time:Date,
    r_update_time:Date,
    paystatus:string,
    paymentstatus:Boolean
}