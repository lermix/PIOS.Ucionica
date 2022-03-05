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

		public Task<List<Student>> GetStudents() => classroomRepository.GetStudents();

	}
}
