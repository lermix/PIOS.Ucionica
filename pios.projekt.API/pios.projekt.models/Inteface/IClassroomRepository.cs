using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Inteface
{
	public interface IClassroomRepository
	{
		Task<List<Student>> GetStudents();
		Task<Student> AddStudent(Student student);
        Task<Teacher> AddTeacher(Teacher teacher);

		Task<SchoolClass> AddSchoolClass(SchoolClass schoolClass);

		Task<SchoolClass> PutStudentsInClass(List<Student> students, int schoolclassId);

		Task<Subject> AddSubjects(Subject subject);

		Task<Student> AddSubjectsToStudent(List<Subject> subjects, int studentId);

		Task<Teacher> AddSchoolclassesToTeacher(List<SchoolClass> schoolClasses, int teacherId);

		Task<Student> DeleteSubjectFromStudent(int studentId, int subjectId);

		Task<SchoolClass> DeleteStudentFromSchoolclass(int studentId, int schoolClassId);

		Task<List<SchoolClass>> GetSchoolClasses();

		Task<List<Subject>> GetStudentsSubjects(int studentId);

		Task<Teacher> AddSubjectsToTeacher(List<Subject> subjects,int studentId);
		Task<List<Subject>> GetSubjects();
		Task<List<Teacher>> GetTeachers();
		Task<TimetableRow> AddTimetableRow(TimetableRow timetableRow, int classroomId);
		Task<TimetableRow> DeleteTimetableRow(TimetableRow timetableRow, int classroomId);
		Task<int> DeleteClassroom(int classroomId);
		Task<int> DeleteStudent(int studentId);
		Task<int> DeleteSubject(int subjectId);
		Task<int> DeleteTeacher(int teacherId);
		Task<int> DeleteExam(int examId);
		Task<Exam> AddExam(Exam exam);

		Task<Exam> AddStudentsToExam(List<Student> students, int examId);
		Task<List<Exam>> GetExams();
		Task<List<Question>> GetQuestions();
		Task<Question> AddQuestion(Question question);
		Task<int> DeleteQuestion(int questionId);
	}
}
