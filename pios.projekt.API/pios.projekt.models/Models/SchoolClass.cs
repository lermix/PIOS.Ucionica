using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Models
{
    public class SchoolClass
    {
        public int Id { get; set; }
        public string ClassName { get; set; }

        public List<Student> StudentsInClass { get; set; }

    }
}
