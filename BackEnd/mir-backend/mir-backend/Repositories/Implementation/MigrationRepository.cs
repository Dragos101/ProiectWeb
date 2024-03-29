﻿using mir_backend.Data;
using mir_backend.Models.DTO;
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
            SELECT ?id ?userId ?migration ?name ?working ?thumbnailUrl ?politicFactors ?migrationDescription ?calamity ?city ?country ?longitude ?latitude ?season ?category
            WHERE {
              ?migration a ex:Migration ;
                ex:id ?id ;
                ex:userId ?userId .
             
              OPTIONAL {
                ?migration ex:hasContext ?context .
                OPTIONAL { ?context ex:name ?name . }
                OPTIONAL { ?context ex:season ?season . }
                OPTIONAL { ?context ex:working ?working . }
                OPTIONAL { ?context ex:thumbnailUrl ?thumbnailUrl . }
                OPTIONAL { ?context ex:politicFactors ?politicFactors . }
                OPTIONAL { ?context ex:description ?migrationDescription . }
                OPTIONAL { ?context ex:calamity ?calamity . }
              }
  
              OPTIONAL {
                ?migration ex:hasLocation ?location .
                OPTIONAL { ?location ex:country ?country . } 
                OPTIONAL { ?location ex:city ?city . } 
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

        public async Task<string> getUserMigrations(Guid userId)
        {
            var sparqlQuery = $@"
            PREFIX ex: <http://www.semanticweb.org/web-proj/MIR#>

            SELECT ?id ?userId ?migration ?name ?working ?thumbnailUrl ?politicFactors ?migrationDescription ?calamity ?city ?country ?longitude ?latitude ?season ?category
            WHERE {{
              ?migration a ex:Migration ;
                ex:id ?id ;
                ex:userId ?userId .
     
              FILTER (?userId = ""{userId}"")
     
              OPTIONAL {{
                ?migration ex:hasContext ?context .
                OPTIONAL {{ ?context ex:season ?season . }}
                OPTIONAL {{ ?context ex:name ?name . }}
                OPTIONAL {{ ?context ex:working ?working . }}
                OPTIONAL {{ ?context ex:thumbnailUrl ?thumbnailUrl . }}
                OPTIONAL {{ ?context ex:politicFactors ?politicFactors . }}
                OPTIONAL {{ ?context ex:description ?migrationDescription . }}
                OPTIONAL {{ ?context ex:calamity ?calamity . }}
              }}
  
              OPTIONAL {{
                ?migration ex:hasLocation ?location .
                OPTIONAL {{ ?location ex:longitude ?longitude . }} 
                OPTIONAL {{ ?location ex:latitude ?latitude . }}
                OPTIONAL {{ ?location ex:country ?country . }} 
                OPTIONAL {{ ?location ex:city ?city . }} 
              }}
  
              OPTIONAL {{
                ?migration ex:hasType ?type .
                OPTIONAL {{ ?type ex:category ?category . }}
              }}
            }}";

            var xmlResult = await _db.ExecuteSparqlQueryAsync(sparqlQuery);
            return xmlResult;
        }
    
        public async Task<string> deleteMigration(Guid migrationId)
        {
            string sparqlQuery = $@"
            PREFIX ex: <http://www.semanticweb.org/web-proj/MIR#>
            DELETE {{
              ?migration ?p ?o .
              ?context ?pc ?oc .
              ?location ?pl ?ol .
              ?type ?pt ?ot .
            }}
            WHERE {{
              ?migration a ex:Migration ;
                ex:id ""{migrationId}"" ;
                ?p ?o .
  
              OPTIONAL {{
                ?migration ex:hasContext ?context .
                ?context ?pc ?oc .
              }}
  
              OPTIONAL {{
                ?migration ex:hasLocation ?location .
                ?location ?pl ?ol .
              }}
  
              OPTIONAL {{
                ?migration ex:hasType ?type .
                ?type ?pt ?ot .
              }}
            }}";

            // Execute the SPARQL query
            await _db.ExecuteSparqlQueryAsync(sparqlQuery, true);

            return "Migration and related data deleted successfully.";
        }

        public async Task<string> createMigration(MigrationDto migration, MigrationContextDto mc, MigrationTypeDto mt, MigrationLocationDto ml)
        {
            // Dynamically create instance names
            string migrationInstance = $"migration_{migration.Id.ToString().Replace("-", "_")}";
            string migrationContextInstance = $"migrationContext_{mc.Id.ToString().Replace("-", "_")}";
            string migrationLocationInstance = $"migrationLocation_{ml.Id.ToString().Replace("-", "_")}";
            string migrationTypeInstance = $"migrationType_{mt.Id.ToString().Replace("-", "_")}";

            string sparqlQuery = $@"
            PREFIX ex: <http://www.semanticweb.org/web-proj/MIR#>

            INSERT DATA {{
                ex:{migrationInstance} a ex:Migration ;
                    ex:id ""{migration.Id}"" ;
                    ex:userId ""{migration.UserId}"" ;
                    ex:migrationContextId ""{migration.MigrationContextId}"" ;
                    ex:migrationTypeId ""{migration.MigrationTypeId}"" ;
                    ex:migrationLocationId ""{migration.MigrationLocationId}"" .

                ex:{migrationContextInstance} a ex:MigrationContext ;
                    ex:id ""{mc.Id}"" ;
                    ex:name ""{mc.Name}"" ;
                    ex:season ""{mc.Season}"" ; 
                    ex:working ""{mc.Working}"" ; 
                    ex:politicFactors ""{mc.PoliticFactors}"" ;
                    ex:description ""{mc.Description}"" ;   
                    ex:thumbnailUrl ""{mc.ThumbnailUri}"" ;
                    ex:calamity ""{mc.Calamity}"" .
                ex:{migrationInstance} ex:hasContext ex:{migrationContextInstance} .

                ex:{migrationLocationInstance} a ex:MigrationLocation ;
                    ex:id ""{ml.Id}"" ;
                    ex:country ""{ml.Country}"" ;
                    ex:city ""{ml.City}"" ;
                    ex:longitude ""{ml.Longitude}"" ;
                    ex:latitude ""{ml.Latitude}"" . 
                ex:{migrationInstance} ex:hasLocation ex:{migrationLocationInstance} .

                ex:{migrationTypeInstance} a ex:MigrationType ;
                    ex:id ""{mt.Id}"" ;
                    ex:category ""{mt.Category}"" .
                ex:{migrationInstance} ex:hasType ex:{migrationTypeInstance} .
            }}";

            var response = await _db.ExecuteSparqlQueryAsync(sparqlQuery, true);

            return response;
        }
        public async Task<string> getByIdAsync(Guid id)
        {
            var sparqlQuery = $@"
            PREFIX ex: <http://www.semanticweb.org/web-proj/MIR#>

            SELECT ?id ?userId ?migration ?name ?working ?thumbnailUrl ?politicFactors ?migrationDescription ?calamity ?country ?city ?longitude ?latitude ?season ?category
            WHERE {{
            ?migration a ex:Migration ;
                ex:id ?id ;
                ex:userId ?userId .
              
            FILTER (?id = ""{id}"")
              
            OPTIONAL {{
                ?migration ex:hasContext ?context .
                OPTIONAL {{ ?context ex:season ?season . }}
                OPTIONAL {{ ?context ex:working ?working . }}
                OPTIONAL {{ ?context ex:name ?name . }}
                OPTIONAL {{ ?context ex:thumbnailUrl ?thumbnailUrl . }}
                OPTIONAL {{ ?context ex:politicFactors ?politicFactors . }}
                OPTIONAL {{ ?context ex:description ?migrationDescription . }}
                OPTIONAL {{ ?context ex:calamity ?calamity . }}
            }}
            
            OPTIONAL {{
                ?migration ex:hasLocation ?location .
                OPTIONAL {{ ?location ex:longitude ?longitude . }} 
                OPTIONAL {{ ?location ex:latitude ?latitude . }}
                OPTIONAL {{ ?location ex:country ?country . }} 
                OPTIONAL {{ ?location ex:city ?city . }} 
            }}
            
            OPTIONAL {{
                ?migration ex:hasType ?type .
                OPTIONAL {{ ?type ex:category ?category . }}
            }}
            }}";
            var xmlResult = await _db.ExecuteSparqlQueryAsync(sparqlQuery);
            return xmlResult;
        }

        public async Task<string> updateMigration(Guid id, MigrationRequestDto request)
        {
          Guid newIdLocation = Guid.NewGuid();
          Guid newIdContext = Guid.NewGuid();
          Guid newIdType = Guid.NewGuid();

          string migrationInstance = $"migration_{id.ToString().Replace("-", "_")}";
          string migrationContextInstance = $"migrationContext_{newIdContext.ToString().Replace("-", "_")}";
          string migrationLocationInstance = $"migrationLocation_{newIdLocation.ToString().Replace("-", "_")}";
          string migrationTypeInstance = $"migrationType_{newIdType.ToString().Replace("-", "_")}";

          string sparqlQuery = $@"
          PREFIX ex: <http://www.semanticweb.org/web-proj/MIR#>

          DELETE {{
              ?migration ?p ?o .
              ?context ?pc ?oc .
              ?location ?pl ?ol .
              ?type ?pt ?ot .
          }}
          INSERT {{
              ex:{migrationInstance} a ex:Migration;
                  ex:id ""{id}"";
                  ex:userId ""{request.UserId}"";
                  ex:migrationContextId ""{newIdContext}"";
                  ex:migrationTypeId ""{newIdType}"";
                  ex:migrationLocationId ""{newIdLocation}"".

              ex:{migrationContextInstance} a ex:MigrationContext;
                  ex:id ""{newIdContext}"";
                  ex:name ""{request.Name}"";
                  ex:season ""{request.Season}"";
                  ex:working ""{request.Working}"";
                  ex:politicFactors ""{request.PoliticFactors}"";
                  ex:description ""{request.Description}"";
                  ex:thumbnailUrl ""{request.ThumbnailUrl}"";
                  ex:calamity ""{request.Calamity}"".
              ex:{migrationInstance} ex:hasContext ex:{migrationContextInstance}.

              ex:{migrationLocationInstance} a ex:MigrationLocation;
                  ex:id ""{newIdLocation}"";
                  ex:country ""{request.Country}"" ;
                  ex:city ""{request.City}"" ;
                  ex:longitude ""{request.Longitude}"";
                  ex:latitude ""{request.Latitude}"". 
              ex:{migrationInstance} ex:hasLocation ex:{migrationLocationInstance}.

              ex:{migrationTypeInstance} a ex:MigrationType;
                  ex:id ""{newIdType}"";
                  ex:category ""{request.Category}"".
              ex:{migrationInstance} ex:hasType ex:{migrationTypeInstance}.
          }}
          WHERE {{
              ?migration a ex:Migration; ex:id ""{id}"" .
              OPTIONAL {{ ?migration ?p ?o . }}
              OPTIONAL {{ ?migration ex:hasContext ?context . ?context ?pc ?oc . }}
              OPTIONAL {{ ?migration ex:hasLocation ?location . ?location ?pl ?ol . }}
              OPTIONAL {{ ?migration ex:hasType ?type . ?type ?pt ?ot . }}
          }}";

          var result = await _db.ExecuteSparqlQueryAsync(sparqlQuery, true);
          return result;
        }
    }
}
