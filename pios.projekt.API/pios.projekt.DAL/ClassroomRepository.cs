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

        public async Task<Student> AddStudent(Student student)
        {

            ReplaceOneResult result;
            switch (context.students.Find(x => x.Id == student.Id).CountDocuments())
            {
                case 0:
                    await context.students.InsertOneAsync(student);
                    break;
                case 1:
                    var filter = Builders<Student>.Filter.Eq("_id", student.Id.ToString());
                    result = await context.students.ReplaceOneAsync(filter, student);
                    break;
                default:
                    throw new Exception("Multiple processes with same ID found");
            }

            return await Task.FromResult(student);
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

            foreach (Student student in students)
            {
                a.StudentsInClass.Add(student);
            }

            return await Task.FromResult(students);

        }
    }
}
