using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public string Name { get; set; }

        public string ExamQuestion { get; set; }

        public List<KeyValue> possibleAnswers { get; set; }

        public int CorrectAnswer { get; set; }

    }

    public class KeyValue
	{
		public int Key { get; set; }
		public string Value { get; set; }
	}
}
