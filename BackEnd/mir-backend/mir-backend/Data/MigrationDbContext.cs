﻿using Neo4j.Driver;
using System.Net.Http.Headers;
using System.Text;

namespace mir_backend.Data
{
    public class MigrationDbContext : IDisposable
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUri = "https://sd-2529e6ca.stardog.cloud:5820/";
        private readonly string _dbName = "MIR";

        public MigrationDbContext(HttpClient httpClient)
        {
            _httpClient = httpClient;
            // Configure basic authentication
            var credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes("mirUser:mirDragos123"));
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        }

        // Method to execute SPARQL query
        public async Task<string> ExecuteSparqlQueryAsync(string sparqlQuery)
        {
            var content = new StringContent(sparqlQuery, Encoding.UTF8, "application/sparql-query");
            var response = await _httpClient.PostAsync($"{_baseUri}{_dbName}/query", content);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }


        public void Dispose()
        {
            _httpClient?.Dispose();
        }

    }
}
