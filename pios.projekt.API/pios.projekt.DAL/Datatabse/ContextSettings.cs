using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Adnet.ProcessVisualizerIzvodivost.Web.Model.Models
{
	public class ContextSettings
	{
		public string ConnectionString;
		public string Database;
		public MongoClientSettings MongoClientSettings;
	}
}
