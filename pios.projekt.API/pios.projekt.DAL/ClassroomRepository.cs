using pios.projekt.DAL.Datatabse;
using pios.projekt.models.Inteface;
using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MongoDB.Driver.Linq;
using MongoDB.Driver;

namespace pios.projekt.DAL
{
	public class ClassroomRepository : IClassroomRepository
	{
		private IClassroomContext context;

		public ClassroomRepository(IClassroomContext context)
		{
			this.context = context;
		}

		public async Task<Student> AddStudent()
		{
			Student a = new Student()
			{
				Id = 0,
				Name = "Test",
				Surname = "Test",
			};

			await context.students.InsertOneAsync( a );
			return await Task.FromResult( a );
		}

        public async Task<Teacher> AddTeacher(Teacher teacher)
        {

			await context.teachers.InsertOneAsync(teacher);
			return await Task.FromResult(teacher);
        }

        public async Task<List<Student>> GetStudents() => await context.students.AsQueryable().ToListAsync();

        public async Task<List<SchoolClass>> PutStudentsInClass(List<Student> students)
        {
			SchoolClass a = new SchoolClass()
			{
				Id = 0,
				ClassName = "1.A",
			};    
			await context.schoolClasses.InsertOneAsync(a);
			
			foreach(Student student in students)
            {
				a.StudentsInClass.Add(student);
            }

			return await Task.FromResult(a);

		}
    }
}
