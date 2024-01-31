using mir_backend.Data;
using mir_backend.Repositories.Interface;

namespace mir_backend.Repositories.Implementation
{
    public class MigrationRepository : IMigrationRepository
    {
        private readonly MigrationDbContext _db;

        public MigrationRepository(MigrationDbContext _db)
        {
            this._db = _db;
        }

        public async Task<string> getAllAsync()
        {
            var sparqlQuery = @"
            PREFIX ex: <http://www.semanticweb.org/web-proj/MIR#>
            SELECT ?userId ?migration ?working ?thumbnailUrl ?politicFactors ?migrationDescription ?calamity ?longitude ?latitude ?season ?category
            WHERE {
              ?migration a ex:Migration ;
                         ex:hasContext ?context ;
                         ex:hasLocation ?location ;
                         ex:hasType ?type ;
                         ex:userId ?userId .
             
              ?context ex:season ?season ;
                       ex:working ?working ;
                       ex:thumbnailUrl ?thumbnailUrl ;
                       ex:politicFactors ?politicFactors ;
                       ex:description ?migrationDescription ;
                       ex:calamity ?calamity .
           
              ?location ex:longitude ?longitude ;
                        ex:latitude ?latitude .
            
              ?type ex:category ?category .
            }";

            var xmlResult = await _db.ExecuteSparqlQueryAsync(sparqlQuery);
            return xmlResult;
        }
    }
}
