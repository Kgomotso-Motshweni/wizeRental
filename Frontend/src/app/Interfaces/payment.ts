export interface Payment {
    rentee_id: number;
    applicant_id:string,
    full_name:string,
    property_id:number,
    rent:number,
    unit:number,
    moastart:Date,
    moaend:Date,
    rent_paid:number,
    create_time:Date,
    r_update_time:Date,
    paystatus:string,
    paymentstatus:Boolean
}