export class StudyProgramme {
    id: string;
    name: string;
    module: string;
    trainingLevel: string;
    studyPlanType: string;
    credits: string;
    hours: string;
    status: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.module = '';
        this.trainingLevel = '';
        this.studyPlanType = '';
        this.credits = '';
        this.hours = '';
        this.status = 'A';
    }
}
