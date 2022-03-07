using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace pios.projekt.DAL.Datatabse
{
	public class ContextSettings
	{
		public string ConnectionString;
		public string Database;
		public MongoClientSettings MongoClientSettings;
	}
}
