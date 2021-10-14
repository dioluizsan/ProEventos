using System.Threading.Tasks;
using ProEventos.Domain;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ProEventos.Persistence
{
    public class PalestrantePersist : IPalestrantePersist
    {
         private readonly ProEventosContext _context;

        public PalestrantePersist(ProEventosContext context)
        {
            _context = context;

        }

        
//Palestrantes
        public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                .Include(e => e.RedesSociais);

            if(includeEventos){
                query = query
                    .Include( e =>e.PalestranteEventos)
                    .ThenInclude(e => e.Evento);        
            }

            query = query.OrderBy(e => e.Id);
                
            return await query.ToArrayAsync();                       
        }

        public async Task<Palestrante[]> GetAllPalestrantesAsyncByName(string nome, bool includeEventos=false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                .Include(e => e.RedesSociais);

                if(includeEventos){
                    query = query.Include(e => e.PalestranteEventos)
                        .ThenInclude(e => e.Evento);
                }

            query = query.Where(e => e.Nome.ToLower().Contains(nome));    
            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestrantesAsyncById(int palestranteId, bool includeEventos=false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes
                .Include(e => e.RedesSociais);
            
            if(includeEventos){
                query = query.Include(e => e.PalestranteEventos)
                    .ThenInclude(e => e.Evento);
            }

            query = query.Where(e => e.Id == palestranteId);

            return await query.FirstOrDefaultAsync();

        }

        
    }
}