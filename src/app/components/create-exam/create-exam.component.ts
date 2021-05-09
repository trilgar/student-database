import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Discipline, DisciplineService} from '../../services/discipline/discipline.service';
import {StudentService} from '../../services/student/student.service';
import {Exam, ExamService, ExamType} from '../../services/exam/exam.service';
import {take} from 'rxjs/operators';
import {Student} from '../../models/Student';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  typeList = [ExamType.Credit, ExamType.Exam];
  selectedType = this.typeList[0];

  listDiscipline: Discipline[];
  listStudent: Student[];
  selectedDiscipline: Discipline;
  selectedStudent: Student;
  selectedDescription = 'new description';
  selectedMark = 5;

  warningMessage: string;
  warningFlag = false;

  exams: Exam[] = [];

  constructor(private router: Router, private disciplineService: DisciplineService,
              private studentService: StudentService, private examService: ExamService) {
  }

  ngOnInit(): void {
    this.dropdownDisciplineRefresh();
    this.dropdownStudentRefresh();
    this.getByDescription('');
  }

  getByDescription(name: string): void {
    this.examService.getByName(name).pipe(take(1)).subscribe(data => this.exams = data);
  }

  dropdownDisciplineRefresh(): void {
    this.disciplineService.getByName('')
      .pipe(take(1))
      .subscribe(data => {
        this.listDiscipline = data;
      });
  }

  dropdownStudentRefresh(): void {
    this.studentService.getStudents('').pipe(take(1))
      .subscribe(data => data, error => {
        this.warningMessage = error.error.message;
        this.warningFlag = true;
      });
  }

  goBack(): void {
    this.router.navigate(['exams']);
  }

  onSubmit(): void {

    const exam = new Exam();
    exam.type = this.selectedType;
    exam.idDiscipline = this.selectedDiscipline.id;
    exam.idStudent = this.selectedStudent.id;
    exam.description = this.selectedDescription;
    exam.mark = this.selectedMark;

    this.examService.create(exam).pipe(take(1)).subscribe(data => this.goBack(), error => {
      this.warningMessage = error.error.message;
      this.warningFlag = true;
    });
  }


  filterStudents(): void {
    this.studentService.getStudents('').pipe(take(1))
      .subscribe(data => {
        const students: Student[] = data;
        const examsForCurrentDiscipline = this.exams.filter(exam => exam.idDiscipline === this.selectedDiscipline.id);
        const occupiedStudentIds = examsForCurrentDiscipline.map(exam => exam.idStudent);
        this.listStudent = students.filter(student => !occupiedStudentIds.includes(student.id));
        this.selectedStudent = this.listStudent[0];
      });
  }
}
