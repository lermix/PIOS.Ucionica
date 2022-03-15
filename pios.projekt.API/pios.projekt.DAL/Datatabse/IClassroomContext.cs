﻿using MongoDB.Driver;
using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.DAL.Datatabse
{
	public interface IClassroomContext
	{
		Task InitializeIndexes();

		IMongoCollection<Student> students { get; }
		IMongoCollection<Teacher> teachers { get; }
		IMongoCollection<SchoolClass> schoolClasses { get; }

	}
}
