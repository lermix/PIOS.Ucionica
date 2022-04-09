using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Inteface
{
	public interface IClassroomService
	{
		public Task<List<Student>> GetStudents();
		public Task<Student> AddStudent(Student student);
        public Task<Teacher> AddTeacher(Teacher teacher);
		public Task<SchoolClass> AddSchoolClass(SchoolClass schoolClass);
		public Task<Subject> AddSubject(Subject subject);

		public Task<SchoolClass> PutStudentsInClass(List<Student> students, int schoolClassId);

		public Task<Student> AddSubjectsToStudent(List<Subject> subjects, int studentId);

		public Task<Teacher> AddSchoolclassesToTeacher(List<SchoolClass> schoolClasses, int teacherId);

		public Task<Student> DeleteSubjectFromStudent(int studentId, int subjectId);

		public Task<SchoolClass> DeleteStudentFromSchoolclass(int studentId, int schoolClassId);

		public Task<List<Subject>> GetStudentsSubjects(int studentId);

		public Task<List<SchoolClass>> GetSchoolClasses();

		public Task<List<Subject>> GetSubjects();

		public Task<List<Teacher>> GetTeachers();

		public Task<Teacher> AddSubjectsToTeacher(List<Subject> subjects, int teacherId);
		Task<TimetableRow> AddTimetableRow(TimetableRow timetableRow , int ClassroomId );
		Task<TimetableRow> DeleteTimetableRow(TimetableRow timetableRow, int ClassroomId);
		Task<int> DeleteTeacher(int teacherId);
		Task<int> DeleteSubject(int subjectId);
		Task<int> DeleteStudent(int studentId);
		Task<int> DeleteClassroom(int classroomId);
        Task<int> DeleteExam(int examId);

		public Task<Exam> AddStudentsToExam(List<Student> students, int examId);
		public Task<Exam> AddExam(Exam exam);

	}
}
