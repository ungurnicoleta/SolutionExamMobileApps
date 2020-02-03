export default class Expense{
    constructor(id: number, name: string, status: string, student: string, eCost: number, cost: number){
        this.name = name;
        this.status = status;
        this.student = student;
        this.eCost = eCost;
        this.cost = cost;
    }
}
