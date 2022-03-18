﻿using pios.projekt.models.Models;
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

		Task<List<SchoolClass>> PutStudentsInClass(List<Student> students);
    }
}
