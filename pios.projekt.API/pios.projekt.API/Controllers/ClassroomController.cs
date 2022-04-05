using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pios.projekt.models.Inteface;
using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pios.projekt.API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        private IClassroomService classroomService;

        public ClassroomController(IClassroomService classroomService)
        {
            this.classroomService = classroomService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStudents() => Ok(await classroomService.GetStudents());

        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student) => Ok(await classroomService.AddStudent(student)); 

        [HttpGet]
        public async Task<IActionResult> GetTeachers() => Ok(await classroomService.GetTeachers());

        [HttpPost]
        public async Task<IActionResult> AddTeacher(Teacher teacher) => Ok(await classroomService.AddTeacher(teacher));

        [HttpGet]
        public async Task<IActionResult> GetSchoolClasses() => Ok(await classroomService.GetSchoolClasses());

        [HttpPost]
        public async Task<IActionResult> AddClass(SchoolClass schoolClass) => Ok(await classroomService.AddSchoolClass(schoolClass));

        [HttpGet]
        public async Task<IActionResult> GetSubjects() => Ok(await classroomService.GetSubjects());

        [HttpPost]
        public async Task<IActionResult> AddSubject(Subject subject) => Ok(await classroomService.AddSubject(subject));

        [HttpPost]
        public async Task<IActionResult> DeleteTeacher([FromHeader]int teacherId) => Ok( await classroomService.DeleteTeacher( teacherId ) );
        [HttpPost]
        public async Task<IActionResult> DeleteSubject([FromQuery]int subjectId) => Ok( await classroomService.DeleteSubject( subjectId ) );
        [HttpPost]
        public async Task<IActionResult> DeleteStudent([FromQuery] int studentId) => Ok( await classroomService.DeleteStudent( studentId ) );
        [HttpPost]
        public async Task<IActionResult> DeleteClassroom([FromQuery] int classroomId) => Ok( await classroomService.DeleteClassroom( classroomId ) );

        [HttpGet]
        public async Task<IActionResult> AddSubjectsToTeacher(List<Subject> subjects, int teacherId) => Ok(await classroomService.AddSubjectsToTeacher(subjects, teacherId));

        [HttpPost]
        public async Task<IActionResult> PutStudentsInClass(List<Student> students, int schoolclassId) => Ok(await classroomService.PutStudentsInClass(students,  schoolclassId));

        [HttpPost]
        public async Task<IActionResult> AddSubjectsToStudent(List<Subject> subjects, int studentId) => Ok(await classroomService.AddSubjectsToStudent(subjects, studentId ));

        [HttpPost]
        public async Task<IActionResult> AddSchoolclassesToTeacher(List<SchoolClass> schoolClasses, int teacherId) => Ok(await classroomService.AddSchoolclassesToTeacher(schoolClasses, teacherId));

        [HttpGet]
        public async Task<IActionResult> GetStudentsSubjects(int studentId) => Ok(await classroomService.GetStudentsSubjects(studentId));

        [HttpPost]
        public async Task<IActionResult> DeleteStudentFromSchoolclass(int studentId, int schoolClassId) => Ok(await classroomService.DeleteStudentFromSchoolclass(studentId, schoolClassId));

        [HttpPost]
        public async Task<IActionResult> DeleteSubjectFromStudent(int studentId, int subjectId) => Ok(await classroomService.DeleteSubjectFromStudent(studentId, subjectId));

        [HttpPost]
        public async Task<IActionResult> AddTimetableRow(TimetableRow timetableRow, int ClassroomId) => Ok( await classroomService.AddTimetableRow( timetableRow, ClassroomId ) );

        [HttpPost]
        public async Task<IActionResult> DeleteTimetableRow(TimetableRow timetableRow, int ClassroomId) => Ok(await classroomService.DeleteTimetableRow(timetableRow, ClassroomId ) );
    }
}
