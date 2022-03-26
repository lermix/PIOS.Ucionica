using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public List<Subject> subjects { get; set; } = new List<Subject>();

        public List<SchoolClass> schoolClasses { get; set; } = new List<SchoolClass>();


    }
}
