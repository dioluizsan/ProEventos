using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence
{
    public interface IPalestrantePersist
    {
        
        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
        Task<Palestrante[]> GetAllPalestrantesAsyncByName(string Nome,bool includeEventos);
        Task<Palestrante> GetPalestrantesAsyncById(int PalestranteId, bool includeEventos);
    }
}