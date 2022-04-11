using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Models
{
    public class Exam
    {
        public int Id { get; set; }
		public string Name { get; set; }
		public List<Student> Students { get; set; } = new List<Student>();
        public Teacher Teacher { get; set; }
		public Subject Subject { get; set; }
		public DateTime Date { get; set; } = new DateTime();
        public List<Question> Questions { get; set; } = new List<Question>();

    }
}
