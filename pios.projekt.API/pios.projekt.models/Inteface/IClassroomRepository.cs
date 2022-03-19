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

	}
}
