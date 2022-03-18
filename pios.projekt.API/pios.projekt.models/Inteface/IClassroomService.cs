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

		public Task<List<SchoolClass>> PutStudentsInClass(List<Student> students);

	}
}
