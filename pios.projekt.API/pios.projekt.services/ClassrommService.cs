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

        public Task<SchoolClass> DeleteStudentFromSchoolclass(int studentId, int schoolClassId) => 
            classroomRepository.DeleteStudentFromSchoolclass(studentId, schoolClassId);

        public Task<Student> DeleteSubjectFromStudent(int studentId, int subjectId) => classroomRepository.DeleteSubjectFromStudent(studentId, subjectId);

        public Task<List<SchoolClass>> GetSchoolClasses() => classroomRepository.GetSchoolClasses();

        public Task<List<Student>> GetStudents() => classroomRepository.GetStudents();

        public Task<List<Subject>> GetStudentsSubjects(int studentId) => classroomRepository.GetStudentsSubjects(studentId);

        public Task<List<Subject>> GetSubjects() => classroomRepository.GetSubjects();

        public Task<List<Teacher>> GetTeachers() => classroomRepository.GetTeachers();

        public Task<SchoolClass> PutStudentsInClass(List<Student> students, int schoolClassId) => classroomRepository.PutStudentsInClass(students, schoolClassId);

    }
}
