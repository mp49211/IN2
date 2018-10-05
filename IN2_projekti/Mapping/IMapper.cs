using IN2_projekti.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IN2_projekti.Mapping
{
    interface IMapper
    {
        IEnumerable<ProjektDTO> MapProjekti(In2Context _context);
        ProjektDTO MapProjekt(Projekt p);
    }
}
