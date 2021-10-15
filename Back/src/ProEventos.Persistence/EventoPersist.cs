using System.Threading.Tasks;
using ProEventos.Domain;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ProEventos.Persistence
{
    public class EventoPersist : IEventoPersist
    {
         private readonly ProEventosContext _context;

        public EventoPersist(ProEventosContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior =QueryTrackingBehavior.NoTracking;
        }

        

//Eventos
        public async Task<Evento[]> GetAllEventosAsyncByTema(string tema, bool includePalestrantes = false)
        {
           IQueryable<Evento> query = _context.Eventos
            .Include(e => e.Lotes)
            .Include(e => e.RedeSociais);

            if(includePalestrantes){
                query = query
                    .Include(e => e.PalestranteEventos)
                    .ThenInclude(pe => pe.Palestrante );
            } 

            query = query.OrderBy(e => e.Id)
                         .Where( e => e.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedeSociais);

                if(includePalestrantes){
                    query = query
                        .Include(e => e.PalestranteEventos)
                        .ThenInclude(pe => pe.Palestrante);
                }

                query.OrderBy(e => e.Id);

                return await query.ToArrayAsync();

        }

        
        public async Task<Evento> GetEventoAsyncById(int eventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos
                .Include(e => e.Lotes)
                .Include(e => e.RedeSociais);

            if (includePalestrantes){
                    query = query.Include(e => e.PalestranteEventos)
                                 .ThenInclude(e => e.Palestrante);
            }    

            query = query.Where(e => e.Id == eventoId);
            return await query.FirstOrDefaultAsync();
        }



        
    }
}