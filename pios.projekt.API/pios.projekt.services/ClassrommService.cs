using pios.projekt.models.Inteface;
using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace pios.projekt.services
{
    public class ClassrommService : IClassroomService
    {
        private IClassroomRepository classroomRepository;

        public ClassrommService(IClassroomRepository classroomRepository)
        {
            this.classroomRepository = classroomRepository;
        }

        public Task<SchoolClass> AddSchoolClass(SchoolClass schoolClass) => classroomRepository.AddSchoolClass(schoolClass);

        public Task<Teacher> AddSchoolclassesToTeacher(List<SchoolClass> schoolClasses, int teacherId) => throw new NotImplementedException();
        public Task<Student> AddStudent(Student student) => classroomRepository.AddStudent(student);

        public Task<Subject> AddSubject(Subject subject) => classroomRepository.AddSubjects(subject);

        public Task<Student> AddSubjectsToStudent(List<Subject> subjects, int studentId) => classroomRepository.AddSubjectsToStudent(subjects, studentId);
        public Task<Teacher> AddSubjectsToTeacher(List<Subject> subjects, int teacherId) => classroomRepository.AddSubjectsToTeacher(subjects, teacherId);  
        public Task<Teacher> AddTeacher(Teacher teacher) => classroomRepository.AddTeacher(teacher);

        public Task<TimetableRow> AddTimetableRow(TimetableRow timetableRow, int ClassroomId) => classroomRepository.AddTimetableRow(timetableRow, ClassroomId);

		public Task<int> DeleteClassroom(int classroomId) => classroomRepository.DeleteClassroom( classroomId );

        public Task<int> DeleteStudent(int studentId) => classroomRepository.DeleteStudent( studentId );

        public Task<SchoolClass> DeleteStudentFromSchoolclass(int studentId, int schoolClassId) => 
            classroomRepository.DeleteStudentFromSchoolclass(studentId, schoolClassId);

		public Task<int> DeleteSubject(int subjectId) => classroomRepository.DeleteSubject( subjectId );

        public Task<Student> DeleteSubjectFromStudent(int studentId, int subjectId) => classroomRepository.DeleteSubjectFromStudent(studentId, subjectId);

		public Task<int> DeleteTeacher(int teacherId) => classroomRepository.DeleteTeacher( teacherId );

        public Task<TimetableRow> DeleteTimetableRow(TimetableRow timetableRow, int ClassroomId) => classroomRepository.DeleteTimetableRow(timetableRow, ClassroomId);


        public Task<List<SchoolClass>> GetSchoolClasses() => classroomRepository.GetSchoolClasses();

        public Task<List<Student>> GetStudents() => classroomRepository.GetStudents();

        public Task<List<Subject>> GetStudentsSubjects(int studentId) => classroomRepository.GetStudentsSubjects(studentId);

        public Task<List<Subject>> GetSubjects() => classroomRepository.GetSubjects();

        public Task<List<Teacher>> GetTeachers() => classroomRepository.GetTeachers();

        public Task<SchoolClass> PutStudentsInClass(List<Student> students, int schoolClassId) => classroomRepository.PutStudentsInClass(students, schoolClassId);

        public Task<int> DeleteExam(int examId) => classroomRepository.DeleteExam(examId);

        public Task<Exam> AddExam(Exam exam) => classroomRepository.AddExam(exam);

        public Task<Exam> AddStudentsToExam(List<Student> students, int examId) => classroomRepository.AddStudentsToExam(students, examId);

        public Task<List<Exam>> GetExams() => classroomRepository.GetExams();

        public Task<List<Question>> GetQuestions() => classroomRepository.GetQuestions();

        public Task<Question> AddQuestion(Question question) => classroomRepository.AddQuestion( question );


        public Task<int> DeleteQuestion(int questionId) => classroomRepository.DeleteQuestion(questionId);

        public Task<List<ExamResult>> GetExamResults() => classroomRepository.GetExamResult();

        public Task<ExamResult> AddExamResult(ExamResult examResult) => classroomRepository.AddExamResult(examResult);

        public Task<int> DeleteExamResult(int examResultId) => classroomRepository.DeleteExamResult(examResultId);

    }
}
