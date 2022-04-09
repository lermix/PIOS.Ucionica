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
        public List<Student> students { get; set; } = new List<Student>();
        public Teacher teacher { get; set; }

        DateTime datum { get; set; } = new DateTime();

        public List<Question> questions { get; set; } = new List<Question>();

    }
}
