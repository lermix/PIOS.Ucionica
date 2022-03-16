using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Models
{
	public class Student
	{
		[BsonId]
		public int Id { get; set; }
		public string Name { get; set; }
		public string Surname { get; set; }

	}
}
