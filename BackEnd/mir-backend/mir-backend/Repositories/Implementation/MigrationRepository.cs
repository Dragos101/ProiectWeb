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
            SELECT ?id ?userId ?migration ?working ?thumbnailUrl ?politicFactors ?migrationDescription ?calamity ?longitude ?latitude ?season ?category
            WHERE {
              ?migration a ex:Migration ;
                ex:id ?id ;
                ex:userId ?userId .
             
              OPTIONAL {
                ?migration ex:hasContext ?context .
                OPTIONAL { ?context ex:season ?season . }
                OPTIONAL { ?context ex:working ?working . }
                OPTIONAL { ?context ex:thumbnailUrl ?thumbnailUrl . }
                OPTIONAL { ?context ex:politicFactors ?politicFactors . }
                OPTIONAL { ?context ex:description ?migrationDescription . }
                OPTIONAL { ?context ex:calamity ?calamity . }
              }
  
              OPTIONAL {
                ?migration ex:hasLocation ?location .
                OPTIONAL { ?location ex:longitude ?longitude . } 
                OPTIONAL { ?location ex:latitude ?latitude . }
              }
  
              OPTIONAL {
                ?migration ex:hasType ?type .
                OPTIONAL { ?type ex:category ?category . }
              }
            }";
            var xmlResult = await _db.ExecuteSparqlQueryAsync(sparqlQuery);
            return xmlResult;
        }
    }
}
